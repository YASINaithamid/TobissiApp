import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Line} from '../models/line.model';
import {LineRepository} from '../repositories/line.repository';

export class LineController {
  constructor(
    @repository(LineRepository)
    public lineRepository : LineRepository,
  ) {}

  @post('/lines')
  @response(200, {
    description: 'Line model instance',
    content: {'application/json': {schema: getModelSchemaRef(Line)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Line, {
            title: 'NewLine',
            exclude: ['id'],
          }),
        },
      },
    })
    line: Omit<Line, 'id'>,
  ): Promise<Line> {
    return this.lineRepository.create(line);
  }

  @get('/lines/count')
  @response(200, {
    description: 'Line model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Line) where?: Where<Line>,
  ): Promise<Count> {
    return this.lineRepository.count(where);
  }

  @get('/lines')
  @response(200, {
    description: 'Array of Line model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Line, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Line) filter?: Filter<Line>,
  ): Promise<Line[]> {
    return this.lineRepository.find(filter);
  }

  @patch('/lines')
  @response(200, {
    description: 'Line PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Line, {partial: true}),
        },
      },
    })
    line: Line,
    @param.where(Line) where?: Where<Line>,
  ): Promise<Count> {
    return this.lineRepository.updateAll(line, where);
  }

  @get('/lines/{id}')
  @response(200, {
    description: 'Line model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Line, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Line, {exclude: 'where'}) filter?: FilterExcludingWhere<Line>
  ): Promise<Line> {
    return this.lineRepository.findById(id, filter);
  }

  @patch('/lines/{id}')
  @response(204, {
    description: 'Line PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Line, {partial: true}),
        },
      },
    })
    line: Line,
  ): Promise<void> {
    await this.lineRepository.updateById(id, line);
  }

  @put('/lines/{id}')
  @response(204, {
    description: 'Line PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() line: Line,
  ): Promise<void> {
    await this.lineRepository.replaceById(id, line);
  }

  @del('/lines/{id}')
  @response(204, {
    description: 'Line DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lineRepository.deleteById(id);
  }
}
