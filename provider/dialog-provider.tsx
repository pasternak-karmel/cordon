import ChooseCountry from "@/app/(protected)/(compte)/account/choose-country";

import { ProviderProps } from "@/interface";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

//brunel utilise les props pour le mettre en composant
const DialogProvider = ({ children }: ProviderProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add an account</DialogTitle>
          <DialogDescription>
            Add your account to track your subscription on this account
          </DialogDescription>
        </DialogHeader>
        <ChooseCountry />
      </DialogContent>
    </Dialog>
  );
};
export default DialogProvider;
