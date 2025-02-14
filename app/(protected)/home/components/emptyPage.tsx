"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function EmptyPage({ }) {
  const router = useRouter()
  return (
    <div className="flex flex-col justify-around items-center bg-white shadow-md rounded-xl h-full">
      <Image
        src={"/account_not_found.png"}
        width={90}
        height={90}
        alt="account icon"
      />
      <h6 className="text-xl">
        No account linked. Please link an account to continue
      </h6>
      <Button onClick={()=>{router.push("/account")}}>Link an account</Button>
    </div>
  );
}
