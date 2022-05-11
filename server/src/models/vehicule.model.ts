import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {History} from './history.model';

@model({settings: {strict: false}})
export class Vehicule extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  BusNo?: number;

  @property({
    type: 'number',
  })
  lat?: number;

  @property({
    type: 'number',
  })
  long?: number;

  @property({
    type: 'string',
  })
  neoude?: string;

  @property({
    type: 'date',
  })
  Datedebut?: string;

  @property({
    type: 'date',
  })
  Date?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @hasMany(() => User)
  users: User[];

  @hasMany(() => History)
  histories: History[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vehicule>) {
    super(data);
  }
}

export interface VehiculeRelations {
  // describe navigational properties here
}

export type VehiculeWithRelations = Vehicule & VehiculeRelations;
