"use client"

import { useEffect, useState } from "react"
import { Snowflake, Eye, Lock, Settings, Plus, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { toast } from "sonner"
// Import the functions we defined in auth.ts
import { getCardDetails, issueNewCard, freezeCard, unfreezeCard } from "~/api/auth"

export default function CardsPage() {
  const [cards, setCards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)

  // --- 1. Load Initial Card Data ---
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true)
      // Fetching card ID 1 as an example to start with
      const result = await getCardDetails(1)
      if (result?.success) {
        setCards([result.data])
      }
      setLoading(false)
    }
    fetchInitialData()
  }, [])

  // --- 2. Handle Add New Card ---
  const handleAddNewCard = async () => {
    const result = await issueNewCard({ card_type: 'debit' })
    if (result?.success) {
      setCards((prev) => [...prev, result.data])
      toast.success("New card issued successfully")
    } else {
      toast.error("Failed to issue new card")
    }
  }

  // --- 3. Handle Freeze/Unfreeze Toggle ---
  const handleToggleStatus = async (cardId: string, currentStatus: string) => {
    setProcessingId(cardId)
    const isFrozen = currentStatus === "blocked" || currentStatus === "frozen"
    
    const result = isFrozen 
      ? await unfreezeCard(cardId) 
      : await freezeCard(cardId)

    if (result?.success) {
      toast.success(result.message)
      // Update local state to reflect the new status
      setCards((prev) => prev.map(c => 
        c.card_id.toString() === cardId ? { ...c, status: result.status } : c
      ))
    } else {
      toast.error(result?.message || "Action failed")
    }
    setProcessingId(null)
  }

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Cards</h1>
          <p className="text-muted-foreground">
            Manage your debit and credit cards.
          </p>
        </div>
        <Button onClick={handleAddNewCard}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Card
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card) => {
          const isBlocked = card.status === "blocked" || card.status === "frozen";
          
          return (
            <Card key={card.card_id} className="overflow-hidden">
              <CardContent className="p-6">
                {/* Card Design (Identical to your original) */}
                <div
                  className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${
                    isBlocked 
                      ? "from-slate-600 to-slate-900 grayscale" 
                      : "from-primary via-primary to-accent"
                  } p-5 text-primary-foreground transition-all`}
                >
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-foreground/10" />
                  <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary-foreground/10" />
                  <div className="relative space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium opacity-90">NexusBank</span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            !isBlocked
                              ? "bg-green-500/20 text-green-100"
                              : "bg-amber-500/20 text-amber-100"
                          }`}
                        >
                          {card.status}
                        </Badge>
                        <span className="text-xs uppercase opacity-75">{card.card_type}</span>
                      </div>
                    </div>
                    <div className="font-mono text-lg tracking-widest">
                      {card.card_number}
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] uppercase opacity-75">Card Holder</p>
                        <p className="text-sm font-medium">User</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase opacity-75">Expires</p>
                        <p className="text-sm font-medium">
                          {card.expiry_date?.split('T')[0] || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions (Connected to APIs) */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-col h-auto py-3"
                    onClick={() => handleToggleStatus(card.card_id.toString(), card.status)}
                    disabled={processingId === card.card_id.toString()}
                  >
                    {processingId === card.card_id.toString() ? (
                      <Loader2 className="h-4 w-4 animate-spin mb-1" />
                    ) : (
                      <Snowflake className={`h-4 w-4 mb-1 ${isBlocked ? "text-blue-400" : ""}`} />
                    )}
                    <span className="text-xs">{isBlocked ? "Unfreeze" : "Freeze"}</span>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="flex-col h-auto py-3">
                    <Eye className="h-4 w-4 mb-1" />
                    <span className="text-xs">Details</span>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="flex-col h-auto py-3">
                    <Lock className="h-4 w-4 mb-1" />
                    <span className="text-xs">PIN</span>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="flex-col h-auto py-3">
                    <Settings className="h-4 w-4 mb-1" />
                    <span className="text-xs">Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Card Benefits (Unchanged) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Card Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Cashback", value: "2%", description: "On all purchases" },
              { title: "Points Earned", value: "12,450", description: "This month" },
              { title: "Travel Insurance", value: "Included", description: "Up to Ksh500K" },
              { title: "ATM Withdrawals", value: "Free", description: "Worldwide" },
            ].map((benefit, i) => (
              <div key={i} className="rounded-lg bg-secondary/50 p-4">
                <p className="text-2xl font-bold text-foreground">{benefit.value}</p>
                <p className="text-sm font-medium">{benefit.title}</p>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}