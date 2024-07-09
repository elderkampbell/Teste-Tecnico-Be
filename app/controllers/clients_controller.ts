import type { HttpContext } from '@adonisjs/core/http'
import Client from '../models/client.js'

export default class ClientsController {
    public async index({ response }: HttpContext) {
        const clients = await Client.query().orderBy('id')
        return response.ok(clients)
      }

      public async findById({ params, response }: HttpContext) {
        try {
            const client = await Client.findOrFail(params.id)
            return response.ok(client)
        } catch (error) {
            return response.notFound({ message: 'Cliente não encontrado' })
        }
    }
    
      public async show({ params, response }: HttpContext) {
        const client = await Client.query().where('id', params.cliente_id).preload('vendas', (salesQuery) => {
          salesQuery.orderBy('data_venda', 'desc')
        }).firstOrFail()
    
        return response.ok(client)
      }
    
      public async store({ request, response }: HttpContext) {
        const data = request.only(['nome', 'cpf'])
        const client = await Client.create(data)
        return response.created(client)
      }
    
      public async update({ params, request, response }: HttpContext) {
        const data = request.only(['nome', 'cpf'])
        const client = await Client.findOrFail(params.id)
        client.merge(data)
        await client.save()
        return response.ok(client)
      }
    
      public async destroy({ params, response }: HttpContext) {
        const client = await Client.findOrFail(params.id)
        await client.delete()
        return response.ok({ message: 'Cliente excluido com sucesso' })
      }
}