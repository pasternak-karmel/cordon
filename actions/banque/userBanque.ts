"use server";

import { apiAxios } from "@/feature";
import axios from "axios";

// accounts
export const getAccount = async (id: string) => {
  try {
    const response = await apiAxios.get(`/v2/accounts/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching account:", error);
    throw error;
  }
};

export const getAccountBalance = async (id: string) => {
  try {
    const response = await apiAxios.get(`/v2/accounts/${id}/balances/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching account balance:", error);
    throw error;
  }
};

export const getAccountDetails = async (id: string) => {
  try {
    const response = await apiAxios.get(`/v2/accounts/${id}/details/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching account details:", error);
    throw new Error(`Failed to fetch account details: ${error} ${error}`);
  }
};

export const getAccountTransactions = async (id: string) => {
  try {
    const response = await apiAxios.get(`/v2/accounts/${id}/transactions/`);
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
    const response = await apiAxios.get(`/v2/agreements/enduser/`, {
      params: {
        limit,
        offset,
      },
    });
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
    console.log(`Fetching requisition with ID: ${id}`);
    const response = await apiAxios.get(`/v2/requisitions/${id}/`);
    console.log("Requisition fetch successful");
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
    const accountDetails = await getAccountDetails(accountId);

    return accountDetails;
  } catch (error) {
    console.error("Error in getAccountInfo:", error);
    throw error;
  }
}
