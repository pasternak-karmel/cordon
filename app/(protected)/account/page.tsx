import { Button } from "@/components/ui/button";
import DialogProvider from "@/provider/dialog-provider";

export default function AccountPage() {
  return (
    <div>
      <div>
        <DialogProvider>
          <Button variant={"ringHover"}>Link an account</Button>
        </DialogProvider>
      </div>
      <div></div>
    </div>
  );
}
