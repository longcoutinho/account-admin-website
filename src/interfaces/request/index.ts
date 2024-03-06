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

export interface ITopUpList {
  id: string;
  amount: number;
  status: number;
  userId: string;
  createDate: string;
  method: number;
  username: string;
}

export interface TopUpRequest {
  transId: string | null;
  username: string | null;
  status: number | null;
}
