import React from "react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex justify-around w-full">
      <span>Cordon</span>
      <ul className="flex space-x-6">
        <li>
          <Link href="#" className="hover:border-b">
            About
          </Link>
        </li>
        <li>
          <Link href="#">About</Link>
        </li>
        <li>
          <Link href="#">About</Link>
        </li>
        <li>
          <Link href="#">About</Link>
        </li>
        <li>
          <Link href="#">About</Link>
        </li>
      </ul>
      <button className="bg-white p-5 rounded-full">Se connecter</button>
    </nav>
  );
}
