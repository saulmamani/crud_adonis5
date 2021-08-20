import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BookController {
  public async index({ request, response }: HttpContextContract) {
    let data = await request.all()
    let books = await Book.query()
      .where('name', 'ilike', `%${data.txtBuscar}%`)
      .orWhere('description', 'ilike', `%${data.txtBuscar}%`)
      .preload('user')
    return response.send(books)
  }

  // public async store({ params, response }: HttpContextContract) {

  // }

  public async show({ params, response }: HttpContextContract) {
    let book = await Book.findOrFail(params.id)
    await book.load('user')
    return response.send(book)
  }

  // public async update({}: HttpContextContract) {
  // }

  // public async destroy({}: HttpContextContract) {
  // }
}
