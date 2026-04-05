import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import RegisterForm from "~/components/forms/authForms/RegisterAccount";
import { Button } from "~/components/ui/button";

export default function RegisterAccount() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-muted/30 py-10">
      {/* Top Left Navigation */}
      <div className="absolute top-6 left-6">
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
        </Button>
      </div>

      {/* Centered Registration Form */}
      <div className="w-full max-w-2xl px-4">
        <RegisterForm />
      </div>
    </div>
  );
}