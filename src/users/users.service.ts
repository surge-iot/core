import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from '../database/models/user.model';
import { ModelClass, transaction } from 'objection';

@Injectable()
export class UsersService {
  constructor(@Inject('UserModel') private modelClass: ModelClass<UserModel>) {}

  findAll() {
    return this.modelClass.query();
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id);
  }

  create(props: Partial<UserModel>) {
    return this.modelClass
      .query()
      .insert(props);
  }

  update(id: number, props: Partial<UserModel>) {
    return this.modelClass
      .query()
      .patch(props)
      .where({ id })
      .returning('*')
      .first();
  }

  delete(id: number) {
    return transaction(this.modelClass, async (_, trx) => {
      return this.modelClass
        .query()
        .delete()
        .where({ id })
        .returning('*')
        .first()
        .transacting(trx);
    });
  }
}