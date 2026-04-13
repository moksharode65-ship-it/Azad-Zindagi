import { NextResponse } from "next/server";
import { getDonations } from "@/lib/donations-db";

export const dynamic = "force-dynamic";

export async function GET() {
  const donations = await getDonations();

  const header = [
    "created_at",
    "donor_name",
    "donor_email",
    "donor_phone",
    "amount",
    "currency",
    "payment_id",
    "order_id",
    "message",
  ];

  const rows = donations.map((d) => [
    d.createdAt,
    d.donorName,
    d.donorEmail,
    d.donorPhone,
    String(d.amount),
    d.currency,
    d.paymentId,
    d.orderId,
    (d.donorMessage || "").replace(/,/g, " "),
  ]);

  const csv = [header, ...rows].map((r) => r.join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=donations.csv",
      "Cache-Control": "no-store",
    },
  });
}
