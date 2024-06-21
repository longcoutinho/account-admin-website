export interface IProductReq {
  name: string;
  typeId: string;
  description: string;
  category: string[];
  price: IPriceWithPaymentMethod[];
}
export interface IPriceWithPaymentMethod {
  paymentCode: string;
  price: number;
}
