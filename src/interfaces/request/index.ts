export interface ItemType {
  name: string;
  itemTypeId?: number;
  createDate?: number;
}

export interface Item {
  price: number;
  name: string;
  lv1Id: number;
  lv2Id: number;
  listImages: File;
}
