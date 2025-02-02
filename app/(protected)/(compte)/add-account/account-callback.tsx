import { saveRequisition } from "@/actions/dbqueries/action";

const AccountCallback = async ({ callback }: { callback: string }) => {
  try {
    const id = localStorage.getItem("requisitionId");
    if (!id) {
      throw new Error("Requisition ID not found");
    }
    await saveRequisition(callback, id);
    localStorage.removeItem("requisitionId");
  } catch (error) {
    console.log(`an error occured ${error}`);
    throw error;
  } finally {
    setTimeout(() => {
      window.location.href = "/home";
    }, 3000);
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      You have successfuly linked your account
      <div>redirecting....</div>
    </div>
  );
};
export default AccountCallback;
