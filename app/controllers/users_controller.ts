import { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  public async signup({ request, response }: HttpContext) {
    try {
      const { email, senha } = request.only(['email', 'senha'])

      const hashedSenha = await hash.make(senha)

      const user = new User()
      user.email = email
      user.senha = hashedSenha
      await user.save()

      return response.created({ message: 'Usuario criado com sucesso', user })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ error: 'Falha ao criar usuario' })
    }
  }

  // public async login({ request, auth, response }: HttpContext) {
  //   const { email, senha } = request.only(['email', 'senha'])

  //   try {
  //     const user = await User.findBy('email', email)

  //     if (!user) {
  //       return response.unauthorized({ error: 'Credenciais invalidas' })
  //     }

  //     const token = await User.accessTokens.create(user)

  //     const isPasswordValid = await user.verifyPassword(senha)

  //     if (!isPasswordValid) {
  //       return response.unauthorized({ error: 'Credenciais invalidas' })
  //     }

  //     return response.ok({ message: 'Login bem sucedido', token })
  //   } catch (error) {
  //     console.error(error)
  //     return response.internalServerError({ error: 'Falha ao autenticar' })
  //   }
  // }

  // public async login({ request, response }: HttpContext) {
  //   const { email, password } = request.only(['email', 'password'])
  //   try {
  //     const token = await User.accessTokens.create(email, password)
  //     return response.ok({ message: 'Login successful', token })
  //   } catch {
  //     return response.badRequest({ message: 'Invalid credentials' })
  //   }
  // }

  public async login({ request, response }: HttpContext) {
    const { email, senha } = request.only(['email', 'senha'])
  
    try {
      const user = await User.findByOrFail('email', email)
  
      if ((await hash.verify(user.senha, senha))) {
        return response.badRequest({ message: 'Credenciais Invalidas' })
      }
  
      const token = await hash.make(user.email + user.senha)
      return response.ok({ message: 'Login bem sucedido', token })
    } catch {
      return response.badRequest({ message: 'Credenciais Invalidas' })
    }
  }
}
