import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Station, StationRelations} from '../models';

export class StationRepository extends DefaultCrudRepository<
  Station,
  typeof Station.prototype.id,
  StationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Station, dataSource);
  }
}
