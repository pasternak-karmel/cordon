"use server";

import { eq, desc } from "drizzle-orm";

import { TokenData } from "@/interface";
import { db, token } from "@/db/schema";

// TOKEN
export async function getAccessToken() {
  // Check if valid token exists in database
  const [existingToken] = await db
    .select()
    .from(token)
    .orderBy(desc(token.created_at))
    .limit(1);

  // If token exists and not expired, return it
  if (
    existingToken &&
    !isTokenExpired(existingToken.created_at as Date, existingToken.expires_at)
  ) {
    return existingToken.access_token;
  }

  // If token exists but expired, try to refresh it
  if (existingToken?.refresh_token) {
    try {
      return await refreshToken(existingToken.refresh_token);
    } catch (error) {
      console.error("Failed to refresh token, getting new one");
      throw error;
    }
  }

  // Get new token
  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/token/new/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret_id: process.env.SECRET_ID,
        secret_key: process.env.SECRET_KEY,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  const data: TokenData = await response.json();
  // const data = await response.json();
  // console.log(data);

  // Save to database
  await db.insert(token).values({
    created_at: new Date(),
    access_token: data.access,
    refresh_token: data.refresh,
    expires_at: data.access_expires,
    // ...data,
  });

  return data.access;
}

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await fetch(
      "https://bankaccountdata.gocardless.com/api/v2/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    const data: TokenData = await response.json();
    // const data: TokenData = await response.json();

    // Update token in database
    await db
      .update(token)
      .set({
        created_at: new Date(),
        ...data,
      })
      .where(eq(token.refresh_token, refreshToken));

    return data.access;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

function isTokenExpired(createdAt: Date, expiresIn: number): boolean {
  const expirationTime = new Date(createdAt.getTime() + expiresIn * 1000);
  return new Date() >= expirationTime;
}
