export interface IHeader {
  menuIndex: number;
}
export interface IMenuItem {
  drop_down: boolean;
  title: string;
  redirect_link: any;
}
export interface IPageProps {
  children: React.ReactNode;
  title?: string;
  admin?: boolean;
  menuIndex: number;
}

export interface User {
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  accessToken: string;
}
