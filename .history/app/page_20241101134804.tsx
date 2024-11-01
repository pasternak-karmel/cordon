import { auth } from "@/auth";
import { Social } from "@/components/social";
import { Button } from "@/components/ui/button";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export default async function Home() {
  const session = await auth();
  if (!session) {
    return <div>Not authenticated</div>;
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="w-[50%] flex flex-col gap-4 items-center justify-center">
        <Button variant={"gooeyLeft"}>Welcome to Cordon</Button>
        <Social />
      </div>
      <p>Test connexion</p>
      <div className="container">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}
