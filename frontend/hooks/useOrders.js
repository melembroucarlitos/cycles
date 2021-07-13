import { useEffect, useState } from "react";
import { getOrders } from "../utils/api";

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          setLoading(true);
          const token = await getToken();
          const orderRes = await getOrders(token);
          setOrders(orderRes);
        } catch (err) {
          setOrders([]);
        }
        setLoading(false);
      }
    })();
  }, [user]);

  return { orders, loading };
};

export default useOrders;
