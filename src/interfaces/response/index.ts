export interface ITest {
  test: string;
}
export interface Post {
  titleImageUrlStream: string;
  title: string;
  author: string;
  typeId: string;
  content: string;
  id: string;
  createAt: string;
  introduction: string;
}
export interface Item {
  id: number;
  price: number;
  name: string;
  lv1Id: number;
  lv2Id: number | null;
  listImageIds: number[];
  introduction?: string;
  title?: string;
  titleImageUrlStream?: string;
}
export interface ICardsRes {
  id: number;
  name: string;
  image: string;
}

export interface IItemCardRes {
  id: number;
  name: string;
  cardId: number;
  code: string;
}
export interface Course {
  title: string;
  teacher: string;
  titleImageUrlStream: string;
  videoTime: number;
}

export interface TypePost {
  id: string;
  name: string;
}

export interface Comment {
  email: string;
  name: string;
  content: string;
}

export interface Service {
  title: string;
  content: string;
  titleImageUrlStream: string;
  id: string;
}

export interface ItemToCart {
  titleImageUrlStream: string;
  id: string;
  title: string;
  price: number;
  amount: number;
  totalPrice: number;
  itemId: string;
}

export interface ResponseUser {
  username: string;
  balance: number;
  createDate: string;
  userId: string;
  email: string;
}

export interface IPriceItem {
  id: number;
  cardId: number;
  name: string;
  listFees: IFee[];
}
export interface IFee {
  id: number;
  cardItemId: number;
  paymentMethodCode: string;
  currency?: string;
  price: number;
}
