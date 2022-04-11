export enum E_UserType {

    // admin
    ADM = 'Administrator',

    // client
    CUS = 'Customer',

    // livreur
    DEM = 'Delivery man',

    // restaurant
    RES = 'Restaurant',

    // non défini
    NOT = 'Non défini',

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
