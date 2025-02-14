import { setStripeCustomerId } from "@/actions/user";
import { auth } from "@/auth";
import { getUser, getUserStripeCustomerId } from "@/data/account";
import { getURL } from "@/utils/helper";
import { stripe } from "@/utils/stripe/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();

    const session = await auth();
    if (!session?.user?.email || !session?.user?.name) {
      return new NextResponse(
        JSON.stringify({ errorRedirect: "/auth/login" }),
        { status: 401 }
      );
    }

    const user = await getUser();

    if (!user) {
      return new NextResponse(
        JSON.stringify({ errorRedirect: "/auth/login" }),
        { status: 401 }
      );
    }

    const stripeUserId = await getUserStripeCustomerId();
    let customer;
    if (!stripeUserId) {
      customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name,
        metadata: { userId: user },
      });
      await setStripeCustomerId(customer.id);
    }

    const stripeSession = await stripe.checkout.sessions.create({
      customer: customer?.id,
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: getURL("/home"),
      cancel_url: getURL("/pricing"),
    });

    return new NextResponse(JSON.stringify({ sessionId: stripeSession.id }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ errorRedirect: "/pricing?error=checkout_failed" }),
      { status: 500 }
    );
  }
}
