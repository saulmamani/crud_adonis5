import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Book from 'App/Models/Book'

export default class BookSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Book.createMany([
      {
        code: '001',
        name: 'Fundamentos de la programacion en C++',
        pages: 532,
        description: 'Programacion inicial en c++',
        users_id: 1,
      },
      {
        code: '002',
        name: 'Fundamentos de la programacion en Java',
        pages: 500,
        description: 'Programacion inicial en Java',
        users_id: 1,
      },
      {
        code: '020',
        name: 'SCRUN y las metodologias agiles',
        pages: 100,
        description: 'Introduccion a Agile y las practivas de desarrolla agil',
        users_id: 2,
      },
    ])
  }
}
