import { BanknoteIcon } from "lucide-react";
import Image from "next/image";
export function ProfileCard() {
  const data = {
    name: "John Doe",
    plan: "Free plan",
    profileImage: "/userImage.png",
    location: "Belgium",
    personnalAccount: 123886645,
  };
  return (
    <div className="flex flex-col pt-4 w-full border rounded-md bg-[#ffffff52] shadow-lg">
      <div className="border-b border-gray-300 pb-2 pl-2">
        <h3 className="font-semibold">My Account</h3>
      </div>
      <div className="flex justify-between px-3 py-3 border-b border-gray-300">
        <div className="space-y-2">
          <h6 className="text-gray-500 text-xs">Name</h6>
          <h3>{data.name}</h3>
          <h6 className="text-gray-500 text-xs">Plan</h6>
          <h3>{data.plan}</h3>
          <h6 className="text-gray-500 text-xs">Location</h6>
          <h3>{data.location}</h3>
        </div>
        <div className="flex flex-col justify-center items-center space-y-4">
          <Image
            src={data.profileImage}
            width={60}
            height={30}
            alt="Profile picture"
            className="rounded-full"
          />
          <button className="bg-white text-blue-500 py-2 px-3 rounded-full hover:bg-gray-200 text-nowrap">
            Edit Profile
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between px-3 py-3 border-b border-gray-300">
        <h3 className="font-bold text-xl my-4">Personnal Bank Account</h3>
        <h6 className="text-gray-500 text-sm mb-4">
          You&apos;ve succesfully added a personal bank account. A account
          within 2-3 business days. Repayment reques
        </h6>
        <button className="bg-white  w-fulltext-blue-500 py-2 px-3 rounded-full hover:bg-gray-200 text-blue-500">
          <BanknoteIcon className="absolute" />
          <h6>Edit Profile</h6>
        </button>
      </div>
      <div className="flex justify-center items-center">
        <Image
          src={"/creditCard.png"}
          width={280}
          height={300}
          alt="credit card illustration"
        />
      </div>
    </div>
  );
}
