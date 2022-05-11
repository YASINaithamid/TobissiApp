import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations, Vehicule} from '../models';
import {VehiculeRepository} from './vehicule.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.userId,
  UserRelations
> {

  public readonly vehicules: HasManyRepositoryFactory<Vehicule, typeof User.prototype.userId>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('VehiculeRepository') protected vehiculeRepositoryGetter: Getter<VehiculeRepository>,
  ) {
    super(User, dataSource);
    this.vehicules = this.createHasManyRepositoryFactoryFor('vehicules', vehiculeRepositoryGetter,);
    this.registerInclusionResolver('vehicules', this.vehicules.inclusionResolver);
  }
}
