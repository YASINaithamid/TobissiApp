import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Station, StationRelations} from '../models';

export class StationRepository extends DefaultCrudRepository<
  Station,
  typeof Station.prototype.id,
  StationRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Station, dataSource);
  }
}