import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the top users page by default
  redirect("/top-users")
}

