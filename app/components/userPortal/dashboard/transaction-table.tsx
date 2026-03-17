import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { transactions } from "~/lib/mock-data"
import { cn } from "~/lib/utils"

export function TransactionTable({ className }: { className?: string }) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Recent Transactions
        </CardTitle>
        <a
          href="/dashboard/transactions"
          className="text-xs text-primary hover:underline"
        >
          View all
        </a>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="pr-6 text-right hidden md:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.slice(0, 5).map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="pl-6 text-muted-foreground">
                  {transaction.date}
                </TableCell>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="secondary" className="font-normal">
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-medium",
                    transaction.amount > 0 ? "text-green-600" : "text-foreground"
                  )}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  Ksh{Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
                <TableCell className="pr-6 text-right hidden md:table-cell">
                  <Badge
                    variant={transaction.status === "completed" ? "default" : "secondary"}
                    className={cn(
                      "font-normal",
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                    )}
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}