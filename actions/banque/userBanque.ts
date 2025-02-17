"use server";

import { apiAxios } from "@/feature";
import RedisCacheService from "@/utils/redis";
import axios from "axios";

// accounts
export const getAccount = async (id: string) => {
  try {
    const account = await RedisCacheService.getCachedData("userBankaccounts");
    if (!account) {
      const response = await apiAxios.get(`/v2/accounts/${id}/`);
      await RedisCacheService.setCachedData(
        "userBankaccounts",
        JSON.stringify(response.data)
      );
      return response.data;
    }
    return account;
  } catch (error) {
    console.error("Error fetching account:", error);
    throw error;
  }
};

export const getAccountBalance = async (id: string) => {
  try {
    const accountBalance = await RedisCacheService.getCachedData(
      "userAccountBalance"
    );
    if (accountBalance) return accountBalance;

    const response = await apiAxios.get(`/v2/accounts/${id}/balances/`);
    await RedisCacheService.setCachedData("userAccountBalance", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching account balance:", error);
    throw error;
  }
};

export const getAccountDetails = async (id: string) => {
  try {
    const accountDetails = await RedisCacheService.getCachedData(
      "userAccountDetails"
    );
    if (accountDetails) return accountDetails;

    const response = await apiAxios.get(`/v2/accounts/${id}/details/`);
    await RedisCacheService.setCachedData("userAccountDetails", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching account details:", error);
    throw new Error(`Failed to fetch account details: ${error} ${error}`);
  }
};

export const getAccountTransactions = async (id: string) => {
  try {
    const accountTransactions = await RedisCacheService.getCachedData(
      "userAccountTransaction"
    );
    if (accountTransactions) return accountTransactions;

    const response = await apiAxios.get(`/v2/accounts/${id}/transactions/`);
    await RedisCacheService.setCachedData(
      "userAccountTransaction",
      response.data
    );
    // console.log("this is the response", response.data.transactions.booked);

    return response.data;
  } catch (error) {
    console.error("Error fetching account transactions:", error);
    throw error;
  }
};

// agreement
export const getAllAgriments = async (
  limit: number = 100,
  offset: number = 0
) => {
  try {
    const allAgriments = await RedisCacheService.getCachedData(
      "userAllAgriments"
    );
    if (allAgriments) return allAgriments;

    const response = await apiAxios.get(`/v2/agreements/enduser/`, {
      params: {
        limit,
        offset,
      },
    });
    await RedisCacheService.setCachedData("userAllAgriments", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching agreements:", error);
    throw error;
  }
};

export const createAgriments = async () => {
  try {
    const response = await apiAxios.post(`/v2/agreements/enduser/`);
    return response.data;
  } catch (error) {
    console.error("Error creating agreements:", error);
    throw error;
  }
};

export const getOneAgreement = async (id: string) => {
  try {
    const response = await apiAxios.get(`/v2/agreements/enduser/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching one agreement:", error);
    throw error;
  }
};

export const acceptUserAgreement = async (
  id: string,
  data: {
    user_agent: "string";
    ip_address: "string";
  }
) => {
  try {
    const response = await apiAxios.patch(
      `/v2/agreements/enduser/${id}/accept/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating agreement:", error);
    throw error;
  }
};

export const deleteUserAgreement = async (id: string) => {
  try {
    const response = await apiAxios.delete(`/v2/agreements/enduser/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting agreement:", error);
    throw error;
  }
};

// INSTITUTIONS
export const getInstitutions = async (
  country: string,
  access_scopes_supported?: boolean,
  account_selection_supported?: boolean,
  business_accounts_supported?: boolean,
  card_accounts_supported?: boolean,
  corporate_accounts_supported?: boolean,
  payment_submission_supported?: boolean,
  payments_enabled?: boolean,
  pending_transactions_supported?: boolean,
  private_accounts_supported?: boolean,
  read_debtor_account_supported?: boolean,
  read_refund_account_supported?: boolean,
  ssn_verification_supported?: boolean
) => {
  try {
    const institution = await RedisCacheService.getCachedData(
      "userInstitutions"
    );
    if (institution) return institution;

    const response = await apiAxios.get("/v2/institutions/", {
      params: {
        country,
        access_scopes_supported,
        account_selection_supported,
        business_accounts_supported,
        card_accounts_supported,
        corporate_accounts_supported,
        payment_submission_supported,
        payments_enabled,
        pending_transactions_supported,
        private_accounts_supported,
        read_debtor_account_supported,
        read_refund_account_supported,
        ssn_verification_supported,
      },
    });
    await RedisCacheService.setCachedData("userInstitutions", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching institutions:", error);
    throw error;
  }
};

export const getOneInstitution = async (id: string) => {
  try {
    const response = await apiAxios.get(`/v2/institutions/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching one institution:", error);
    throw error;
  }
};

// REQUISITIONS

export const getRequisitions = async (
  limit: number = 100,
  offset: number = 0
) => {
  try {
    const requisitions = await RedisCacheService.getCachedData(
      "userRedisRequisitions"
    );
    if (requisitions) return requisitions;

    const response = await apiAxios.get("/v2/requisitions/", {
      params: {
        limit,
        offset,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching requisitions:", error);
    throw error;
  }
};

export const getOneRequisition = async (id: string) => {
  try {
    const oneRequisition = await RedisCacheService.getCachedData(
      "userOneRequisition"
    );
    if (oneRequisition) return oneRequisition;
    console.log(`Fetching requisition with ID: ${id}`);
    const response = await apiAxios.get(`/v2/requisitions/${id}/`);
    console.log("Requisition fetch successful");
    await RedisCacheService.setCachedData("userOneRequisition", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching requisition:", error);
    // if (error.response) {
    //   console.error("Response data:", error.response.data);
    //   console.error("Response status:", error.response.status);
    //   console.error("Response headers:", error.response.headers);
    // } else if (error.request) {
    //   console.error("No response received:", error.request);
    // } else {
    //   console.error("Error setting up request:", error.message);
    // }
    throw new Error(`Failed to fetch requisition: ${error} `);
  }
};

export const createRequisition = async (
  redirect: string,
  institution_id: string,
  reference?: string,
  agreement?: string,
  user_language?: string,
  ssn?: string,
  account_selection: boolean = false,
  redirect_immediate: boolean = false
) => {
  try {
    const response = await apiAxios.post("/v2/requisitions/", {
      redirect,
      institution_id,
      reference,
      agreement,
      user_language,
      ssn,
      account_selection,
      redirect_immediate,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating requisition:", error.response?.data);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
};

export const deleteRequisition = async (id: string) => {
  try {
    const response = await apiAxios.delete(`/v2/requisitions/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting requisition:", error);
    throw error;
  }
};

export async function getAccountInfo(requisitionId: string) {
  try {
    const requisitionData = await getOneRequisition(requisitionId);

    if (!requisitionData.accounts || requisitionData.accounts.length === 0) {
      throw new Error("No accounts found in the requisition");
    }

    const accountId = requisitionData.accounts[0];
    // const accountId = "4972f160-e90e-4f92-9ce2-7b18457eea17";
    const accountInfo = await RedisCacheService.getCachedData(
      "userAccountInfo"
    );
    if (accountInfo) return accountInfo;
    const accountDetails = await getAccountDetails(accountId);
    await RedisCacheService.setCachedData("userAccountInfo", accountDetails);

    return accountDetails;
  } catch (error) {
    console.error("Error in getAccountInfo:", error);
    throw error;
  }
}
