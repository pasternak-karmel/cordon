import { auth } from "@/auth";
import { Social } from "@/components/social";
import { Button } from "@/components/ui/button";
import DotPattern from "@/components/ui/dot-pattern";
import NavbarWelcome from "./_components/navbar";

export default async function Home() {
  const session = await auth();

  //await getAccessToken();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <NavbarWelcome />

      <DotPattern className="min-h-screen" />
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
