import { Link } from "react-router";
import CustomerLoginForm from "~/components/forms/authForms/CustomerLoginForm";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react"; // Optional: adds a nice back icon

export default function CustomerLogin() {
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

      {/* Centered Form */}
      <CustomerLoginForm />
    </div>
  );
}