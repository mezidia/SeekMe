import Head from "next/head";

import MainPage from "../components/MainPage";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="title" content="ЗнайдиМене" key="title" />
        <meta
          name="description"
          content="Онлайн-сервіс, який допоможе Вам знайти своїх друзів та рідних."
          key="description"
        />
        <title>ЗнайдиМене - онлайн сервіс для пошуку зниклих людей</title>
      </Head>
      <MainPage />
    </>
  );
}
