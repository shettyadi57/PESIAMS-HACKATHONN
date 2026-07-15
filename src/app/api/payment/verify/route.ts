import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

function generateRegistrationId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "UTK-";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function saveRegistration(data: Record<string, unknown>) {
  const filePath = path.join(process.cwd(), "data", "registrations.json");
  let store: { registrations: unknown[]; count: number } = { registrations: [], count: 0 };

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    store = JSON.parse(raw);
  } catch {
    // file doesn't exist yet — start fresh
  }

  store.registrations.push(data);
  store.count = store.registrations.length;
  fs.writeFileSync(filePath, JSON.stringify(store, null, 2), "utf-8");
  return store.count;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
      isDemo,
    } = body;

    const registrationId = generateRegistrationId();

    if (isDemo) {
      // Demo mode — skip signature verification, save with demo flag
      const record = {
        registrationId,
        paidAt: new Date().toISOString(),
        paymentMode: "DEMO",
        orderId: razorpay_order_id,
        paymentId: `pay_DEMO_${Date.now()}`,
        amount: 1000,
        ...formData,
      };
      const count = saveRegistration(record);
      return NextResponse.json({ success: true, registrationId, count });
    }

    // Verify Razorpay signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const body_str = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body_str)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    // Signature valid — save registration
    const record = {
      registrationId,
      paidAt: new Date().toISOString(),
      paymentMode: "RAZORPAY",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: 1000,
      ...formData,
    };
    const count = saveRegistration(record);

    return NextResponse.json({ success: true, registrationId, count });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
