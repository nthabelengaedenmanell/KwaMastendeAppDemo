interface MockUser {
  id: string
  email: string
  name: string
}

class FallbackAuth {
  private currentUser: MockUser | null = null
  private listeners: ((user: MockUser | null) => void)[] = []

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    // Mock authentication - in a real app, this would validate credentials
    if (email && password) {
      this.currentUser = {
        id: "demo-user-" + Date.now(),
        email,
        name: email.split("@")[0],
      }
      this.notifyListeners()
      return { success: true }
    }
    return { success: false, error: "Invalid credentials" }
  }

  async signUp(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    // Mock sign up
    if (email && password) {
      this.currentUser = {
        id: "demo-user-" + Date.now(),
        email,
        name: email.split("@")[0],
      }
      this.notifyListeners()
      return { success: true }
    }
    return { success: false, error: "Invalid data" }
  }

  async signOut(): Promise<void> {
    this.currentUser = null
    this.notifyListeners()
  }

  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    // Mock password reset
    return { success: true }
  }

  getUser(): MockUser | null {
    return this.currentUser
  }

  onAuthStateChange(callback: (user: MockUser | null) => void) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentUser))
  }
}

export const fallbackAuth = new FallbackAuth()
