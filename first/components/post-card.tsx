"use client"

import Image from "next/image"
import { useState } from "react"
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react"
import { generateAvatarUrl, generatePostImageUrl } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Comment } from "@/lib/types"

interface PostCardProps {
  postId: number
  userId: string
  userName: string
  content: string
  commentCount: number
  comments: Comment[]
  isTrending?: boolean
}

export default function PostCard({
  postId,
  userId,
  userName,
  content,
  commentCount,
  comments,
  isTrending = false,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false)

  return (
    <Card className={`overflow-hidden transition-all ${isTrending ? "border-primary" : ""}`}>
      {isTrending && (
        <div className="bg-primary text-primary-foreground py-1 px-4 text-center text-sm font-medium">Trending</div>
      )}
      <CardContent className="p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={generatePostImageUrl(postId) || "/placeholder.svg"}
            alt="Post image"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
              <Image
                src={generateAvatarUrl(userId) || "/placeholder.svg"}
                alt={userName}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{userName}</h3>
              <p className="text-xs text-muted-foreground">Just now</p>
            </div>
          </div>
          <p className="text-sm">{content}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch p-0">
        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{commentCount} comments</span>
          </div>
          {commentCount > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)} className="text-xs">
              {showComments ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" /> Hide comments
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" /> Show comments
                </>
              )}
            </Button>
          )}
        </div>
        {showComments && commentCount > 0 && (
          <div className="border-t p-4 bg-muted/30">
            <h4 className="text-sm font-medium mb-2">Comments</h4>
            <ul className="space-y-3">
              {comments.map((comment) => (
                <li key={comment.id} className="text-sm bg-background p-3 rounded-md">
                  {comment.content}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

