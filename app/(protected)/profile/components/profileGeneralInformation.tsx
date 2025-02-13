import EditButton from "./EditButton";
import Image from "next/image";

export default function ProfileGeneralInformation() {
  return (
    <div className="flex flex-row justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
      <div className="flex gap-3">
        <Image
          src="/userImage.png"
          alt="user"
          className="w-[90px] h-[90px] rounded-full"
          width={150}
          height={150}
        />
        <div className="flex flex-col justify-around">
          <h6>Name</h6>
          <h6>Plan name</h6>
          <h6>Localisation</h6>
        </div>
      </div>
      <EditButton />
    </div>
  );
}
