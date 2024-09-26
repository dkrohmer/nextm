import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsDataUriPngConstraint implements ValidatorConstraintInterface {
  validate(dataUri: string, args: ValidationArguments) {
    const dataUriRegex = /^data:image\/png;base64,/;
    return typeof dataUri === 'string' && dataUriRegex.test(dataUri);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Thumbnail must be a valid PNG Data URI';
  }
}

export function IsDataUriPng(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDataUriPngConstraint,
    });
  };
}
