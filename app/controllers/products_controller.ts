import type { HttpContext } from '@adonisjs/core/http'
import Product from '../models/product.js'
import { DateTime } from 'luxon'

export default class ProductsController {
    public async index({ response }: HttpContext) {
        const products = await Product.query().orderBy('nome')
        return response.ok(products)
      }
    
      public async show({ params, response }: HttpContext) {
        const product = await Product.findOrFail(params.id)
        return response.ok(product)
      }
    
      public async store({ request, response }: HttpContext) {
        const data = request.only(['nome', 'descricao', 'preco'])
        const product = await Product.create(data)
        return response.created(product)
      }
      public async update({ params, request, response }: HttpContext) {
        const data = request.only(['nome', 'descricao', 'preco'])
        const product = await Product.findOrFail(params.id)
        product.merge(data)
        await product.save()
        return response.ok(product)
      }
    
      public async destroy({ params, response }: HttpContext) {
        const product = await Product.findOrFail(params.id)
        product.merge({ deletedAt: DateTime.now() })
        await product.save()
        return response.ok({ message: 'Produto excluido com sucesso' })
    }
}