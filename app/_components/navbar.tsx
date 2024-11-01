import { Button } from "@/components/ui/button";

const NavbarWelcome = () => {
  return (
    <div className="fixed right-0 left-0 top-0 backdrop-blur-lg z-[100] py-4 w-full flex justify-center">
      <div className="w-[70%] flex justify-between items-center border-b-[1px] ">
        {/* logo */}
        <div>Cordon</div>
        <div>
          <Button variant={"linkHover2"}>About</Button>
          <Button variant={"linkHover2"}>For Business</Button>
          <Button variant={"linkHover2"}>Media</Button>
          <Button variant={"linkHover2"}>Blog</Button>
        </div>
        <div>
          <Button variant={"gooeyRight"}>Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default NavbarWelcome;
