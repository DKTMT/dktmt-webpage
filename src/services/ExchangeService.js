import APIClient from "./APIClient"

class ExchangeService {
  static client = new APIClient({pathPrefix: '/exchange/binance'})

  static async add_api(body) {
    const data = await this.client.fetch({
      path: '/api',
      method: "POST",
      body,
    })

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

    return data
  }

  static async validate_user() {
    const data = await this.client.fetch({
      path: '/validate',
      method: "GET",
    })

    return data
  }
}

export default ExchangeService