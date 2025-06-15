
import React from "react";
import { LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminHeader() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full flex justify-between items-center bg-white border-b shadow-sm px-6 py-4 mb-6">
      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-1 text-orange-700 text-lg font-bold"
          onClick={() => navigate("/")}
          title="Vai alla home"
        >
          <Home className="w-5 h-5" />
          <span>RistoReply Admin</span>
        </button>
      </div>
      <button
        onClick={() => signOut(() => navigate("/admin-login"))}
        className="inline-flex items-center gap-2 rounded bg-gray-100 hover:bg-orange-50 text-gray-700 px-4 py-2 text-sm font-medium transition"
      >
        <LogOut className="h-4 w-4" />
        Esci
      </button>
    </header>
  );
}
