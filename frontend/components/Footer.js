export default function Footer() {
  return (
    <div className="container-fluid mt-auto">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0  text-decoration-none lh-1 fw-bold"
          >
            ЗнайдиМене
          </a>
          <span>© 2022 mezidia</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a href="https://t.me/sylvenis" target="_blank">
              Telegram
            </a>
          </li>
          <li className="ms-3">
            <a href="https://github.com/mezidia/SeekMe" target="_blank">
              GitHub
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
