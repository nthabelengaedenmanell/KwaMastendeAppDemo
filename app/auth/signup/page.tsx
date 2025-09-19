import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AuthContainer } from "@/components/auth/auth-container"

export default async function SignUpPage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is logged in, redirect to home page
  if (session) {
    redirect("/")
  }

  return <AuthContainer />
}
