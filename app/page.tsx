import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { HomeScreen } from "@/components/home/home-screen"

export default async function HomePage() {
  let user = null

  if (!isSupabaseConfigured) {
    // Check for demo user cookie
    const cookieStore = cookies()
    const demoUserCookie = cookieStore.get("demo-user")

    if (demoUserCookie) {
      try {
        user = JSON.parse(demoUserCookie.value)
      } catch (error) {
        console.error("Error parsing demo user cookie:", error)
      }
    }

    if (!user) {
      redirect("/auth/login")
    }
  } else {
    // Use Supabase authentication
    const supabase = createClient()
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser()

    if (!supabaseUser) {
      redirect("/auth/login")
    }

    user = supabaseUser
  }

  return <HomeScreen user={user} />
}
