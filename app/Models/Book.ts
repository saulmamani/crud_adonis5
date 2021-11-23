import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public code: string;

  @column()
  public name: string;

  @column()
  public pages: number;

  @column()
  public url: string | null;

  @column()
  public description: string;

  @column()
  public userId: number;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  //valores computados
  @computed()
  public get info() {
    return `${this.code} | ${this.name}`;
  }

  //relationships
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
