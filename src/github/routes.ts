const BASE_URL = "https://api.github.com"

export const routes = {
  user: (username: string) => `${BASE_URL}/users/${username}`
}