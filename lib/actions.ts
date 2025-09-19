"use server"

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  if (!isSupabaseConfigured) {
    // Mock authentication - accept any email/password combination
    if (email && password) {
      const cookieStore = cookies()
      cookieStore.set(
        "demo-user",
        JSON.stringify({
          id: "demo-user-" + Date.now(),
          email: email.toString(),
          name: email.toString().split("@")[0],
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        },
      )
      revalidatePath("/", "layout")
      return { success: true }
    }
    return { error: "Invalid credentials" }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/", "layout")
    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const fullName = formData.get("fullName")
  const phone = formData.get("phone")

  if (!email || !password || !fullName || !phone) {
    return { error: "All fields are required" }
  }

  if (!isSupabaseConfigured) {
    // Mock sign up - accept any valid data
    const cookieStore = cookies()
    cookieStore.set(
      "demo-user",
      JSON.stringify({
        id: "demo-user-" + Date.now(),
        email: email.toString(),
        name: fullName.toString(),
        phone: phone.toString(),
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    )
    revalidatePath("/", "layout")
    return { success: "Account created successfully!" }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
      options: {
        emailRedirectTo: "https://kwamastende.vercel.app/auth/login",
        data: {
          full_name: fullName.toString(),
          phone_number: phone.toString(),
        },
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { success: "Check your email to confirm your account." }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function forgotPassword(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")

  if (!email) {
    return { error: "Email is required" }
  }

  if (!isSupabaseConfigured) {
    // Mock password reset - always succeed
    return { success: "Password reset email sent. Check your inbox." }
  }

  const supabase = createClient()

  try {
    const resetUrl =
      process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
      (typeof window !== "undefined"
        ? `${window.location.origin}/auth/reset-password`
        : `https://preview-modern-ui-design-kzmphcwhz29800n1l45w.vusercontent.net/auth/reset-password`)

    const { error } = await supabase.auth.resetPasswordForEmail(email.toString(), {
      redirectTo: resetUrl,
    })

    if (error) {
      return { error: error.message }
    }

    return { success: "Password reset email sent. Check your inbox." }
  } catch (error) {
    console.error("Forgot password error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signOut() {
  if (!isSupabaseConfigured) {
    const cookieStore = cookies()
    cookieStore.delete("demo-user")
    revalidatePath("/", "layout")
    redirect("/auth/login")
    return
  }

  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/auth/login")
}

export async function updatePassword(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  if (!password || !confirmPassword) {
    return { error: "Both password fields are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase.auth.updateUser({
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/", "layout")
    return { success: "Password updated successfully" }
  } catch (error) {
    console.error("Update password error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}
