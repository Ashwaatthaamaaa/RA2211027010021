// API client for the social media platform

// Fetch all users
export async function fetchUsers() {
  const response = await fetch("/api/users")

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`)
  }

  return response.json()
}

// Fetch posts for a specific user
export async function fetchUserPosts(userId: string) {
  const response = await fetch(`/api/users/${userId}/posts`)

  if (!response.ok) {
    throw new Error(`Failed to fetch posts for user ${userId}: ${response.status}`)
  }

  return response.json()
}

// Fetch comments for a specific post
export async function fetchPostComments(postId: string) {
  const response = await fetch(`/api/posts/${postId}/comments`)

  if (!response.ok) {
    throw new Error(`Failed to fetch comments for post ${postId}: ${response.status}`)
  }

  return response.json()
}

