import { Card } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Building2, Lock, Bell, Users } from 'lucide-react'

import { AdminLayout } from '../_components/layouts/adminLayout'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Switch } from '~/components/ui/switch'
export const metadata = {
  title: 'Settings | NexusBank Admin',
  description: 'Admin settings and configuration',
}

export default function SettingsPage() {
  return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-2">Manage system settings and preferences</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bank" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
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
          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6">
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
