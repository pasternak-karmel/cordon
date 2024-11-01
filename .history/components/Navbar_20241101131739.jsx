import React from "react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex justify-around w-full">
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
      <button className="bg-[#ffffff7d] p-5 rounded-full">Se connecter</button>
    </nav>
  );
}