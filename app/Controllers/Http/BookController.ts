import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Book from 'App/Models/Book';
import BookValidator from 'App/Validators/BookValidator';
import UpdateBookValidator from 'App/Validators/UpdateBookValidator';

export default class BookController {
  public async index({ request, response }: HttpContextContract) {
    const data = await request.all();
    let books = await Book.query()
      .where('name', 'ilike', `%${data.txtBuscar}%`)
      .orWhere('description', 'ilike', `%${data.txtBuscar}%`)
      .preload('user');
    return response.send(books);
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(BookValidator);

    const data = await request.all();
    // todo asociar al usuario autenticado
    data['user_id'] = 1;
    const book = await Book.create(data);
    return response.json({ success: book.$isPersisted });
  }

  public async show({ params, response }: HttpContextContract) {
    let book = await Book.findOrFail(params.id);
    await book.load('user');
    return response.send(book);
  }

  public async update({ params, request, response }: HttpContextContract) {
    await request.validate(UpdateBookValidator);

    const data = await request.all();
    await Book.query().where('id', params.id).update(data);
    return response.json({ success: true });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const book = await Book.findOrFail(params.id);
    await book.delete();
    return response.json({ success: book.$isDeleted });
  }

  public async uploadPortada({ params, request, response }) {
    const portada = request.file('portada', {
      types: ['image'],
      size: '2mb',
    });

    const namePortada = `${params.id}.${portada.extname}`;
    if (portada) {
      await portada.move('./public/portadas', {
        name: namePortada,
        override: true,
      });

      if (!portada.move()) {
        return request.status(422).send({
          res: false,
          message: portada.error(),
        });
      }

      const book = await Book.findOrFail(params.id);
      book.url = namePortada;
      await book.save();
      return response.json({ success: true, message: 'Portada subida correctamente!' });
    } else {
      return request.status(422).send({
        res: false,
        message: portada.error(),
      });
    }
  }

  public async getPortada({ params, response }) {
    const book = await Book.find(params.id);
    if (book) {
      if (book.url) return response.attachment(`./public/portadas/${book.url}`, book.url, 'inline');
      else return response.status(422).send({ res: false, message: 'sin portado' });
    }
    else{
      return response.status(400).send({ res: false, message: 'no existe registro' });
    }
  }
}
