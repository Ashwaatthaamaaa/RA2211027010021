"use client"

import { useData } from "@/context/data-context"
import UserCard from "@/components/user-card"
import { UserCardSkeleton } from "@/components/loading-skeleton"
import ErrorDisplay from "@/components/error-display"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TopUsersPage() {
  const { topUsers, isLoading, error, refreshData } = useData()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Top Users</h1>
        <Button variant="outline" size="sm" onClick={() => refreshData()} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && <ErrorDisplay error={error} onRetry={refreshData} isRetrying={isLoading} />}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array(5)
            .fill(0)
            .map((_, i) => <UserCardSkeleton key={i} />)
        ) : topUsers.length > 0 ? (
          topUsers.map((user, index) => (
            <UserCard key={user.id} userId={user.id} name={user.name} postCount={user.postCount} rank={index + 1} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No users found</p>
          </div>
        )}
      </div>
    </div>
  )
}

