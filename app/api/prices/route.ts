import RedisCacheService from "@/utils/redis";
import { stripe } from "@/utils/stripe/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cachedPrices = await RedisCacheService.getCachedData("prices");
    if (cachedPrices) {
      return new NextResponse(JSON.stringify(cachedPrices), { status: 200 });
    }
    const prices = await stripe.prices.list({
      active: true,
      expand: ["data.product"],
    });
    await RedisCacheService.setCachedData("prices", prices.data); // Cache for 1 minute (60 seconds)

    return new NextResponse(JSON.stringify(prices.data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch prices" }),
      { status: 500 }
    );
  }
}
