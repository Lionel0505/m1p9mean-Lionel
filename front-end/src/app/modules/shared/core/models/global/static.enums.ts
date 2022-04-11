export enum E_UserType {

  // admin
  ADM = 'Administrator',

  // client
  CUS = 'Customer',

  // livreur
  DEM = 'Delivery man',

  // restaurant
  RES = 'Restaurant',

}


export enum E_UrlPart {

  ADM = 'admin',

  RES = 'restaurant',

  DEM = 'delivery',

  CUS = 'customer',
}


export enum E_DeliveryStatus {

  // commande à livrer
  TOD = 'to deliver',

  // commande livrée
  DEL = 'delivered',

  // commande en préparation
  INI = 'initiated',

  // commande annulée
  CAN = 'canceled',

}
