import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class History extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  HId?: number;

  @property({
    type: 'number',
  })
  BusNum?: number;

  @property({
    type: 'number',
  })
  long?: number;

  @property({
    type: 'string',
  })
  lat?: string;

  @property({
    type: 'string',
  })
  neoude?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  detailsInfos?: string[];

  @property({
    type: 'string',
  })
  vehiculeId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<History>) {
    super(data);
  }
}

export interface HistoryRelations {
  // describe navigational properties here
}

export type HistoryWithRelations = History & HistoryRelations;
