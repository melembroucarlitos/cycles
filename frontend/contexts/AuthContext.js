import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { Magic } from "magic-sdk";

const MAGIC_PUBLIC_KEY =
  process.env.MAGIC_PUBLIC_KEY || "pk_live_62064CB8BE7D27E9";

const AuthContext = createContext();

// TODO: Trouble shoot refreshing token and session persistance
let magic;
export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });

      setUser({ email });

      const token = await getToken();
      console.log("checkUserLoggedIn token", token);

      router.push("/");
    } catch (err) {
      setUser(null);
    }
  };

  const logoutUser = async () => {
    try {
      await magic.user.logout();

      setUser(null);
      router.push("/");
    } catch (err) {}
  };

  // This doesnt work
  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      console.log("Check user logged in:", isLoggedIn);
      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        console.log("email:", email);
        setUser({ email });

        const token = await getToken();
        console.log("checkUserLoggedIn token", token);
      }
    } catch (err) {}
  };

  /**
   * Retrieves Magic Issued Bearer Token
   * Allows User to make authenticated requests
   */

  const getToken = async () => {
    try {
      const token = await magic.user.getIdToken();
      return token;
    } catch (err) {}
  };

  useEffect(() => {
    magic = new Magic(MAGIC_PUBLIC_KEY);
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, getToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
