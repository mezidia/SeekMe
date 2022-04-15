export default function Error({ error }) {
  return (
    <div className="alert alert-danger mt-2" role="alert">
      {error}
    </div>
  );
}
