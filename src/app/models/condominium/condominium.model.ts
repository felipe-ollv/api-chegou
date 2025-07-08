import db from '../../database';

export class CondominiumModel {
  private static tableName = 'condominium';

  static async findbyUUid(data: string): Promise<any> {
    try {
      const condominium = await db(this.tableName)
        .where('uuid_condominium', data)
        .andWhere('deleted', 0)
        .select();

      console.log('FIND BY', condominium);

      return condominium;
    } catch (error) {

    }
  }

  static async findAll(): Promise<any> {
    try {
      const listCondominium = await db(this.tableName)
        .where('deleted', 0)
        .select('*');

      console.log('FIND', listCondominium);

      return listCondominium;
    } catch (error) {
      return error;
    }
  }

  static async create(condominium: any): Promise<any> {
    try {
      const createdCondominium = await db(this.tableName)
        .insert({
          ...condominium
        })

      console.log('CREATE', createdCondominium);

      return createdCondominium;
    } catch (error) {
      return error;
    }
  }

  static async update(condominium: any): Promise<any> {
    try {
      const updatedComdominium = await db(this.tableName)
        .where('uuid_condominium', condominium.uuid_condominium)
        .update(condominium)

      console.log('UPDATE', updatedComdominium);

      return updatedComdominium;
    } catch (error) {
      return error;
    }
  }

  static async delete(uuidCondominium: string): Promise<any> {
    try {
      const deletedCondominium = await db(this.tableName)
        .where('uuid_condominium', uuidCondominium)
        .andWhere('deleted', 0)
        .update({
          deleted: 1
        });

      console.log('DELETE', deletedCondominium);

      return deletedCondominium;
    } catch (error) {
      return error;
    }
  }
}