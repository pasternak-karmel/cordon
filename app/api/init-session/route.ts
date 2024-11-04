import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { institutionId, accessToken } = await request.json();

  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/requisitions/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        redirect: `${process.env.NEXT_PUBLIC_APP_URL!}/callback`, //a faire par brunel
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
