import Link from "next/link";

export default function MainPage() {
  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">ЗнайдиМене</h1>
          <p className="lead text-muted">
            Онлайн-сервіс, який допоможе Вам знайти своїх друзів та рідних.
          </p>
          <p>
            <Link href="/register">
              <a className="btn btn-primary btn-lg my-2 me-2">
                Зареєструватись
              </a>
            </Link>
            <Link href="/login">
              <a className="btn btn-secondary btn-lg my-2">Увійти</a>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
