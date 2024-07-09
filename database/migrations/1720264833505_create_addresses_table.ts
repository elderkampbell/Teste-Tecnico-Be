import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete('CASCADE')
      table.string('rua', 255).notNullable()
      table.string('numero', 50).notNullable()
      table.string('bairro', 255).notNullable()
      table.string('cidade', 255).notNullable()
      table.string('estado', 2).notNullable()
      table.string('cep', 8).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}