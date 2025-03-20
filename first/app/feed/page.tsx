"use client"

import { useData } from "@/context/data-context"
import PostCard from "@/components/post-card"
import { PostCardSkeleton } from "@/components/loading-skeleton"
import ErrorDisplay from "@/components/error-display"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeedPage() {
  const { posts, users, comments, isLoading, error, refreshData } = useData()

  // Sort posts by ID in descending order (assuming higher IDs are newer)
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Feed</h1>
        <Button variant="outline" size="sm" onClick={() => refreshData()} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && <ErrorDisplay error={error} onRetry={refreshData} isRetrying={isLoading} />}

      <div className="grid gap-6">
        {isLoading ? (
          Array(5)
            .fill(0)
            .map((_, i) => <PostCardSkeleton key={i} />)
        ) : sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <PostCard
              key={post.id}
              postId={post.id}
              userId={post.userid.toString()}
              userName={users[post.userid.toString()] || "Unknown User"}
              content={post.content}
              commentCount={(comments[post.id] || []).length}
              comments={comments[post.id] || []}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts found</p>
          </div>
        )}
      </div>
    </div>
  )
}

