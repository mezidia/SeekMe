export default function EditPost({
  post,
  setNewName,
  setNewPlace,
  setNewDescription,
  setNewImage,
}) {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">
          Повне ім'я
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputName"
          aria-describedby="emailHelp"
          onChange={(e) => setNewName(e.target.value)}
          defaultValue={post.full_name}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPlace" className="form-label">
          Останнє місце перебування
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputPlace"
          defaultValue={post.last_place}
          onChange={(e) => setNewPlace(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputDescription" className="form-label">
          Опис
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputDescription"
          defaultValue={post.description}
          onChange={(e) => setNewDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputDescription" className="form-label">
          Зображення
        </label>
        <input
          type="file"
          className="form-control"
          id="exampleInputDescription"
          onChange={(e) => setNewImage(e.target.files[0])}
          required
        />
      </div>
    </form>
  );
}
