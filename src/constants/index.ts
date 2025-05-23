import { Course } from "@/interfaces/response";
import { PATH_PAGE } from "@/routes/path";

export enum Backend {
  BASE_URL = "https://egate.io.vn",
  // BASE_URL = "http://42.118.173.100:8989",
  // BASE_URL = 'http://localhost:8989',
  USER_SERVICE = BASE_URL + "/user",
  ITEM_SERVICE = BASE_URL + "/item",
  IMAGE_SERVICE = BASE_URL + "/image",
  TOPUP_SERVICE = BASE_URL + "/top-up",
  REPORT_SERVICE = BASE_URL + "/report",
  SALE_ORDER_SERVICE = BASE_URL + "/sale-order",
  ACCOUNT_SERVICE = BASE_URL + "/stock-account",
}

export enum Frontend {
  BASE_URL = "https://longhvh.click",
  // BASE_URL = 'http://localhost:3001',
  ADD_ITEM_PAGE = BASE_URL + "/item/add",
  EDIT_ITEM_PAGE = BASE_URL + "/item/edit",
  EDIT_ACCOUNT_PAGE = BASE_URL + "/user/account-user/edit",
}
export enum HTTP_STATUS {
  OK = 200,
}
export enum PAGE_TITLE {
  PREFIX = "",
  HOME = "Home",
  LAPLA = "Lap la so phong thuy",
  ALL_PRODUCTS = "All Products",
  EDIT_ITEM = "Edit Item",
  PRODUCT = "Product",
  BANNER = "Banner",
}

export const HomePage = {
  numTopPosts: 5,
  numBotPosts: 5,
  numHotPosts: 5,
  numItem: 4,
  optionTopPosts: {
    slidesPerView: 1,
    spaceBetween: 50,
    breakpoints: {
      300: {
        slidesPerView: 1,
      },
      690: {
        slidesPerView: 1,
      },
      1100: {
        slidesPerView: 1,
      },
      1300: {
        slidesPerView: 1,
      },
      1600: {
        slidesPerView: 1,
      },
      1900: {
        slidesPerView: 1,
      },
    },
  },
};

export const ServiceType = {
  POSTS: 0,
  ITEM: 1,
};

export enum URL {
  BASE_URL = "",
  POSTS_SERVICE = "/posts",
  ITEM_SERVICE = "/item",
}
export enum PostsService {
  getPost = "/posts",
  SAVE = "",
  getPostDetail = "/posts/detail",
}

export enum TypeService {
  getType = "/type/",
  SAVE = "",
  DETAIL = "/detail",
}

export enum ItemService {
  getItems = "/item",
  DETAIL = "/detail",
  getItemDetail = "/item/detail",
}

export const HOME_PAGE_DISPLAY_ITEM = 3;

export const listItems = [
  {
    titleImageUrlStream:
      "https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg?cs=srgb&dl=pexels-engin-akyurt-1486861.jpg&fm=jpg",
    title: "Cá chép hóa rồng",
    id: 1,
    price: 3500000,
    introduction: "abc",
  },
  {
    titleImageUrlStream:
      "https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg?cs=srgb&dl=pexels-engin-akyurt-1486861.jpg&fm=jpg",
    title: "Bai viet 1",
    id: 1,
    price: 3500000,
    introduction: "abc",
  },
  {
    titleImageUrlStream:
      "https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg?cs=srgb&dl=pexels-engin-akyurt-1486861.jpg&fm=jpg",
    title: "Bai viet 1",
    id: 1,
    price: 3500000,
    introduction: "abc",
  },
  {
    titleImageUrlStream:
      "https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg?cs=srgb&dl=pexels-engin-akyurt-1486861.jpg&fm=jpg",
    title: "Bai viet 1",
    id: 1,
    price: 3500000,
    introduction: "abc",
  },
];

export const listCourse: Course[] = [
  {
    title: "Lớp 1",
    teacher: "Kim ca",
    titleImageUrlStream:
      "https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg?cs=srgb&dl=pexels-engin-akyurt-1486861.jpg&fm=jpg",
    videoTime: 20,
  },
  {
    title: "Lớp 1",
    teacher: "Kim ca",
    titleImageUrlStream:
      "https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg?cs=srgb&dl=pexels-engin-akyurt-1486861.jpg&fm=jpg",
    videoTime: 20,
  },
  {
    title: "Lớp 1",
    teacher: "Kim ca",
    titleImageUrlStream:
      "https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg?cs=srgb&dl=pexels-engin-akyurt-1486861.jpg&fm=jpg",
    videoTime: 20,
  },
  {
    title: "Lớp 1",
    teacher: "Kim ca",
    titleImageUrlStream:
      "https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg?cs=srgb&dl=pexels-engin-akyurt-1486861.jpg&fm=jpg",
    videoTime: 20,
  },
];

export const listServicesTitle = [
  {
    img: "https://www.kimca.net/wp-content/uploads/2022/02/163418138042938300_a640x364-1-364x363.jpg",
    title: "Làm viên chức",
    content: "Bạn muốn biết hôn nhân mình ra sao?",
  },
  {
    img: "https://www.kimca.net/wp-content/uploads/2022/02/163418138042938300_a640x364-1-364x363.jpg",
    title: "Tình duyên",
    content: "Bạn muốn biết hôn nhân mình ra sao?",
  },
  {
    img: "https://www.kimca.net/wp-content/uploads/2022/02/163418138042938300_a640x364-1-364x363.jpg",
    title: "Làm kinh doanh",
    content: "Bạn muốn biết hôn nhân mình ra sao?",
  },
  {
    img: "https://www.kimca.net/wp-content/uploads/2022/02/163418138042938300_a640x364-1-364x363.jpg",
    title: "Làm viên chức",
    content: "Bạn muốn xem thời vận sắp tới có thuận lợi để đầu tư không?",
  },
];

export enum PageURL {
  HOME = "/home",
  LOGIN = "/login",
  SIGNUP = "/signup",
  ITEM = "/item",
  POST = "/post",
}

export const MenuTitle: any = [
  {
    title: "Home",
    redirect_link: PATH_PAGE.user.tab1,
    drop_down: false,
  },
  {
    title: "Blog",
    redirect_link: PATH_PAGE.user.tab2,
    drop_down: true,
  },
  {
    title: "Collection",
    redirect_link: PATH_PAGE.user.tab3,
    drop_down: false,
  },
  {
    title: "Contact",
    redirect_link: PATH_PAGE.user.tab4,
    drop_down: false,
  },
  {
    title: "About Us",
    redirect_link: PATH_PAGE.user.tab5,
    drop_down: false,
  },
];

export const DATE_TIME_FORMAT = "HH:mm:ss DD-MM-YYYY";
export enum STATUS_ORDER {
  PENDING = "0",
  RECEIVED = "1",
  PROCESSING = "2",
  TRANSPORT = "3",
  SUCCESS = "4",
  FAILED = "5",
}
