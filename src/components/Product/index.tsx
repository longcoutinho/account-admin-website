import { Box, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import TypeProduct from "./Type";
import ProductList from "./Products";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchCategory } from "@/redux/slices/typeProduct";
import { fetchListProduct } from "@/redux/slices/product";
import { fetchListPaymentMethod } from "@/redux/slices/payment";

export default function ListProduct() {
  const [tabValue, setTabValue] = useState("1");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    GetData();
  }, []);

  const GetData = () => {
    try {
      dispatch(fetchCategory());
      dispatch(fetchListProduct());
      dispatch(fetchListPaymentMethod());
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <TabContext value={tabValue}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={handleChangeTab}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label="Danh mục" value="1" />
          <Tab label="Sản phẩm" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1" className="flex gap-4 flex-col">
        <TypeProduct />
      </TabPanel>
      <TabPanel value="2">
        <ProductList />
      </TabPanel>
    </TabContext>
  );
}
