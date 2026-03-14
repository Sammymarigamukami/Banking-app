"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Snowflake, Eye } from "lucide-react"
import { cardData } from "~/lib/mock-data"

export function CardPreview() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Your Card
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Card Design */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary to-accent p-5 text-primary-foreground">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-foreground/10" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary-foreground/10" />
          <div className="relative space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium opacity-90">NexusBank</span>
              <span className="text-xs uppercase opacity-75">{cardData.type}</span>
            </div>
            <div className="font-mono text-lg tracking-widest">
              {cardData.number}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase opacity-75">Card Holder</p>
                <p className="text-sm font-medium">{cardData.holder}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase opacity-75">Expires</p>
                <p className="text-sm font-medium">{cardData.expiry}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Snowflake className="mr-2 h-4 w-4" />
            Freeze Card
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
