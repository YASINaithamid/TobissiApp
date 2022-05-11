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
import {Ligne} from '../models';
import {LigneRepository} from '../repositories';

export class LigneController {
  constructor(
    @repository(LigneRepository)
    public ligneRepository : LigneRepository,
  ) {}

  @post('/lignes')
  @response(200, {
    description: 'Ligne model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ligne)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ligne, {
            title: 'NewLigne',
            exclude: ['id'],
          }),
        },
      },
    })
    ligne: Omit<Ligne, 'id'>,
  ): Promise<Ligne> {
    return this.ligneRepository.create(ligne);
  }

  @get('/lignes/count')
  @response(200, {
    description: 'Ligne model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ligne) where?: Where<Ligne>,
  ): Promise<Count> {
    return this.ligneRepository.count(where);
  }

  @get('/lignes')
  @response(200, {
    description: 'Array of Ligne model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ligne, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ligne) filter?: Filter<Ligne>,
  ): Promise<Ligne[]> {
    return this.ligneRepository.find(filter);
  }

  @patch('/lignes')
  @response(200, {
    description: 'Ligne PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ligne, {partial: true}),
        },
      },
    })
    ligne: Ligne,
    @param.where(Ligne) where?: Where<Ligne>,
  ): Promise<Count> {
    return this.ligneRepository.updateAll(ligne, where);
  }

  @get('/lignes/{id}')
  @response(200, {
    description: 'Ligne model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ligne, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Ligne, {exclude: 'where'}) filter?: FilterExcludingWhere<Ligne>
  ): Promise<Ligne> {
    return this.ligneRepository.findById(id, filter);
  }

  @patch('/lignes/{id}')
  @response(204, {
    description: 'Ligne PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ligne, {partial: true}),
        },
      },
    })
    ligne: Ligne,
  ): Promise<void> {
    await this.ligneRepository.updateById(id, ligne);
  }

  @put('/lignes/{id}')
  @response(204, {
    description: 'Ligne PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ligne: Ligne,
  ): Promise<void> {
    await this.ligneRepository.replaceById(id, ligne);
  }

  @del('/lignes/{id}')
  @response(204, {
    description: 'Ligne DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ligneRepository.deleteById(id);
  }
}
