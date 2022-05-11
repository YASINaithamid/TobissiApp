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
  User,
  Vehicule,
} from '../models';
import {UserRepository} from '../repositories';

export class UserVehiculeController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/vehicules', {
    responses: {
      '200': {
        description: 'Array of User has many Vehicule',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehicule)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehicule>,
  ): Promise<Vehicule[]> {
    return this.userRepository.vehicules(id).find(filter);
  }

  @post('/users/{id}/vehicules', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehicule)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.userId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicule, {
            title: 'NewVehiculeInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) vehicule: Omit<Vehicule, 'id'>,
  ): Promise<Vehicule> {
    return this.userRepository.vehicules(id).create(vehicule);
  }

  @patch('/users/{id}/vehicules', {
    responses: {
      '200': {
        description: 'User.Vehicule PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicule, {partial: true}),
        },
      },
    })
    vehicule: Partial<Vehicule>,
    @param.query.object('where', getWhereSchemaFor(Vehicule)) where?: Where<Vehicule>,
  ): Promise<Count> {
    return this.userRepository.vehicules(id).patch(vehicule, where);
  }

  @del('/users/{id}/vehicules', {
    responses: {
      '200': {
        description: 'User.Vehicule DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehicule)) where?: Where<Vehicule>,
  ): Promise<Count> {
    return this.userRepository.vehicules(id).delete(where);
  }
}
