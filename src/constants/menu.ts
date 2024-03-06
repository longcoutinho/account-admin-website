import {
  faCartShopping,
  faCoins,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
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
      {
        title: "Thống kê nạp tiền",
        url: "/customer/top-up-stats",
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
        title: "San pham trong kho",
        url: "/inventory/list",
      },
    ],
  },
  {
    title: "Quản lý tài khoản",
    icon: faUser,
    child: [
      {
        title: "Tài khoản người dùng",
        url: "/user/account-user",
      },
      {
        title: "Tài khoản admin",
        url: "/user/account-admin",
      },
    ],
  },
  // {
  //   title: "Thống kê",
  //   icon: faUser,
  //   child: [
  //     {
  //       title: "Nạp tiền",
  //       url: "/report/top-up",
  //     },
  //     {
  //       title: "Đơn hàng",
  //       url: "/report/sale-order",
  //     },
  //   ],
  // },
];
