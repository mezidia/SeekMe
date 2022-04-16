import { useRef, useState, useEffect } from "react";

import checkUser from "../../utils/checkUser";
import Error from "../../components/Error";

export default function NewPost() {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const placeRef = useRef();
  const imageRef = useRef();

  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (checkUser()) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      {!isAuthenticated ? (
        <Error error={"You need to be authenticated"} />
      ) : (
        <form>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Повне ім'я
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
              placeholder="Ім'я"
              ref={nameRef}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPlace" className="form-label">
              Місце проживання
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPlace"
              placeholder="Місце проживання"
              ref={placeRef}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputDescription" className="form-label">
              Опис
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputDescription"
              placeholder="Опис"
              ref={descriptionRef}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputWay" className="form-label">
              Зображення
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleInputWay"
              placeholder="Зображення"
              ref={imageRef}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Створити
          </button>
        </form>
      )}
    </>
  );
}
