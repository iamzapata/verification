export interface Check {
  id: string
  priority: number
  description: string
}

export interface CheckResult {
  checkId: string
  value: string
}
