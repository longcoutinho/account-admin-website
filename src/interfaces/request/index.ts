export interface ItemType {
  code: string;
  name : string;
  level: number;
  parentId: number | null;
  itemTypeId: number;
}

export interface Item {
  price: number;
  name : string;
  lv1Id: number;
  lv2Id: number;
  listImages: File;
}

