import APIClient from "./APIClient"

class AuthService {
  static client = new APIClient({pathPrefix: '/auth'})

  static async login(body) {
    const data = await this.client.fetch({
      path: '/login',
      method: "POST",
      body,
    })
    localStorage.setItem("user", data.accessToken)

    return data
  }
  static async register(body) {
    const data = await this.client.fetch({
      path: '/register',
      method: "POST",
      body,
    })

    return data
  }
  static async logout() {
    const data = await this.client.fetch({
      path: '/logout',
      method: "POST",
    })
    localStorage.removeItem("user")

    return data
  }

  static async validate_user() {
    const data = await this.client.fetch({
      path: '/validate',
      method: "GET",
    })
    localStorage.removeItem("user")

    return data
  }
}

export default AuthService