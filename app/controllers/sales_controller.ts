import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Client from '../models/client.js'
import Product from '../models/product.js'
import Sale from '../models/sale.js'

export default class SalesController {
  public async index({ response }: HttpContext) {
    const sales = await Sale.query().preload('client').preload('product').orderBy('data_venda', 'desc')
    console.log('Macaco')
    return response.ok(sales)
  }

  public async show({ params, response }: HttpContext) {
    const sale = await Sale.query().where('id', params.cliente_id).preload('client').preload('product').firstOrFail()
    console.log(params)
    console.log('Macaco')
    return response.ok(sale)
  }

  public async store({ request, response }: HttpContext) {
    const { cliente_id, produto_id, quantidade } = request.only(['cliente_id', 'produto_id', 'quantidade'])

    const client = await Client.findOrFail(cliente_id)
    const product = await Product.findOrFail(produto_id)

    const unit_price = product.preco
    const total_price = unit_price * quantidade

    const sale = new Sale()
    sale.cliente_id = client.id
    sale.produto_id = product.id
    sale.quantidade = quantidade
    sale.preco_unit = unit_price
    sale.preco_total = total_price
    sale.data_venda = DateTime.now()
    await sale.save()

    return response.created(sale)
  }

  public async update({ params, request, response }: HttpContext) {
    const sale = await Sale.findOrFail(params.id)
    const data = request.only(['quantidade', 'preco_unit', 'preco_total', 'data_venda'])
    sale.merge(data)
    await sale.save()
    return response.ok(sale)
  }

  public async destroy({ params, response }: HttpContext) {
    const sale = await Sale.findOrFail(params.id)
    await sale.delete()
    return response.ok({ message: 'Venda excluida com sucesso' })
  }
}
