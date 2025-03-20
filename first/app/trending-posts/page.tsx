"use client"

import { useData } from "@/context/data-context"
import PostCard from "@/components/post-card"
import { PostCardSkeleton } from "@/components/loading-skeleton"
import ErrorDisplay from "@/components/error-display"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TrendingPostsPage() {
  const { trendingPosts, comments, isLoading, error, refreshData } = useData()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Trending Posts</h1>
        <Button variant="outline" size="sm" onClick={() => refreshData()} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && <ErrorDisplay error={error} onRetry={refreshData} isRetrying={isLoading} />}

      <div className="grid gap-6 md:grid-cols-2">
        {isLoading ? (
          Array(2)
            .fill(0)
            .map((_, i) => <PostCardSkeleton key={i} />)
        ) : trendingPosts.length > 0 ? (
          trendingPosts.map(({ post, commentCount, userName }) => (
            <PostCard
              key={post.id}
              postId={post.id}
              userId={post.userid.toString()}
              userName={userName}
              content={post.content}
              commentCount={commentCount}
              comments={comments[post.id] || []}
              isTrending={true}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No trending posts found</p>
          </div>
        )}
      </div>
    </div>
  )
}

