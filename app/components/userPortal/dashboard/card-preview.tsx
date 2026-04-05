"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Snowflake, Eye, Loader2 } from "lucide-react"
import { useAuthRedirect, getAllCustomerCards } from "~/api/auth"
import { toast } from "sonner"
import { Link } from "react-router"

export function CardPreview() {
  // 1. Defensively destructure: providing a fallback object {} prevents the "cannot destructure null" error
  const auth = useAuthRedirect() || { customer: null, loading: true };
  const { customer, loading: authLoading } = auth;
  
  const [firstCard, setFirstCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 2. Corrected useEffect logic
  useEffect(() => {
    // Only run if we aren't loading auth and we actually have a customer
    if (authLoading || !customer) return;

    const fetchFirstCard = async () => {
      try {
        const result = await getAllCustomerCards();
        if (result?.success && result.data.length > 0) {
          setFirstCard(result.data[0]);
          console.log("Fetched cards:", result.data);
        }
      } catch (err) {
        console.error("Preview fetch error", err);
        toast.error("Failed to load card information");
      } finally {
        setLoading(false);
      }
    };

    fetchFirstCard();
  }, [authLoading, customer]); // Added dependencies


  // 3. Handle ALL loading states first
  if (authLoading || loading) {
    return (
      <Card className="h-[240px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Syncing card...</p>
        </div>
      </Card>
    );
  }

  // 4. Handle "No Card" state
  if (!firstCard) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-sm">Your Card</CardTitle></CardHeader>
        <CardContent className="flex flex-col items-center py-6 text-center">
          <p className="text-xs text-muted-foreground mb-4">No active cards found.</p>
          <Button asChild size="sm" variant="outline">
            <Link to="/dashboard/cards">Get a Card</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isBlocked = firstCard.status === "blocked" || firstCard.status === "frozen";

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Your Card
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`relative overflow-hidden rounded-xl p-5 text-primary-foreground transition-all duration-500 bg-gradient-to-br 
          ${isBlocked ? "from-slate-600 to-slate-900 grayscale" : "from-primary via-primary to-accent"}`}>
          
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-foreground/10" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary-foreground/10" />
          
          <div className="relative space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium opacity-90">NexusBank</span>
              <span className="text-[10px] uppercase bg-white/20 px-2 py-0.5 rounded">{firstCard.status}</span>
            </div>
            
            <div className="font-mono text-lg tracking-widest">
              **** **** **** {firstCard.card_number?.slice(-4)}
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase opacity-75">Card Holder</p>
                <p className="text-sm font-medium uppercase tracking-tight">
                  {customer?.username || "Valued Member"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase opacity-75">Expires</p>
                <p className="text-sm font-medium">**/**</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to="/dashboard/cards">
              <Snowflake className="mr-2 h-4 w-4" />
              Manage
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to="/dashboard/cards">
              <Eye className="mr-2 h-4 w-4" />
              Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}