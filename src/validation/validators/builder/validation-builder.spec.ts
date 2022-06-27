import { RequiredFieldValidation, EmailValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'

describe('Validation builder', () => {
  test('Should return Required field validation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('Should return Email validation', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })
})
