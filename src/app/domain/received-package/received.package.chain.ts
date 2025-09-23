export class ReceivedPackageChain {
  static async receiveHandler(data: any[], uuidUserProfile: string) {
    return data.reduce(
      (acc, delivery) => {
        const isReceiver = uuidUserProfile === delivery.uuid_user_profile_receiver;
        const isOwner = uuidUserProfile === delivery.uuid_user_profile_owner;

        if (isReceiver && !isOwner) {
          acc.deliver.push(delivery);
        }

        if (isReceiver && isOwner) {
          acc.pickup.push(delivery);
        }

        if (!isReceiver && isOwner) {
          acc.pickup.push(delivery);
        }

        acc.ordinance = delivery.ordinance;
        return acc;
      },
      {
        deliver: [],
        pickup: [],
        ordinance: false,
      }
    );
  }
}
