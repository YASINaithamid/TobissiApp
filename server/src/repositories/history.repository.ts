import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {History, HistoryRelations} from '../models';

export class HistoryRepository extends DefaultCrudRepository<
  History,
  typeof History.prototype.HId,
  HistoryRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(History, dataSource);
  }
}
