import { useEffect } from "react";

export default function EditPost({
  post,
  newNameRef,
  newPlaceRef,
  newDescriptionRef,
  newWayRef,
}) {
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
          ref={newNameRef}
          defaultValue={post.full_name}
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
          defaultValue={post.last_place}
          ref={newPlaceRef}
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
          defaultValue={post.description}
          ref={newDescriptionRef}
          required
        />
      </div>
      <div className="mb-3">
        <label for="exampleInputWay" className="form-label">
          Шлях до картинки
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputWay"
          defaultValue={post.image}
          ref={newWayRef}
          required
        />
      </div>
    </form>
  );
}
