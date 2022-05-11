import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Station extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  Sname?: string;

  @property({
    type: 'string',
  })
  coordonne?: string;

  @property({
    type: 'number',
  })
  ligneId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Station>) {
    super(data);
  }
}

export interface StationRelations {
  // describe navigational properties here
}

export type StationWithRelations = Station & StationRelations;
