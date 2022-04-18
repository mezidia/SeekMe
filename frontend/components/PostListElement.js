import Link from "next/link";
import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";

import { storage } from "../firebase";

export default function PostListElement({ post }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  const getImage = (imagePath) => {
    getDownloadURL(ref(storage, imagePath))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        setPhotoUrl(url);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  useEffect(() => {
    getImage(post.image);
  });

  return (
    <div className="col">
      <div className="card shadow-sm">
        {photoUrl ? (
          <img src={photoUrl} className="img-fluid" />
        ) : (
          <svg
            className="bd-placeholder-img card-img-top"
            width="100%"
            height="225"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: Немає фото"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Немає фото</title>
            <rect width="100%" height="100%" fill="#55595c"></rect>
            <text x="50%" y="50%" fill="#eceeef" dy=".3em">
              Немає фото
            </text>
          </svg>
        )}
        <div className="card-body">
          <p className="card-text">{post.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                <a type="button" role="button" className="btn btn-warning">
                  Почитати більше
                </a>
              </Link>
              <Link href="/user/[id]/" as={`/user/${post.owner_id}`}>
                <a
                  type="button"
                  role="button"
                  class="btn btn-outline-dark ms-1"
                >
                  Інші пости автора
                </a>
              </Link>
            </div>
            <small>{post.last_place}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
