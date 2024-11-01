import React from "react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="">
      <div className="flex justify-around w-full pb-5 border-b">
        <span>Cordon</span>
        <ul className="flex space-x-6">
          <li className="h-fit w-fit">
            <Link href="#" className="hover:border-b-2">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:border-b-2">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:border-b-2">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:border-b-2">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:border-b-2">
              About
            </Link>
          </li>
        </ul>
        <button className="bg-[#dedbdb7d] p-2 rounded-full">
          Se connecter
        </button>
      </div>
    </nav>
  );
}
