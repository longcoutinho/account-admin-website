import { faCartShopping, faCoins } from "@fortawesome/free-solid-svg-icons";
export const menuBar = [
  {
    title: "Quản lý sản phẩm",
    icon: faCartShopping,
    child: [
      {
        title: "Loại sản phẩm",
        url: "/item/categories",
      },
      {
        title: "Thêm sản phẩm",
        url: "/item/add",
      },
    ],
  },
  {
    title: "Quản lý khách hàng",
    icon: faCoins,
    child: [
      {
        title: "Yêu cầu nạp tiền",
        url: "/customer/top-up-list",
      },
    ],
  },
  {
    title: "Quản lý kho",
    icon: faCartShopping,
    child: [
      {
        title: "Nhập kho",
        url: "/inventory/add",
      },
      {
        title: "Danh sách tài khoản",
        url: "/inventory/list",
      },
    ],
  },
];
