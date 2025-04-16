// import Layout from "@/components/Layout";
// import {useState} from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
import Layout from "@/components/Layout";
import ProductForm from "@/components/Productform";

export default function NewProduct() {
  return (
    <Layout>
      <h1> New Product</h1>
  <ProductForm/>
  </Layout> 
  );
  
} 