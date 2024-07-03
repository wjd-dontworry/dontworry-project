import { Tables } from "../db/types/supabase"

export type RootStackParamList = {
  ChallengeCreate: undefined
  ChallengeDetail: { challengeId: number; title: string }
  Board: undefined
  BoardDetail: Tables<"board">
  BoardCreate: Tables<"board"> | undefined
}
