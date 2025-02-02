import { createRequisition } from "@/actions/banque/userBanque";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { institutionId } = await request.json();

  // const callbackUrl = new URL(
  //   "/api/callback",
  //   process.env.NEXT_PUBLIC_APP_URL!
  // ).toString();
  const response = await createRequisition(
    // callbackUrl,
    `${process.env.NEXT_PUBLIC_APP_URL!}/add-account`,
    institutionId,
    session.user.id
  );

  return NextResponse.json({ link: response.link, id: response.id });
}

export async function GET(request: Request) {
  const values = await request.json();

  console.log(values);
  return NextResponse.json({ values });
}
