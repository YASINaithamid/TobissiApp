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
  Vehicule,
  History,
} from '../models';
import {VehiculeRepository} from '../repositories';

export class VehiculeHistoryController {
  constructor(
    @repository(VehiculeRepository) protected vehiculeRepository: VehiculeRepository,
  ) { }

  @get('/vehicules/{id}/histories', {
    responses: {
      '200': {
        description: 'Array of Vehicule has many History',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(History)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<History>,
  ): Promise<History[]> {
    return this.vehiculeRepository.histories(id).find(filter);
  }

  @post('/vehicules/{id}/histories', {
    responses: {
      '200': {
        description: 'Vehicule model instance',
        content: {'application/json': {schema: getModelSchemaRef(History)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehicule.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(History, {
            title: 'NewHistoryInVehicule',
            exclude: ['HId'],
            optional: ['vehiculeId']
          }),
        },
      },
    }) history: Omit<History, 'HId'>,
  ): Promise<History> {
    return this.vehiculeRepository.histories(id).create(history);
  }

  @patch('/vehicules/{id}/histories', {
    responses: {
      '200': {
        description: 'Vehicule.History PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(History, {partial: true}),
        },
      },
    })
    history: Partial<History>,
    @param.query.object('where', getWhereSchemaFor(History)) where?: Where<History>,
  ): Promise<Count> {
    return this.vehiculeRepository.histories(id).patch(history, where);
  }

  @del('/vehicules/{id}/histories', {
    responses: {
      '200': {
        description: 'Vehicule.History DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(History)) where?: Where<History>,
  ): Promise<Count> {
    return this.vehiculeRepository.histories(id).delete(where);
  }
}
