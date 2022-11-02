export interface Validation {
  id: string
  priority: number
  description: string
}

export interface ValidationResult {
  checkId: string
  value: string
}
