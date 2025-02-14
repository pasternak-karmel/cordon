import EditButton from "./EditButton";
import SectionInformation from "./sectionInformation";

export default function PersonnalInformation() {
  return (
    <div className="flex flex-col justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
      <div className="flex justify-between w-full items-center">
        <h6>Personnal Informations</h6>
        <EditButton />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <SectionInformation title="First Name" value="John" />
        <SectionInformation title="Last Name" value="Doe" />
        <SectionInformation title="Email" value="john.doe@example.com" />
        <SectionInformation title="Phone" value="+1 123 456 7890" />
        <SectionInformation
          title="Address"
          value="123 Main St, City, State, Zip"
        />
      </div>
    </div>
  );
}
