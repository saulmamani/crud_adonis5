import { rules, schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateBookValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    code: schema.string({}, [
      rules.required(),
      rules.unique({
        table: 'books',
        column: 'code',
        caseInsensitive: true,
        whereNot: { id: this.ctx.params.id },
      }),
    ]),
    name: schema.string({}, [rules.required(), rules.minLength(3), rules.maxLength(50)]),
    pages: schema.number([rules.required(), rules.range(1, 1000)]),
    description: schema.string({}, [rules.minLength(5), rules.maxLength(2500)]),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    required: '{{field}} requerido',
    unique: '{{field}} debe ser único',
  };
}
