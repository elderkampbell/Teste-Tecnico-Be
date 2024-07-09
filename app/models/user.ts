import { DateTime } from 'luxon'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column, beforeSave } from '@adonisjs/lucid/orm'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare senha: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  
  public async verifyPassword(senha: string): Promise<boolean> {
    return await hash.verify(this.senha, senha)
  }
  
  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.senha) {
      user.senha = await hash.make(user.senha)
    }
  }
  
  public static table = 'usuarios'
  static accessTokens = DbAccessTokensProvider.forModel(User)
}