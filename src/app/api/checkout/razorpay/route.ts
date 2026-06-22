import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR', receipt } = await req.json();

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // Use dummy values for development if keys are not set
    const isDummy = !key_id || !key_secret;

    if (isDummy) {
      // Return a mock order to prevent server crash during UI testing
      console.log('Using mock Razorpay order because keys are missing.');
      return NextResponse.json({
        id: `order_mock_${Date.now()}`,
        entity: 'order',
        amount: Math.round(amount * 100),
        currency,
        receipt: receipt || `receipt_order_${Date.now()}`,
      });
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: Math.round(amount * 100), // amount in the smallest currency unit (paise)
      currency,
      receipt: receipt || `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Razorpay Error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
