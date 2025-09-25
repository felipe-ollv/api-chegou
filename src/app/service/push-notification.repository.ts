import db from '../database';


export class PushNotificationRepository {
  private static tableName = 'user_profile';

  static async registerUserToken(data: any): Promise<any> {
    try {
      const updatedUserToken = await db(this.tableName)
        .where('uuid_user_profile', data.uuidUserProfile)
        .update({
          'notification_token': data.token
        })

      return updatedUserToken;
    } catch (error) {
      return error;
    }
  }
}