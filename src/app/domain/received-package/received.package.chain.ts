
export class ReceivedPackageChain {
  static async receiveHandler(data: any, uuidUserProfile: string) {
    return data.reduce((acc, delivery) => {
      if (delivery.uuid_user_profile_receiver === uuidUserProfile) {
        acc.sameUser.push(delivery);
      } else {
        acc.differentUser.push(delivery);
      }
      return acc;
    }, {
      sameUser: [],
      differentUser: []
    });
  }
}