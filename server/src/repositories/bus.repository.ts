import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Bus, BusRelations} from '../models';

export class BusRepository extends DefaultCrudRepository<
  Bus,
  typeof Bus.prototype.id,
  BusRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Bus, dataSource);
  }
}
