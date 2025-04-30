import db from "../database";
import { UserInterface } from "../interfaces/users.interface";

export class UserModel {
    private static tableName = 'users'

    static async create(user: Omit<UserInterface, 'id' | 'created_at' | 'updated_at'>): Promise<UserInterface> {
        const [createdUser] = await db(this.tableName)
            .insert({
            ...user,
            created_at: db.fn.now(),
            // updated_at: db.fn.now(),
            })
            .returning('*');
        
        return createdUser;
    }
    
    static async findByEmail(email: string): Promise<UserInterface | undefined> {
        return db(this.tableName).where({ email }).first();
    }
}