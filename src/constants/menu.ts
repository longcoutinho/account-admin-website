import {faCartShopping, faCoins} from "@fortawesome/free-solid-svg-icons";
export const menuBar =
    [
        {
            title: "Mua",
            icon: faCartShopping,
            child: [
                {
                    title: "Tài khoản",
                    url: "/buy"
                },
            ]
        },
        {
            title: "Nạp tiền",
            icon: faCoins,
            child: [
                {
                    title: "Nạp tiền",
                    url: "/topup"
                },
            ]
        },

    ];
