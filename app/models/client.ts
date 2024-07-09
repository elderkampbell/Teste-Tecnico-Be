import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany} from '@adonisjs/lucid/orm'
import Address from './address.js'
import Phone from './phone.js'
import Sale from './sale.js'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare cpf: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Address)
  declare endereço: HasMany<typeof Address>

  @hasMany(() => Phone)
  declare telefones: HasMany<typeof Phone>

  @hasMany(() => Sale)
  declare vendas: HasMany<typeof Sale>

  public static table = 'clientes'
}