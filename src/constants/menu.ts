import {
  faCartShopping,
  faCoins,
  faGamepad,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
export const menuBar = [
  {
    title: "Quản lý thẻ nạp",
    icon: faCartShopping,
    url: "/card",
  },
  {
    title: "Quản lý tài khoản",
    icon: faUser,
    url: "/user/account-user",
  },
  {
    title: "Quản lý sản phẩm",
    icon: faUser,
    url: "/product",
  },
  {
    title: "Lịch sử giao dịch",
    icon: faUser,
    url: "/customer/sale-order-stats",
  },
  {
    title: "Lịch sử đơn hàng",
    icon: faCartShopping,
    url: "/customer/product-orders",
  },
  {
    title: "Lords mobile",
    icon: faGamepad,
    url: "/lord-mobile",
  },
  {
    title: "Castle cash",
    icon: faGamepad,
    url: "/castle-cash",
  },
  // {
  //   title: "Quản lý khách hàng",
  //   icon: faUser,
  //   child: [
  //     {
  //       title: "Yêu cầu nạp tiền",
  //       url: "/customer/top-up-list",
  //     },
  //     {
  //       title: "Thống kê nạp tiền",
  //       url: "/customer/top-up-stats",
  //     },
  //     {
  //       title: "Thống kê đơn hàng",
  //       url: "/customer/sale-order-stats",
  //     },
  //   ],
  // },
  // {
  //   title: "Quản lý kho",
  //   icon: faCartShopping,
  //   child: [
  //     {
  //       title: "Nhập kho",
  //       url: "/inventory/add",
  //     },
  //     {
  //       title: "Kho tài khoản",
  //       url: "/inventory/list",
  //     },
  //   ],
  // },
  //
];
