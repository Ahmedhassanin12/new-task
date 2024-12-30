import type { UserResponse } from "@/common/types/session.type";

export type IState = {
  error: unknown;
  loading: boolean
  user: UserResponse | null
}

export type IAction = {
  setError: (error: unknown) => void;
  setLoading: (isLoading: boolean) => void;
  setUser: (user: UserResponse | null) => void
}