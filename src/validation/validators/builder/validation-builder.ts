import { FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFieldValidation, EmailValidation } from '@/validation/validators'

export class ValidationBuilder {
  private constructor (
    private readonly field: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field (field: string): ValidationBuilder {
    return new ValidationBuilder(field, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.field))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.field))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
