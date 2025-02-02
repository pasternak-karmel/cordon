import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { ToastAction } from "./ui/toast";

export function ShowSuccess(message: string) {
  return toast("Success", {
    description: message,
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
    },
  });
}

export function ShowError(message: string) {
  return toast("Error!!!", {
    description: message,
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
    },
  });
}

//make this try again work later
export function ShowDestructive(message: string | null) {
  // again: () => {}();
  const { toast } = useToast();

  return toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: message ? message : "There was a problem with your request.",
    action: (
      <ToastAction altText="Try again" onClick={() => {}}>
        Try again
      </ToastAction>
    ),
  });
}
