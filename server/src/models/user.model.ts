import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehicule} from './vehicule.model';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  userName: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  tel?: string;

  @property({
    type: 'string',
  })
  addresse?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  stationsFrequentes?: string[];

  @property({
    type: 'string',
  })
  BusNo?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  userId?: string;

  @hasMany(() => Vehicule)
  vehicules: Vehicule[];

  @property({
    type: 'string',
  })
  vehiculeId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
