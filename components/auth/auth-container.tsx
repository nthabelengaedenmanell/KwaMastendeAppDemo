"use client"

import { useState } from "react"
import { LoginScreen } from "./login-screen"
import { SignupScreen } from "./signup-screen"
import { ForgotPasswordScreen } from "./forgot-password-screen"

type AuthView = "login" | "signup" | "forgot-password"

export function AuthContainer() {
  const [currentView, setCurrentView] = useState<AuthView>("login")

  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginScreen
            onSwitchToSignup={() => setCurrentView("signup")}
            onForgotPassword={() => setCurrentView("forgot-password")}
          />
        )
      case "signup":
        return <SignupScreen onSwitchToLogin={() => setCurrentView("login")} />
      case "forgot-password":
        return <ForgotPasswordScreen onBackToLogin={() => setCurrentView("login")} />
      default:
        return (
          <LoginScreen
            onSwitchToSignup={() => setCurrentView("signup")}
            onForgotPassword={() => setCurrentView("forgot-password")}
          />
        )
    }
  }

  return <div>{renderCurrentView()}</div>
}
