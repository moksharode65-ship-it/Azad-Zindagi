import { promises as fs } from "fs";
import path from "path";

export type DonationRecord = {
  id: string;
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorMessage?: string;
  status: "verified";
  createdAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const dbFile = path.join(dataDir, "donations.json");

async function ensureDb() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dbFile);
  } catch {
    await fs.writeFile(dbFile, "[]", "utf8");
  }
}

export async function getDonations(): Promise<DonationRecord[]> {
  await ensureDb();
  const raw = await fs.readFile(dbFile, "utf8");
  return JSON.parse(raw) as DonationRecord[];
}

export async function saveDonation(record: DonationRecord) {
  const parsed = await getDonations();
  parsed.push(record);
  await fs.writeFile(dbFile, JSON.stringify(parsed, null, 2), "utf8");
}
