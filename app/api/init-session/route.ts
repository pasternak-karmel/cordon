import { getAccessToken } from "@/actions/token/token";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { institutionId } = await request.json();
  const accessToken = await getAccessToken();

  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/requisitions/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        redirect: `${process.env.NEXT_PUBLIC_APP_URL!}/add-account`,
        institution_id: institutionId,
        reference: crypto.randomUUID(),
      }),
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to initialize session" },
      { status: 500 }
    );
  }

  const data = await response.json();
  return NextResponse.json({ link: data.link });
}
