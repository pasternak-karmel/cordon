import { getAccountDetails } from "@/actions/banque/userBanque";
import { getAccessToken } from "@/actions/token/token";
import { url_gocardless } from "@/constant";
import RedisCacheService from "@/utils/redis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { requisitionId } = await request.json();
  const accessToken = await getAccessToken();
  let data : {accounts : string[] } | null  = await RedisCacheService.getCachedData("account_info")

  if (!data) {
    const response = await fetch(
      `${url_gocardless}/api/v2/requisitions/${requisitionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to initialize requisition" },
        { status: 500 }
      );
    }
  
    data = await response.json();
    console.log(`data from 1 api ${data}`);
  }
  else {
    console.log(`data from 1 api ${data}`);
  }
  
  

  if (!data?.accounts || data.accounts.length === 0) {
    console.log("No account was link to this requisition");
    throw new Error("No accounts found in the requisition");
  }
  const accountId = data.accounts[0];

  console.log("accountId", accountId);
  
  let accountDetails = await RedisCacheService.getCachedData("accountDetails")

  if (accountDetails) {
    return NextResponse.json({ link: accountDetails });
  }

  accountDetails = await getAccountDetails(accountId);
    console.log("accountDetails", accountDetails);
    
  return NextResponse.json({ link: accountDetails });
}
