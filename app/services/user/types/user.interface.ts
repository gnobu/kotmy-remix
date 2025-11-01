import { StageMediaType, StageStatus } from "~/lib/types/contest.interface"

export interface IPendingContestantUpload{
  fullName: string
  contestantCode: string
  contestName: string
  stage: number
  status: StageStatus,
  stageMediaType: StageMediaType | string
  contestImage: string
  contestantId: string
}