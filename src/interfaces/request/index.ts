export interface ItemType {
  name: string;
  itemTypeId?: number;
  createDate?: number;
  code?: string;
  level?: number;
  parentId?: any;
}

export interface Item {
  price: number;
  name: string;
  lv1Id: number;
  lv2Id: number;
  listImages: File;
}

export interface Account {
  itemId?: number;
  username: string;
  password: string;
}

export interface IAccountInventory {
  id: string;
  createDate: string;
  status: number;
  createUser: string;
  username: string;
  password: string;
  itemId: string;
}

export interface ITopUpItem {
  id: string;
  amount: number;
  status: number;
  userId: string;
  createDate: string;
  method: number;
  username: string;
}

export interface ISaleOrderItem {
  id: string;
  amount: number;
  status: number;
  userId: string;
  createDate: string;
  method: number;
  username: string;
  itemName: string;
  price: string;
}

export interface ITopUpList {
  listTopUp: ITopUpItem[];
  id: string;
  username: string;
  method: number;
  totalAmount: number;
  amount: number;
  createDate: string;
  totalRequest: number;
}

export interface ISaleOrderList {
  count: number;
  totalRevenue: number;
  listData: ISaleOrderDetail[];
}
export interface ISaleOrderDetail {
  id: string;
  ip: string;
  request: string;
  price: number;
  createUser: string;
  createDate: string;
  status: string;
  msgError: string;
}

export interface IOrderDetail {
  cardItemId: string;
  cardName: string;
  cards: {
    code: string;
    serial: string;
    vendor: string;
    value: number;
    expiry: string;
  }[];
}

export interface TopUpRequest {
  transId: string | null;
  username: string | null;
  status: number | null;
}

export interface SaleOrderRequest {
  transId: string | null;
  username: string | null;
  status: number | null;
}
