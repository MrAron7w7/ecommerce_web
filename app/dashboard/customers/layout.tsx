import { getCustomers } from "@/actions/customers/get-customers";
import React from "react";
import CustomersPage from "./page";

async function CustomersLayout() {
  const initialUsers = await getCustomers();
  return <CustomersPage initialUsers={initialUsers} />;
}

export default CustomersLayout;
