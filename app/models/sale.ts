import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Client from './client.js'
import Product from './product.js'


export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cliente_id: number

  @column()
  declare produto_id: number

  @column()
  declare quantidade: number

  @column()
  declare preco_unit: number

  @column()
  declare preco_total: number

  @column()
  declare data_venda: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  public static table = 'vendas'
}