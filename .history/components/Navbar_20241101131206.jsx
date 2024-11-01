import React from "react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex justify-around w-full">
      <span>Cordon</span>
      <ul>
        <li>
          <Link>About</Link>
        </li>
        <li>
          <Link>About</Link>
        </li>
        <li>
          <Link>About</Link>
        </li>
        <li>
          <Link>About</Link>
        </li>
        <li>
          <Link>About</Link>
        </li>
      </ul>
      <button className="bg-white p-5 rounded-full">Se connecter</button>
    </nav>
  );
}
