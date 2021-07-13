import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import useOrders from "../hooks/userOrders";

const Acount = () => {
  const { user, logoutUser, getToken } = useContext(AuthContext);

  const { orders, loading } = useOrders(user, getToken);
  return (
    <div>
      <Head>
        <title>Cycles | Account</title>
        <meta
          name="description"
          content="The account page, view your orders and logout"
        />
      </Head>
      {user ? (
        <div>
          <h2 className="font-bold">Account Page</h2>

          <div className="flex flex-col mt-4">
            <h3 className="font-semibold">Your Orders</h3>
            {loading ? (
              <p>Loading orders...</p>
            ) : (
              orders.map((order) => (
                <div key={order.id}>
                  {new Date(order.created_at).toLocaleDateString("en-EN")}{" "}
                  {order.product.title} ${order.total} {order.status}
                </div>
              ))
            )}
          </div>
          <div className="flex flex-col items-start mt-16">
            <span>logged in as: {user.email}</span>
            <button onClick={logoutUser}>Logout</button>
          </div>
        </div>
      ) : (
        <div>
          <p>Please log in</p>
          <Link href="/">
            <a>Go Back</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Acount;
