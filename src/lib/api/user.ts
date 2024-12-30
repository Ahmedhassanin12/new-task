import type { UserResponse } from "@/common/types/session.type"
import { ApiClient } from "./apiClient"

export const userInfo = async (accessToken: string | null | undefined): Promise<[UserResponse | null, unknown | null]> => {
  if (!accessToken) return [null, "access token is required"]
  try {
    console.log({ url: process.env.BASE_URL })
    const res = await ApiClient<UserResponse>("https://api-yeshtery.dev.meetusvr.com/v1/user/info", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    })
    return [res.data, null]
  } catch (error) {
    return [null, error]
  }
}