declare namespace Additional {
  namespace Github {
    type ContributionDays = {
      contributionCount: number
      date: string
    }

    type Week = {
      contributionDays: ContributionDay[]
    }
  }
}

interface ImportMetaEnv {
  readonly SECRET_GITHUB_TOKEN: string
}
