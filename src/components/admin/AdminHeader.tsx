
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
          className="flex items-center gap-2"
          onClick={() => navigate("/")}
          title="Vai alla home"
        >
          <Home className="w-5 h-5 text-orange-600" />
          <img src="/lovable-uploads/ad1b3b88-da57-4d85-aa1a-0c4f08dc43f8.png" alt="RistoReply Admin" className="h-24 w-auto" />
          <span className="text-orange-700 text-sm font-medium">Admin</span>
        </button>
      </div>
      <button
        onClick={() => signOut(() => navigate("/"))}
        className="inline-flex items-center gap-2 rounded bg-gray-100 hover:bg-orange-50 text-gray-700 px-4 py-2 text-sm font-medium transition"
      >
        <LogOut className="h-4 w-4" />
        Esci
      </button>
    </header>
  );
}
