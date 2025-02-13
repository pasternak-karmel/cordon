import { Edit } from "lucide-react";

export default function  EditButton ()  {
    return (
      <div className="w-fit h-fit px-4 py-2 border border-gray-200 flex flex-row justify-center items-center rounded-full cursor-pointer hover:bg-gray-50 hover:text-gray-600 flex-nowrap">
        <h6 className="text-sm">Edit</h6>
        <Edit size={18} />
      </div>
    );
  };