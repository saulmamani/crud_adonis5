import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    try {
      const { email, password } = request.all();
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '8hours',
      });
      return response.json({
        token,
      });
    } catch (error) {
      return response.status(401).json({
        message: error.message,
      });
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.logout();
      return response.status(200).json({
        message: 'Adios!',
      });
    } catch (error) {
      return response.status(401).json({
        message: error.message,
      });
    }
  }
}
