import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import AdminLoginForm from "~/components/forms/authForms/AdminLoginForm";
import { Button } from "~/components/ui/button";

export default function EmployeeLogin() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-muted/30">
      {/* Top Left Navigation */}
      <div className="absolute top-6 left-6">
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
        </Button>
      </div>

      {/* Centered Login Form */}
      <div className="w-full max-w-md px-4">
        <AdminLoginForm />
      </div>
    </div>
  );
}