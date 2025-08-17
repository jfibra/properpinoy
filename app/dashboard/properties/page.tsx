"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { PropertyList } from "@/components/properties/property-list"
import { PropertyForm } from "@/components/properties/property-form"
import { supabase } from "@/lib/supabase"
import type { Property } from "@/lib/supabase"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link"

export default function DashboardPropertiesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [deletingProperty, setDeletingProperty] = useState<Property | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
  }

  const handleDelete = (property: Property) => {
    setDeletingProperty(property)
  }

  const confirmDelete = async () => {
    if (!deletingProperty) return

    try {
      const { error } = await supabase.from("properties").delete().eq("id", deletingProperty.id)

      if (error) throw error

      setRefreshKey((prev) => prev + 1)
      setDeletingProperty(null)
    } catch (error) {
      console.error("Error deleting property:", error)
    }
  }

  const handleFormSuccess = () => {
    setEditingProperty(null)
    setRefreshKey((prev) => prev + 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
            <p className="text-muted-foreground mt-2">Manage your property listings</p>
          </div>
          <Link href="/properties/create">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Listing
            </Button>
          </Link>
        </div>

        <PropertyList
          key={refreshKey}
          showActions={true}
          userId={user.id}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Edit Property Dialog */}
      <Dialog open={!!editingProperty} onOpenChange={() => setEditingProperty(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
            <DialogDescription>Update your property listing details</DialogDescription>
          </DialogHeader>
          {editingProperty && <PropertyForm property={editingProperty} onSuccess={handleFormSuccess} />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingProperty} onOpenChange={() => setDeletingProperty(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingProperty?.title}"? This action cannot be undone and will refund
              1 credit to your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete Property
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
