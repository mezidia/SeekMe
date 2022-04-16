export default function NewPost() {
  return (
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
          required
        />
      </div>
      <div className="mb-3">
        <label for="exampleInputWay" className="form-label">
          Картинка
        </label>
        <input
          type="file"
          className="form-control"
          id="exampleInputWay"
          placeholder="Шлях до картинки"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Створити
      </button>
    </form>
  );
}
