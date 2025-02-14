import { stripe } from "@/utils/stripe/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const prices = await stripe.prices.list({
      active: true,
      expand: ["data.product"],
    });

    return new NextResponse(JSON.stringify(prices.data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch prices" }),
      { status: 500 }
    );
  }
}
