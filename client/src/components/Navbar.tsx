"use client";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { useAuth } from "@/src/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { user } = useAuth();

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className={`h-screen w-20 p-4 shadow-xl ${isOpen ? "w-60" : "w-20"}`}>
      <div className="flex flex-col items-center gap-5">
        <div>
          <MenuIcon
            onClick={handleClick}
            className={`hovering ${isOpen ? "mb-5 ml-6 self-start" : null}`}
          />

          {isOpen && (
            <div className="flex flex-col items-center">
              {" "}
              <AccountCircleIcon sx={{ fontSize: 60 }} className="mb-4" />
              <h1>{user?.username}</h1>
              <h1 className="text-sm text-black/50">{user?.email}</h1>
            </div>
          )}
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
              className="cursor-pointer rounded-md bg-red-900 px-2 py-1 text-white"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="cursor-pointer rounded-md bg-black px-2 py-1 text-white">
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
