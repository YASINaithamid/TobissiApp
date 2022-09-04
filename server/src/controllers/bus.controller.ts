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
import {Bus} from '../models';
import {BusRepository} from '../repositories';
//import {Socket, socketio} from '@loopback/socketio';
export class BusController {
  constructor(
    @repository(BusRepository)
    public busRepository: BusRepository,
    /*  @socketio.socket() // Equivalent to `@inject('ws.socket')`
    private socket: Socket, */
  ) {}

  @post('/buses')
  @response(200, {
    description: 'Bus model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bus)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bus, {
            title: 'NewBus',
            exclude: ['id'],
          }),
        },
      },
    })
    bus: Omit<Bus, 'id'>,
  ): Promise<Bus> {
    return this.busRepository.create(bus);
  }

  @get('/buses/count')
  @response(200, {
    description: 'Bus model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Bus) where?: Where<Bus>,
  ): Promise<Count> {
    return this.busRepository.count(where);
  }

  @get('/buses')
  @response(200, {
    description: 'Array of Bus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Bus) filter?: Filter<Bus>,
  ): Promise<Bus[]> {
    return this.busRepository.find(filter);
  }

  @patch('/buses')
  @response(200, {
    description: 'Bus PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bus, {partial: true}),
        },
      },
    })
    bus: Bus,
    @param.where(Bus) where?: Where<Bus>,
  ): Promise<Count> {
    return this.busRepository.updateAll(bus, where);
  }

  @get('/buses/{id}')
  @response(200, {
    description: 'Bus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Bus, {exclude: 'where'}) filter?: FilterExcludingWhere<Bus>
  ): Promise<Bus> {
    return this.busRepository.findById(id, filter);
  }

  @patch('/buses/{id}')
  @response(204, {
    description: 'Bus PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bus, {partial: true}),
        },
      },
    })
    bus: Bus,
  ): Promise<void> {
    await this.busRepository.updateById(id, bus);
  }

  @put('/buses/{id}')
  @response(204, {
    description: 'Bus PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bus: Bus,
  ): Promise<void> {
    await this.busRepository.replaceById(id, bus);
  }

  @del('/buses/{id}')
  @response(204, {
    description: 'Bus DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.busRepository.deleteById(id);
  }
}
