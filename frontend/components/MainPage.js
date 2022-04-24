import Form from "./SearchForm";

export default function MainPage() {
  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">ЗнайдиМене</h1>
          <p className="lead text-muted">
            Онлайн-сервіс, який допоможе Вам знайти своїх друзів та рідних.
          </p>
          <span>
            <Form />
          </span>
        </div>
      </div>
    </section>
  );
}
