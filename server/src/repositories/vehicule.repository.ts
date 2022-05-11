import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Vehicule, VehiculeRelations, User, History} from '../models';
import {UserRepository} from './user.repository';
import {HistoryRepository} from './history.repository';

export class VehiculeRepository extends DefaultCrudRepository<
  Vehicule,
  typeof Vehicule.prototype.id,
  VehiculeRelations
> {

  public readonly users: HasManyRepositoryFactory<User, typeof Vehicule.prototype.id>;

  public readonly histories: HasManyRepositoryFactory<History, typeof Vehicule.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('HistoryRepository') protected historyRepositoryGetter: Getter<HistoryRepository>,
  ) {
    super(Vehicule, dataSource);
    this.histories = this.createHasManyRepositoryFactoryFor('histories', historyRepositoryGetter,);
    this.registerInclusionResolver('histories', this.histories.inclusionResolver);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
