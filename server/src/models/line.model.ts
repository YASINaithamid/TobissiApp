import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Line extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  polyline: object[];

  @property({
    type: 'string',
    default: 10,
  })
  num?: string;

  @property({
    type: 'object',
    required: true,
  })
  terminusA: object;

  @property({
    type: 'object',
    required: true,
  })
  terminusB: object;
  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  listStation: object[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Line>) {
    super(data);
  }
}

export interface LineRelations {
  // describe navigational properties here
}

export type LineWithRelations = Line & LineRelations;
