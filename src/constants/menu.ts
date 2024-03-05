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
      {
        title: "Nhập kho",
        url: "/item/inventory",
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
];
