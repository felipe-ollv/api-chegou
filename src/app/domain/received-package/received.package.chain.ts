
export class ReceivedPackageChain {
  static async receiveHandler(data: any, uuidUserProfile: string) {
    return data.reduce((acc, delivery) => {
      if (delivery.uuid_user_profile_receiver === uuidUserProfile) {
        acc.differentUser.push(delivery);
        acc.ordinance = data.ordinance
      } else {
        acc.sameUser.push(delivery);
        acc.ordinance = data.ordinance
      }
      return acc;
    }, {
      sameUser: [],
      differentUser: [],
      ordinance: false
    });
  }
}