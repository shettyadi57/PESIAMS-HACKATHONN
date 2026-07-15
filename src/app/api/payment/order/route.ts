import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { teamName, amount = 100000 } = body; // amount in paise (₹1000 = 100000 paise)

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If no real keys, return a simulated order for demo mode
    if (!keyId || keyId.includes("REPLACE")) {
      const simulatedOrderId = `order_SIM_${Date.now()}_${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      return NextResponse.json({
        orderId: simulatedOrderId,
        amount,
        currency: "INR",
        key: "DEMO_MODE",
        isDemo: true,
      });
    }

    // Real Razorpay order creation
    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `utkarsh_${Date.now()}`,
      notes: { teamName },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: keyId,
      isDemo: false,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
