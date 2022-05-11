import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Vehicule} from '../models';
import {VehiculeRepository} from '../repositories';

export class VehiculeController {
  constructor(
    @repository(VehiculeRepository)
    public vehiculeRepository : VehiculeRepository,
  ) {}

  @post('/vehicules')
  @response(200, {
    description: 'Vehicule model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vehicule)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicule, {
            title: 'NewVehicule',
            exclude: ['id'],
          }),
        },
      },
    })
    vehicule: Omit<Vehicule, 'id'>,
  ): Promise<Vehicule> {
    return this.vehiculeRepository.create(vehicule);
  }

  @get('/vehicules/count')
  @response(200, {
    description: 'Vehicule model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vehicule) where?: Where<Vehicule>,
  ): Promise<Count> {
    return this.vehiculeRepository.count(where);
  }

  @get('/vehicules')
  @response(200, {
    description: 'Array of Vehicule model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vehicule, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vehicule) filter?: Filter<Vehicule>,
  ): Promise<Vehicule[]> {
    return this.vehiculeRepository.find(filter);
  }

  @patch('/vehicules')
  @response(200, {
    description: 'Vehicule PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicule, {partial: true}),
        },
      },
    })
    vehicule: Vehicule,
    @param.where(Vehicule) where?: Where<Vehicule>,
  ): Promise<Count> {
    return this.vehiculeRepository.updateAll(vehicule, where);
  }

  @get('/vehicules/{id}')
  @response(200, {
    description: 'Vehicule model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vehicule, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vehicule, {exclude: 'where'}) filter?: FilterExcludingWhere<Vehicule>
  ): Promise<Vehicule> {
    return this.vehiculeRepository.findById(id, filter);
  }

  @patch('/vehicules/{id}')
  @response(204, {
    description: 'Vehicule PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicule, {partial: true}),
        },
      },
    })
    vehicule: Vehicule,
  ): Promise<void> {
    await this.vehiculeRepository.updateById(id, vehicule);
  }

  @put('/vehicules/{id}')
  @response(204, {
    description: 'Vehicule PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vehicule: Vehicule,
  ): Promise<void> {
    await this.vehiculeRepository.replaceById(id, vehicule);
  }

  @del('/vehicules/{id}')
  @response(204, {
    description: 'Vehicule DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vehiculeRepository.deleteById(id);
  }
}
