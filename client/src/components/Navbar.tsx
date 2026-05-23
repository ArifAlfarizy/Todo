"use client";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChecklistIcon from "@mui/icons-material/Checklist";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="h-screen w-20 p-4 shadow-xl">
      <div className="flex flex-col items-center gap-5">
        <div>
          <MenuIcon />
        </div>
        <div className="w-full border-t border-black"></div>
        <div>
          <Link href="/">
            <ChecklistIcon />
          </Link>
        </div>
        <div>
          <Link href="/login">
            <button
              className={`cursor-pointer rounded-md bg-black text-white ${isOpen ? "px-3" : "px-2"} py-1`}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
