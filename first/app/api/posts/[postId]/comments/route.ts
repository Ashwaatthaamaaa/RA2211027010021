import { NextResponse } from "next/server"

const API_BASE_URL = "http://20.244.56.144/test"

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  try {
    const postId = params.postId

    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch comments for post ${postId}: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error fetching comments:`, error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

