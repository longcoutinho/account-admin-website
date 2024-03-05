export interface ItemType {
  name : string;
  itemTypeId: number;
}

export interface Item {
  price: number;
  name : string;
  lv1Id: number;
  lv2Id: number;
  listImages: File;
}

export interface Account {
  itemId: number;
  username: string;
  password: string;
}
