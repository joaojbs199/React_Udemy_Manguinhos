import { FieldValidationSpy } from '../test/mock-field-validation'
import { ValidationComposite } from './validation-composite'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (field: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(field),
    new FieldValidationSpy(field)
  ]
  const sut = new ValidationComposite(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('Validation composite', () => {
  test('Should return error if any validator fails', () => {
    const field = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(field)
    const errorMessage = faker.random.words()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())
    const error = sut.validate(field, faker.random.word())
    expect(error).toBe(errorMessage)
  })

  test('Should return falsy if any validator success', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate(field, faker.random.word())
    expect(error).toBeFalsy()
  })
})
