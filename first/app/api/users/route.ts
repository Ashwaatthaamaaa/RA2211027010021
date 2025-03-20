import { NextResponse } from "next/server"

const API_BASE_URL = "http://20.244.56.144/test"
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDc1NjY1LCJpYXQiOjE3NDI0NzUzNjUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjA5Zjk4MzRlLTFlMTMtNDc0OS1hNmMwLTVjOGMyNjQ0ZmVmYyIsInN1YiI6InNrNTYzM0Bzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiU1JNIFVOSVZFUlNJVFkiLCJjbGllbnRJRCI6IjA5Zjk4MzRlLTFlMTMtNDc0OS1hNmMwLTVjOGMyNjQ0ZmVmYyIsImNsaWVudFNlY3JldCI6ImJjekRvRUJPdFp5SWd0aVUiLCJvd25lck5hbWUiOiJTYXJ0aGFrIEt1bWFyIiwib3duZXJFbWFpbCI6InNrNTYzM0Bzcm1pc3QuZWR1LmluIiwicm9sbE5vIjoiUkEyMjExMDI3MDEwMDIxIn0.qRgL3kcSRFXD8jlZExSl8Dsto9Gkb5vM-d5-LzewY7Q"

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
