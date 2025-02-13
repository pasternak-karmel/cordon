import { Button } from "@/components/ui/button";
import LocationInformation from "./components/locationInformation";
import PersonnalInformation from "./components/personnalInformation";
import ProfileGeneralInformation from "./components/profileGeneralInformation";

export default function Profile() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <ProfileGeneralInformation />
      <PersonnalInformation />
      <LocationInformation />
      <div className="flex justify-end">
        <Button variant="destructive">Log out</Button>
      </div>
    </div>
  );
}
