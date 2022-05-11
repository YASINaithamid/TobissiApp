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
  User,
} from '../models';
import {VehiculeRepository} from '../repositories';

export class VehiculeUserController {
  constructor(
    @repository(VehiculeRepository) protected vehiculeRepository: VehiculeRepository,
  ) { }

  @get('/vehicules/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Vehicule has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.vehiculeRepository.users(id).find(filter);
  }

  @post('/vehicules/{id}/users', {
    responses: {
      '200': {
        description: 'Vehicule model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehicule.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInVehicule',
            exclude: ['userId'],
            optional: ['vehiculeId']
          }),
        },
      },
    }) user: Omit<User, 'userId'>,
  ): Promise<User> {
    return this.vehiculeRepository.users(id).create(user);
  }

  @patch('/vehicules/{id}/users', {
    responses: {
      '200': {
        description: 'Vehicule.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.vehiculeRepository.users(id).patch(user, where);
  }

  @del('/vehicules/{id}/users', {
    responses: {
      '200': {
        description: 'Vehicule.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.vehiculeRepository.users(id).delete(where);
  }
}
