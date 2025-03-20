"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { fetchUsers, fetchUserPosts, fetchPostComments } from "@/lib/api"
import type { Post, Comment } from "@/lib/types"

interface DataContextType {
  users: Record<string, string>
  posts: Post[]
  comments: Record<string, Comment[]>
  topUsers: { id: string; name: string; postCount: number }[]
  trendingPosts: { post: Post; commentCount: number; userName: string }[]
  isLoading: boolean
  error: string | null
  refreshData: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<Record<string, string>>({})
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Record<string, Comment[]>>({})
  const [topUsers, setTopUsers] = useState<{ id: string; name: string; postCount: number }[]>([])
  const [trendingPosts, setTrendingPosts] = useState<{ post: Post; commentCount: number; userName: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Fetch all users
      const usersData = await fetchUsers()
      setUsers(usersData.users)

      // Fetch posts for all users
      const allPosts: Post[] = []
      const userPostCounts: Record<string, number> = {}

      // Process users in batches to avoid too many concurrent requests
      const userIds = Object.keys(usersData.users)

      for (const userId of userIds) {
        try {
          const userPosts = await fetchUserPosts(userId)
          if (userPosts.posts) {
            allPosts.push(...userPosts.posts)
            userPostCounts[userId] = userPosts.posts.length
          }
        } catch (err) {
          console.error(`Error fetching posts for user ${userId}:`, err)
          // Continue with other users even if one fails
        }
      }

      setPosts(allPosts)

      // Calculate top 5 users
      const sortedUsers = Object.entries(userPostCounts)
        .map(([id, count]) => ({
          id,
          name: usersData.users[id],
          postCount: count,
        }))
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, 5)

      setTopUsers(sortedUsers)

      // Fetch comments for all posts
      const commentsData: Record<string, Comment[]> = {}
      const postCommentCounts: Record<string, number> = {}
      let maxComments = 0

      // Process posts in batches to avoid too many concurrent requests
      for (const post of allPosts) {
        try {
          const postComments = await fetchPostComments(post.id.toString())
          if (postComments.comments) {
            commentsData[post.id] = postComments.comments
            postCommentCounts[post.id] = postComments.comments.length

            if (postComments.comments.length > maxComments) {
              maxComments = postComments.comments.length
            }
          }
        } catch (err) {
          console.error(`Error fetching comments for post ${post.id}:`, err)
          // Continue with other posts even if one fails
          commentsData[post.id] = []
          postCommentCounts[post.id] = 0
        }
      }

      setComments(commentsData)

      // Calculate trending posts (posts with max comments)
      const trending = allPosts
        .filter((post) => postCommentCounts[post.id] === maxComments && maxComments > 0)
        .map((post) => ({
          post,
          commentCount: postCommentCounts[post.id],
          userName: usersData.users[post.userid.toString()],
        }))

      setTrendingPosts(trending)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Failed to fetch data. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshData()

    // Set up polling for feed updates (every 60 seconds to reduce load)
    const intervalId = setInterval(() => {
      refreshData()
    }, 60000)

    return () => clearInterval(intervalId)
  }, [refreshData])

  return (
    <DataContext.Provider
      value={{
        users,
        posts,
        comments,
        topUsers,
        trendingPosts,
        isLoading,
        error,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

