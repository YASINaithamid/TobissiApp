import {Entity, model, property, hasMany} from '@loopback/repository';
import {Station} from './station.model';

@model({settings: {strict: false}})
export class Ligne extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  Lname?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  listeStations?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  polyLine?: string[];

  @hasMany(() => Station)
  stations: Station[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ligne>) {
    super(data);
  }
}

export interface LigneRelations {
  // describe navigational properties here
}

export type LigneWithRelations = Ligne & LigneRelations;
