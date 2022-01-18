import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

/**
 * Custom decorator to validate that an array of objects doesn't contain multiple objects
 * that have the same value for a given property.
 *
 * @param {string} property - Property to validate uniqueness for.
 * @param {ValidationOptions} validationOptions - Validation options.
 * @returns {Function} - Custom validation decorator.
 */
export default function ObjectArrayUniqueProperty(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: Record<any, any>, propertyName: string): void => {
    registerDecorator({
      name: 'ArrayUnique',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          if (Array.isArray(value)) {
            const distinctValues = [
              ...new Set(value.map((item) => item[property])),
            ];
            return distinctValues.length === value.length;
          }
        },
        defaultMessage(arguments_: ValidationArguments): string {
          return `'${arguments_.property}' contains multiple objects that have the same '${arguments_.constraints[0]}' value`;
        },
      },
    });
  };
}
