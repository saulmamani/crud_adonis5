import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BookController {
  public async index({ request, response }: HttpContextContract) {
    const data = await request.all()
    let books = await Book.query()
      .where('name', 'ilike', `%${data.txtBuscar}%`)
      .orWhere('description', 'ilike', `%${data.txtBuscar}%`)
      .preload('user')
    return response.send(books)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.all()
    const book = await Book.create(data)
    return response.json({ success: book.$isPersisted })
  }

  public async show({ params, response }: HttpContextContract) {
    let book = await Book.findOrFail(params.id)
    await book.load('user')
    return response.send(book)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.all()
    await Book.query().where('id', params.id).update(data)
    return response.json({ success: true })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const book = await Book.findOrFail(params.id)
    await book.delete()
    return response.json({ success: book.$isDeleted })
  }
}
