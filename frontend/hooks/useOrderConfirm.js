import { useEffect, useState } from "react";
import { postOrderConfirm } from "../utils/api";

const useOrderConfirm = (session_id) => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await postOrderConfirm(session_id);
        setOrder(data);
      } catch (err) {
        setOrder(null);
      }
      setLoading(false);
    })();
  }, [session_id]);

  return { order, loading };
};

export default useOrderConfirm;
