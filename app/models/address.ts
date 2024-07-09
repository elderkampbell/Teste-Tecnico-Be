import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Client from './client.js'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare rua: string

  @column()
  declare numero: string

  @column()
  declare bairro: string

  @column()
  declare cidade: string

  @column()
  declare estado: string

  @column()
  declare cep: string

  @column()
  declare cliente_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  public static table = 'enderecos'
}