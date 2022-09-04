import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Bus extends Entity {
  @property({
    type: 'string',
    id: true,

    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  modelbus: string;

  @property({
    type: 'string',
    required: true,
  })
  busNumber: string;

  @property({
    type: 'string',
    required: false,
  })
  city: string;

  @property({
    type: 'string',
    required: false,
  })
  line: string;

  /* @property({
    type: 'array',
    itemType: 'string',
  })
  linesList?: string[]; */

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Bus>) {
    super(data);
  }
}

export interface BusRelations {
  // describe navigational properties here
}

export type BusWithRelations = Bus & BusRelations;
