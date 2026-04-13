import crypto from "crypto";
import { NextResponse } from "next/server";
import { saveDonation } from "@/lib/donations-db";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donor, amount } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ verified: false, error: "Missing payment fields" }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ verified: false, error: "Missing key secret" }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const verified = expectedSignature === razorpay_signature;
    if (!verified) {
      return NextResponse.json({ verified: false }, { status: 400 });
    }

    await saveDonation({
      id: `don_${Date.now()}`,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: Number(amount || 0),
      currency: "INR",
      donorName: String(donor?.name || ""),
      donorEmail: String(donor?.email || ""),
      donorPhone: String(donor?.phone || ""),
      donorMessage: String(donor?.message || ""),
      status: "verified",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ verified: true }, { status: 200 });
  } catch (error) {
    console.error("verify-payment error", error);
    return NextResponse.json({ verified: false, error: "Something went wrong" }, { status: 500 });
  }
}
