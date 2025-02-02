import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ErreurProps {
  error: Error | string | unknown;
}

export default function ErrorDisplay({ error }: ErreurProps) {
  console.log("this is the error", error);
  return (
    <Alert variant="destructive" className="w-full max-w-4xl mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error instanceof Error ? error.message : (error as string)}
      
      </AlertDescription>

    </Alert>
  );
}
