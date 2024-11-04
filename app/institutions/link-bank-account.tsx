"use client";

import { Button } from "@/components/ui/button";

export default function LinkBankAccount({ linkUrl }: { linkUrl: string }) {
  const handleLinkAccount = () => {
    window.location.href = linkUrl;
  };

  return <Button onClick={handleLinkAccount}>Link Your Bank Account</Button>;
}
