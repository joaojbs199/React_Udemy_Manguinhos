export interface SaveAccesToken {
  save: (accessToken: string) => Promise<void>
}
