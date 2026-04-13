import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, name, email, phone, message } = await req.json();

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing donor details" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: "Razorpay keys are missing" }, { status: 500 });
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: Math.round(Number(amount) * 100),
        currency: "INR",
        receipt: `azf_${Date.now()}`,
        notes: {
          donor_name: String(name),
          donor_email: String(email),
          donor_phone: String(phone),
          donor_message: String(message || ""),
        },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: "Failed to create Razorpay order", details: err }, { status: 500 });
    }

    const order = await response.json();
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("create-order error", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

