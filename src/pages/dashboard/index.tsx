import {PAGE} from "@/constants/message";
import Page from "@/layouts";
import { Box, Button} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
<link rel="preconnect" href="https://fonts.gstatic.com"></link>;

export default function Dashboard() {

    return (
        <Page title={PAGE.TITLE} menuIndex={0}>
            <Box className='dashboard-container'  sx={{ width: "100vw"}}>
                <p>Dashboard</p>
            </Box>
        </Page>
    );
}
