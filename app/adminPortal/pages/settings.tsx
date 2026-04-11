import { Card } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Building2, Lock, Bell, Users, AlertTriangle, Trash2, Search, Plus } from 'lucide-react'

import { AdminLayout } from '../_components/layouts/adminLayout'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Switch } from '~/components/ui/switch'
import { useState } from 'react'
import type { LoanProduct } from '~/lib/type'
import z from 'zod'
import { Empty } from '~/components/ui/empty'
import { Badge } from '~/components/ui/badge'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '~/components/ui/sheet'
import { Slider } from '~/components/ui/slider'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '~/components/ui/alert-dialog'
export const metadata = {
  title: 'Settings | NexusBank Admin',
  description: 'Admin settings and configuration',
}

const loanProductSchema = z.object({
  type_name: z.string().min(1, 'Product name is required'),
  base_interest_rate: z.number().min(0).max(25),
  max_duration_months: z.number().min(1),
  min_amount: z.number().min(0),
  max_amount: z.number().min(0),
})

type LoanProductFormData = z.infer<typeof loanProductSchema>

// Mock data
const mockLoanProducts: LoanProduct[] = [
  {
    id: '1',
    type_name: 'Personal Loan',
    base_interest_rate: 12.5,
    max_duration_months: 60,
    min_amount: 5000,
    max_amount: 250000,
    is_online: true,
  },
  {
    id: '2',
    type_name: 'Auto Loan',
    base_interest_rate: 8.75,
    max_duration_months: 84,
    min_amount: 10000,
    max_amount: 500000,
    is_online: true,
  },
  {
    id: '3',
    type_name: 'Business Loan',
    base_interest_rate: 11.0,
    max_duration_months: 120,
    min_amount: 50000,
    max_amount: 2000000,
    is_online: false,
  },
]

