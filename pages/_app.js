//import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/css/bootstrap.css");
    require("../styles/globals.css");
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;