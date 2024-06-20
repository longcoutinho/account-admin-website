export interface ICategoryRes {
  id: number;
  name: string;
  create_date: string;
  create_user: string;
}
export interface IProductRes {
  name: string;
  id: number;
  imagePath: string;
}
export interface IPaymentMethodRes {
  id: number;
  isActive: number;
  name: string;
  image: string;
  code: string;
}
