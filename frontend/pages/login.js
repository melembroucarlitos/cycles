import Head from "next/head";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    loginUser(email);
  };

  // TODO: style this form
  return (
    <div>
      <Head>
        <title>Cycles | Login</title>
        <meta name="description" content="Login here to make your purchase" />
      </Head>

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email Address"
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
