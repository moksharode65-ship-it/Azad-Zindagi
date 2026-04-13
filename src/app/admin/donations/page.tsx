import Link from "next/link";
import { getDonations } from "@/lib/donations-db";

export const dynamic = "force-dynamic";

export default async function DonationsAdminPage() {
  const donations = await getDonations();
  const sorted = [...donations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const total = sorted.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Donations Admin</h1>
            <p className="text-zinc-400 text-sm">Verified donations captured from Razorpay checkout.</p>
          </div>
          <div className="flex gap-3">
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="px-4 py-2 rounded-md border border-white/20 text-sm">
                Logout
              </button>
            </form>
            <Link href="/api/donate/export" className="px-4 py-2 rounded-md bg-white text-black text-sm font-semibold">
              Download CSV
            </Link>
            <Link href="/" className="px-4 py-2 rounded-md border border-white/20 text-sm">
              Back to Website
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg border border-white/10 bg-zinc-900/70 p-4">
            <p className="text-zinc-400 text-xs">Total Donations</p>
            <p className="text-2xl font-bold">{sorted.length}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-zinc-900/70 p-4">
            <p className="text-zinc-400 text-xs">Total Amount</p>
            <p className="text-2xl font-bold">Rs {total.toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-zinc-900/70 p-4">
            <p className="text-zinc-400 text-xs">Latest Donation</p>
            <p className="text-2xl font-bold">{sorted[0] ? `Rs ${sorted[0].amount}` : "-"}</p>
          </div>
        </div>

        <div className="overflow-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="bg-zinc-900/90 text-zinc-300">
              <tr>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Payment ID</th>
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td className="p-4 text-zinc-400" colSpan={8}>No donations yet.</td>
                </tr>
              ) : (
                sorted.map((donation) => (
                  <tr key={donation.id} className="border-t border-white/10 hover:bg-zinc-900/50">
                    <td className="p-3">{new Date(donation.createdAt).toLocaleString("en-IN")}</td>
                    <td className="p-3">{donation.donorName || "-"}</td>
                    <td className="p-3">{donation.donorEmail || "-"}</td>
                    <td className="p-3">{donation.donorPhone || "-"}</td>
                    <td className="p-3">Rs {Number(donation.amount).toLocaleString("en-IN")}</td>
                    <td className="p-3">{donation.paymentId}</td>
                    <td className="p-3">{donation.orderId}</td>
                    <td className="p-3">{donation.donorMessage || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
