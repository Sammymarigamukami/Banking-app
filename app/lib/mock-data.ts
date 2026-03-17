export const userData = {
  name: "Null",
  email: "null@email.com",
  avatar: "/avatars/user.jpg",
}

export const accounts = [
  {
    id: "1",
    name: "Checking Account",
    type: "checking",
    number: "****4521",
    balance: 12450.0,
  },
  {
    id: "2",
    name: "Savings Account",
    type: "savings",
    number: "****7832",
    balance: 45230.5,
  },
  {
    id: "3",
    name: "Business Account",
    type: "business",
    number: "****9156",
    balance: 89120.75,
  },
]

export const transactions = [
  {
    id: "1",
    date: "Mar 12, 2026",
    description: "Amazon Purchase",
    category: "Shopping",
    amount: -8956.99,
    status: "completed",
  },
  {
    id: "2",
    date: "Mar 11, 2026",
    description: "Salary Deposit",
    category: "Income",
    amount: 5200.0,
    status: "completed",
  },
  {
    id: "3",
    date: "Mar 10, 2026",
    description: "Electricity Bill",
    category: "Utilities",
    amount: -124.5,
    status: "completed",
  },
  {
    id: "4",
    date: "Mar 9, 2026",
    description: "Transfer to Savings",
    category: "Transfer",
    amount: -50043.0,
    status: "completed",
  },
  {
    id: "5",
    date: "Mar 8, 2026",
    description: "Uber Ride",
    category: "Transport",
    amount: -2334.45,
    status: "completed",
  },
  {
    id: "6",
    date: "Mar 7, 2026",
    description: "Grocery Store",
    category: "Food",
    amount: -1563.78,
    status: "pending",
  },
]

export const cardData = {
  type: "Visa Debit",
  number: "4521 **** **** 7832",
  holder: "Null",
  expiry: "09/28",
  cvv: "***",
}

export const analytics = [
  { category: "Food", amount: 450, color: "bg-chart-1", percentage: 30 },
  { category: "Transport", amount: 180, color: "bg-chart-2", percentage: 12 },
  { category: "Shopping", amount: 620, color: "bg-chart-3", percentage: 41 },
  { category: "Utilities", amount: 250, color: "bg-chart-4", percentage: 17 },
]

export const savingsGoals = [
  {
    id: "1",
    name: "Vacation Fund",
    saved: 1200,
    target: 3000,
    icon: "plane",
  },
  {
    id: "2",
    name: "New Car",
    saved: 8500,
    target: 25000,
    icon: "car",
  },
  {
    id: "3",
    name: "Emergency Fund",
    saved: 4200,
    target: 10000,
    icon: "shield",
  },
]

export const monthlyStats = {
  income: 6450.0,
  expenses: 2340.78,
}
