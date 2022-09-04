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
import {Station} from '../models';
import {StationRepository} from '../repositories';

export class StationController {
  constructor(
    @repository(StationRepository)
    public stationRepository : StationRepository,
  ) {}

  @post('/stations')
  @response(200, {
    description: 'Station model instance',
    content: {'application/json': {schema: getModelSchemaRef(Station)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Station, {
            title: 'NewStation',
            exclude: ['id'],
          }),
        },
      },
    })
    station: Omit<Station, 'id'>,
  ): Promise<Station> {
    return this.stationRepository.create(station);
  }

  @get('/stations/count')
  @response(200, {
    description: 'Station model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Station) where?: Where<Station>,
  ): Promise<Count> {
    return this.stationRepository.count(where);
  }

  @get('/stations')
  @response(200, {
    description: 'Array of Station model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Station, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Station) filter?: Filter<Station>,
  ): Promise<Station[]> {
    return this.stationRepository.find(filter);
  }

  @patch('/stations')
  @response(200, {
    description: 'Station PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Station, {partial: true}),
        },
      },
    })
    station: Station,
    @param.where(Station) where?: Where<Station>,
  ): Promise<Count> {
    return this.stationRepository.updateAll(station, where);
  }

  @get('/stations/{id}')
  @response(200, {
    description: 'Station model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Station, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Station, {exclude: 'where'}) filter?: FilterExcludingWhere<Station>
  ): Promise<Station> {
    return this.stationRepository.findById(id, filter);
  }

  @patch('/stations/{id}')
  @response(204, {
    description: 'Station PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Station, {partial: true}),
        },
      },
    })
    station: Station,
  ): Promise<void> {
    await this.stationRepository.updateById(id, station);
  }

  @put('/stations/{id}')
  @response(204, {
    description: 'Station PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() station: Station,
  ): Promise<void> {
    await this.stationRepository.replaceById(id, station);
  }

  @del('/stations/{id}')
  @response(204, {
    description: 'Station DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.stationRepository.deleteById(id);
  }
}
