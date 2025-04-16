import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    });
  }, []);

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && orders.map(order => (
            <tr key={order._id}>
              <td>{(new Date(order.createdAt)).toLocaleString()}</td>
              <td>
                <div><strong>{order.name}</strong></div>
                <div>{order.email}</div>
                <div>{order.streetAddress}</div>
                <div>{order.city}, {order.postalCode}</div>
                <div>{order.country}</div>
              </td>
              <td>
                {order.line_items.map((l, i) => (
                  <div key={i}>
                    {l.price_data?.product_data.name} x {l.quantity}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        table.basic {
          width: 100%;
          border-collapse: collapse;
        }
        table.basic th,
        table.basic td {
          text-align: left;
          padding: 12px;
          vertical-align: top;
          border-bottom: 1px solid #ccc;
        }
        td > div {
          margin-bottom: 4px;
        }
      `}</style>
    </Layout>
  );
}
