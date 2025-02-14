import EditButton from "./EditButton";
import SectionInformation from "./sectionInformation";

export default function LocationInformation() {
  return (
    <div className="flex flex-col justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
      <div className="flex justify-between w-full items-center">
        <h6>Address</h6>
        <EditButton />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <SectionInformation title="Contry" value="United Kingdom" />
        <SectionInformation title="City/State" value="Leeds" />
        <SectionInformation title="Postal Code" value="ERT 2354" />
        <SectionInformation title="Tax ID" value="AD7890" />
      </div>
    </div>
  );
}
