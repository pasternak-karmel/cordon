"use server";

import { getUser } from "@/data/account";
import { transactionProps } from "@/interface";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cache } from "react";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are an expert in data analysis and personal finance. Provide actionable advice to help users maximize their money based on their transaction data.",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: "text/plain",
};

export const getGeminiVision = cache(async (allTransac: transactionProps[]) => {
  try {
    const id = await getUser();
    if (!id) {
      throw new Error("User not found.");
    }

    const transac = allTransac
      .map(
        (transaction) =>
          `Transaction ID: ${transaction.transactionId}, Amount: ${transaction.transactionAmount.amount} ${transaction.transactionAmount.currency}, Date: ${transaction.bookingDate}, Description: ${transaction.additionalInformation}`
      )
      .join("\n");

    const prompt = `Here is my transaction data:\n${transac}\n\nBased on this data, provide actionable advice to help me maximize my money and improve my financial health.`;

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    const responseText = result.response.text();
    console.log("This is the response that I get:", responseText);
    return responseText;
  } catch (error) {
    console.error("Error in getGeminiVision:", error);
    throw new Error("Failed to get financial advice.");
  }
});
