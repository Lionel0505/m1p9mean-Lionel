import { IUser } from "./user.schema";
import { BaseSchema } from "./base.schema";


export interface IDish extends BaseSchema {

  name: string;

  picture: string;

  // prix d'achat
  purchasePrice: number;

  // prix de revient
  costPrice: number;

  // prix de vente
  salePrice: number;

  visible: boolean;

  restaurant: IUser;

}
