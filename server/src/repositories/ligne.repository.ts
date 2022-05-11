import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Ligne, LigneRelations, Station} from '../models';
import {StationRepository} from './station.repository';

export class LigneRepository extends DefaultCrudRepository<
  Ligne,
  typeof Ligne.prototype.id,
  LigneRelations
> {

  public readonly stations: HasManyRepositoryFactory<Station, typeof Ligne.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('StationRepository') protected stationRepositoryGetter: Getter<StationRepository>,
  ) {
    super(Ligne, dataSource);
    this.stations = this.createHasManyRepositoryFactoryFor('stations', stationRepositoryGetter,);
    this.registerInclusionResolver('stations', this.stations.inclusionResolver);
  }
}
