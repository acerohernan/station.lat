import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class Validator {
  static async validate(
    classToValidate: { new (): object },
    plainObject: any
  ): Promise<{ success: boolean; errors: Array<string> }> {
    const instance = plainToInstance(classToValidate, plainObject);
    const validationErrors = await validate(instance);
    const errors = validationErrors.map((error) => Object.values(error.constraints ?? {})[0]);
    const success = errors.length === 0;

    return { errors, success };
  }
}
