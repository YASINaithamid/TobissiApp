import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Line, LineRelations} from '../models/line.model';
//import {Line, LineRelations} from '../models';

export class LineRepository extends DefaultCrudRepository<
  Line,
  typeof Line.prototype.id,
  LineRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Line, dataSource);
  }
}
