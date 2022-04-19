import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta name="title" content="ЗнайдиМене" key="title" />
        <meta
          name="description"
          content="Онлайн-сервіс, який допоможе Вам знайти своїх друзів та рідних."
          key="description"
        />
        <meta
          name="keywords"
          content="знайти рідних, пошук рідних, пошук друзів, оголошення про родичів, оголошення про зниклих"
          key="keywords"
        />
        <meta name="robots" content="index, follow" key="robots" />
        <meta charset="UTF-8" key="charset" />
        <meta name="language" content="Ukrainian" key="language" />
        <title>ЗнайдиМене</title>
      </Head>
      <Navbar />
      <div className="container-fluid d-flex flex-column min-vh-100">
        {children}
      </div>
      <Footer />
    </>
  );
}
