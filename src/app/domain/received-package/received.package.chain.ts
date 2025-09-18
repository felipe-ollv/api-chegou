
export class ReceivedPackageChain {
  static async receiveHandler(data: any, uuidUserProfile: string) {
    return data.reduce((acc, delivery) => {
      if (uuidUserProfile !== delivery.uuid_user_profile_receiver) {
        // Encomendas que receberam do usuário lodago
        acc.ownerLogged.push(delivery);
        acc.ordinance = data.ordinance
      } else if (uuidUserProfile === delivery.uuid_user_profile_receiver) {
        // Encomendas que o usuário logado recebeu
        acc.loggedReceiverUser.push(delivery);
        acc.ordinance = data.ordinance
      }
      return acc;
    }, {
      ownerLogged: [],
      loggedReceiverUser: [],
      ordinance: false
    });
  }
}