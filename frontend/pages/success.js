import { useRouter } from "next/router";
import Head from "next/head";
import useOrderConfirm from "../hooks/useOrderConfirm";

const Success = () => {
  const router = useRouter();
  const { session_id } = router.query;

  const { order, loading } = useOrderConfirm(session_id);

  return (
    <div>
      <Head>
        <title>Thank you for your purhcase!</title>
        <meta name="description" content="Thank you for your purhcase" />
      </Head>

      <h2>Success!</h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div className="flex flex-col">
          <span>Your order is confirmed</span>
          <span>Order Number: {order.id}</span>
        </div>
      )}
    </div>
  );
};

export default Success;
