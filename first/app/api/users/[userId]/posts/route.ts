import { NextResponse } from "next/server"

const API_BASE_URL = "http://20.244.56.144/test"

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId

    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch posts for user ${userId}: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error fetching posts:`, error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

