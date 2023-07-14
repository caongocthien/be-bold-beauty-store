import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../utils'

describe('formatCurrency', () => {
  it('formatCurrency tra ve dinh dang tien', () => {
    expect(formatCurrency(123456789)).toBe('123,456,789')
  })
})
