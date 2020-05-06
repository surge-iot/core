import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserModel } from '../database/models/user.model';
import { ModelClass, transaction } from 'objection';
import { nanoid } from 'nanoid';
import * as argon2 from "argon2";

@Injectable()
export class UsersService {
  constructor(@Inject('UserModel') private modelClass: ModelClass<UserModel>) {}

  findAll() {
    return this.modelClass.query();
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id);
  }

  async create(props: Partial<UserModel>) {
    const user = await this.modelClass.query().findOne({'email':props.email});
    if(user){
      throw new HttpException('Forbidden', HttpStatus.CONFLICT);
    }
    const password = nanoid(10);
    const hash = await argon2.hash(password);
    props.password = hash;
    console.log("PASSWORD: ", password);
    // TODO: send password via email
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