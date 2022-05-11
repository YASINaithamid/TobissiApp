import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Ligne,
  Station,
} from '../models';
import {LigneRepository} from '../repositories';

export class LigneStationController {
  constructor(
    @repository(LigneRepository) protected ligneRepository: LigneRepository,
  ) { }

  @get('/lignes/{id}/stations', {
    responses: {
      '200': {
        description: 'Array of Ligne has many Station',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Station)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Station>,
  ): Promise<Station[]> {
    return this.ligneRepository.stations(id).find(filter);
  }

  @post('/lignes/{id}/stations', {
    responses: {
      '200': {
        description: 'Ligne model instance',
        content: {'application/json': {schema: getModelSchemaRef(Station)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ligne.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Station, {
            title: 'NewStationInLigne',
            exclude: ['id'],
            optional: ['ligneId']
          }),
        },
      },
    }) station: Omit<Station, 'id'>,
  ): Promise<Station> {
    return this.ligneRepository.stations(id).create(station);
  }

  @patch('/lignes/{id}/stations', {
    responses: {
      '200': {
        description: 'Ligne.Station PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Station, {partial: true}),
        },
      },
    })
    station: Partial<Station>,
    @param.query.object('where', getWhereSchemaFor(Station)) where?: Where<Station>,
  ): Promise<Count> {
    return this.ligneRepository.stations(id).patch(station, where);
  }

  @del('/lignes/{id}/stations', {
    responses: {
      '200': {
        description: 'Ligne.Station DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Station)) where?: Where<Station>,
  ): Promise<Count> {
    return this.ligneRepository.stations(id).delete(where);
  }
}
