import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  // TODO: Import the svgness for the cart, style this to your liking
  return (
    <div className="flex justify-between mt-4 ml-6 mr-6">
      <Link href="/">
        <a>
          <img
            src="/cyclist.png"
            alt="home"
            className="logo"
            height="150"
            width="150"
          />
        </a>
      </Link>
      <div class="flex">
        {user ? (
          <Link href="/account">
            <a>{user.email}</a>
          </Link>
        ) : (
          <Link href="/login">
            <a>Log In</a>
          </Link>
        )}
        <button className="flex items-center">
          <img src="/cart.svg" alt="Cart" />
          <span className="ml-3 text-sm font-semibold text-indigo-500 snipcart-total-price"></span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
