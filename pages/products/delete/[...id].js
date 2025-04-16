import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react"; // ✅ Import useState and useEffect

export default function DeleteProductPage() {
  const router = useRouter();
  const { id } = router.query; // ✅ Extract id from route
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get('/api/products?id=' + id).then((response) => {
      setProductInfo(response.data); // ✅ Store product details
    });
  }, [id]);

  function goBack() {
    router.push('/products');
  }

  async function deleteProduct() {
    await axios.delete('/api/products?id=' + id);
    // router.push('/products');

    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete &nbsp;"{productInfo?.title}"?</h1>
      <div className="flex gap-2 mt-4 justify-center">
       
        <button onClick={deleteProduct} className="btn-red">Yes</button>
        <button onClick={goBack} className="btn-default">No</button>
      </div>
    </Layout>
  );
}