export default function SettingsPage() {
   const [products, setProducts] = useState<LoanProduct[]>(mockLoanProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<LoanProduct | null>(null)
  const [formData, setFormData] = useState<LoanProductFormData>({
    type_name: '',
    base_interest_rate: 0,
    max_duration_months: 0,
    min_amount: 0,
    max_amount: 0,
  })
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const filteredProducts = products.filter((product) =>
    product.type_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setFormData({
      type_name: '',
      base_interest_rate: 0,
      max_duration_months: 0,
      min_amount: 0,
      max_amount: 0,
    })
    setErrors({})
    setIsSheetOpen(true)
  }

  const handleEditProduct = (product: LoanProduct) => {
    setSelectedProduct(product)
    setFormData({
      type_name: product.type_name,
      base_interest_rate: product.base_interest_rate,
      max_duration_months: product.max_duration_months,
      min_amount: product.min_amount,
      max_amount: product.max_amount,
    })
    setErrors({})
    setIsSheetOpen(true)
  }

  const handleSaveProduct = () => {
    try {
      loanProductSchema.parse(formData)
      setErrors({})

      if (selectedProduct) {
        // Update existing product
        setProducts(
          products.map((p) =>
            p.id === selectedProduct.id
              ? { ...selectedProduct, ...formData }
              : p
          )
        )
      } else {
        // Add new product
        const newProduct: LoanProduct = {
          id: Date.now().toString(),
          ...formData,
          is_online: true,
        }
        setProducts([...products, newProduct])
      }

      setIsSheetOpen(false)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)
      }
    }
  }

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id))
      setIsSheetOpen(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleToggleOnline = (productId: string, isOnline: boolean) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, is_online: isOnline } : p
      )
    )
  }
  return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-2">Manage system settings and preferences</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bank" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bank" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Bank Settings</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="loan-products" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Loan Products</span>
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Admin Roles</span>
            </TabsTrigger>
          </TabsList>

          {/* Bank Settings */}
          <TabsContent value="bank" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Bank Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input id="bank-name" defaultValue="NexusBank" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="routing">Routing Number</Label>
                  <Input id="routing" defaultValue="021000021" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="swift">SWIFT Code</Label>
                  <Input id="swift" defaultValue="NEXUSUS33" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="contact">Contact Email</Label>
                  <Input id="contact" defaultValue="support@nexusbank.com" className="mt-2" type="email" />
                </div>
              </div>
              <Button className="mt-6">Save Changes</Button>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Security Policies</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                    <p className="text-sm text-slate-600 mt-1">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                  <div>
                    <p className="font-medium text-slate-900">IP Whitelisting</p>
                    <p className="text-sm text-slate-600 mt-1">Restrict access to specific IP addresses</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                  <div>
                    <p className="font-medium text-slate-900">Session Timeout</p>
                    <p className="text-sm text-slate-600 mt-1">Auto logout after 30 minutes of inactivity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6 overflow-y-auto">
            <Card className="p-6 mb-3">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">High Risk Alerts</p>
                    <p className="text-sm text-slate-600 mt-1">Notify on high-risk fraud alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                  <div>
                    <p className="font-medium text-slate-900">Large Transactions</p>
                    <p className="text-sm text-slate-600 mt-1">Notify on transactions over $100,000</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                  <div>
                    <p className="font-medium text-slate-900">Daily Summary</p>
                    <p className="text-sm text-slate-600 mt-1">Receive daily activity summary email</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

          </TabsContent>

          <TabsContent value="loan-products" className="space-y-6 focus-visible:outline-none">
            <Card className="flex flex-col h-full max-h-[calc(100vh-200px)]">
                  {/* Header with Search and Add Button */}
                  <div className="sticky top-0 z-10 bg-white pb-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="w-full sm:w-64">
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Search loan products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 bg-slate-50"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleAddProduct}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </div>

              {/* Products Grid or Empty State */}
              {filteredProducts.length === 0 && searchQuery === '' ? (
                <Empty
                  icon={<AlertTriangle className="h-12 w-12 text-slate-400" />}
                  title="Create your first loan product"
                  description="No loan products yet. Click the button above to create one."
                />
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-600">No products found matching "{searchQuery}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="p-6 hover:shadow-lg transition-shadow cursor-pointer border border-slate-200"
                      onClick={() => handleEditProduct(product)}
                    >
                      <div className="space-y-4">
                        {/* Header with name and interest rate badge */}
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-semibold text-zinc-900">{product.type_name}</h3>
                          <Badge className="bg-indigo-100 text-indigo-800 font-semibold text-base px-3 py-1">
                            {product.base_interest_rate}%
                          </Badge>
                        </div>

                        {/* Amount limits */}
                        <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                          <div>
                            <p className="text-xs text-slate-600 uppercase tracking-wide">Min Amount</p>
                            <p className="text-lg font-semibold text-zinc-900">
                              KES {product.min_amount.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 uppercase tracking-wide">Max Amount</p>
                            <p className="text-lg font-semibold text-zinc-900">
                              KES {product.max_amount.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Duration */}
                        <div>
                          <p className="text-sm text-slate-600">Max Duration</p>
                          <p className="text-base font-medium text-zinc-900">
                            {product.max_duration_months} months
                          </p>
                        </div>

                        {/* Status Toggle */}
                        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                          <div>
                            <p className="text-sm font-medium text-zinc-900">Available Online</p>
                            <p className="text-xs text-slate-600">In Instant Loans</p>
                          </div>
                          <Switch
                            checked={product.is_online}
                            onCheckedChange={(checked) =>
                              handleToggleOnline(product.id, checked)
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Edit/Add Sheet */}
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto flex flex-col items-center">
                  <SheetHeader>
                    <SheetTitle>
                      {selectedProduct ? 'Edit Loan Product' : 'Create Loan Product'}
                    </SheetTitle>
                    <SheetDescription>
                      {selectedProduct
                        ? 'Update the loan product configuration'
                        : 'Add a new loan product to your offerings'}
                    </SheetDescription>
                  </SheetHeader>

                  <div className="space-y-6 py-6">
                    {/* Product Name */}
                    <div>
                      <Label htmlFor="type_name" className="text-zinc-900">
                        Product Name
                      </Label>
                      <Input
                        id="type_name"
                        value={formData.type_name}
                        onChange={(e) =>
                          setFormData({ ...formData, type_name: e.target.value })
                        }
                        placeholder="e.g., Personal Loan"
                        className="mt-2"
                      />
                      {errors.type_name && (
                        <p className="text-sm text-red-600 mt-1">{errors.type_name}</p>
                      )}
                    </div>

                    {/* Interest Rate with Slider */}
                    <div>
                      <div className="flex items-center justify-between">
                        <Label className="text-zinc-900">Base Interest Rate</Label>
                        <span className="text-lg font-semibold text-indigo-600">
                          {formData.base_interest_rate}%
                        </span>
                      </div>
                      <div className="mt-4">
                        <Slider
                          value={[formData.base_interest_rate]}
                          onValueChange={(value) =>
                            setFormData({ ...formData, base_interest_rate: value[0] })
                          }
                          min={0}
                          max={25}
                          step={0.25}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-600 mt-2">
                        <span>0%</span>
                        <span>25%</span>
                      </div>
                    </div>

                    {/* Max Duration */}
                    <div>
                      <Label htmlFor="max_duration" className="text-zinc-900">
                        Max Duration (months)
                      </Label>
                      <Input
                        id="max_duration"
                        type="number"
                        value={formData.max_duration_months}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            max_duration_months: Number(e.target.value),
                          })
                        }
                        placeholder="e.g., 60"
                        className="mt-2"
                      />
                      {errors.max_duration_months && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.max_duration_months}
                        </p>
                      )}
                    </div>

                    {/* Min Amount */}
                    <div>
                      <Label htmlFor="min_amount" className="text-zinc-900">
                        Minimum Amount (KES)
                      </Label>
                      <Input
                        id="min_amount"
                        type="number"
                        value={formData.min_amount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            min_amount: Number(e.target.value),
                          })
                        }
                        placeholder="e.g., 5000"
                        className="mt-2"
                      />
                      {errors.min_amount && (
                        <p className="text-sm text-red-600 mt-1">{errors.min_amount}</p>
                      )}
                    </div>

                    {/* Max Amount */}
                    <div>
                      <Label htmlFor="max_amount" className="text-zinc-900">
                        Maximum Amount (KES)
                      </Label>
                      <Input
                        id="max_amount"
                        type="number"
                        value={formData.max_amount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            max_amount: Number(e.target.value),
                          })
                        }
                        placeholder="e.g., 250000"
                        className="mt-2"
                      />
                      {errors.max_amount && (
                        <p className="text-sm text-red-600 mt-1">{errors.max_amount}</p>
                      )}
                    </div>

                    {/* Save Button */}
                    <Button
                      onClick={handleSaveProduct}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      {selectedProduct ? 'Update Product' : 'Create Product'}
                    </Button>

                    {/* Danger Zone */}
                    {selectedProduct && (
                      <div className="border-t border-slate-200 pt-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Danger Zone
                          </h4>
                          <p className="text-sm text-red-700 mb-4">
                            This action cannot be undone. Deleting a loan product will remove it from all
                            categories.
                          </p>
                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => setIsDeleteDialogOpen(true)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Product
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Delete Confirmation Dialog */}
              <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Loan Product?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{selectedProduct?.type_name}"? This action cannot be
                      undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex gap-3 justify-end">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteProduct} className="bg-red-600 hover:bg-red-700">
                      Delete
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </Card>
          </TabsContent>

          {/* Admin Roles */}
          <TabsContent value="roles" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Admin Roles & Permissions</h3>
              <div className="space-y-4">
                {['Super Admin', 'Loan Officer', 'Risk Officer', 'Support Admin'].map((role, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900">{role}</p>
                      <Button variant="outline" size="sm">
                        Edit Permissions
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-6" variant="outline">
                Add New Role
              </Button>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
  )
}
