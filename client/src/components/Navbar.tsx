"use client";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChecklistIcon from "@mui/icons-material/Checklist";
import Link from "next/link";
import { useAuth } from "@/src/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

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
          <Link href="/todos">
            <ChecklistIcon />
          </Link>
        </div>
        <div>
          {isAuthenticated ? (
            <button
              onClick={() => logout()}
              className="cursor-pointer rounded-md bg-red-600 text-white px-2 py-1"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="cursor-pointer rounded-md bg-black text-white px-2 py-1">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;