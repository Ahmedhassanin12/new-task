import { create } from 'zustand'
import type { IAction, IState } from './types/store.type'

const initState: IState = {
  error: null,
  loading: false,
  user: null
}

export const useStore = create<IState & IAction>((set) => ({
  ...initState,
  setError: (error) => set((state) => ({ ...state, error })),
  setUser: (user) => set((state) => ({ ...state, user })),
  setLoading: (loading) => set((state) => ({ ...state, loading })),
})) 