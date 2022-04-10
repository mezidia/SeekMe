import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="container">
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <title>SeekMe</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
