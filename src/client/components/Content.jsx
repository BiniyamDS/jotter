import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Content = ({ post }) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const { id, title, text, createdBy, createdAt } = post;
  const cTime = new Date(createdAt);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState()

  const [canEdit, setCanEdit] = useState(false);

  function handleClick() {
    navigate(`/edit/${id}`, { state: post });
  }

  async function handlDelete() {
    try {
      await axios.delete(`/api/post/${id}`, {headers: {
        Authorization: `Bearer ${ await currentUser.getIdToken()}`, // Attach the token as a Bearer token
      },})
      navigate('/myPosts')
    } catch {
      setError('Failed to delete post')
    }
  }

  useEffect(() => {
    if (currentUser.email === createdBy) {
      setCanEdit(true);
    }
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-4">
      {error && <span className="error">{error}</span>}
      <div className="flex">
        <h1 className="text-xl font-bold mt-4 pr-2">{title}</h1>
        {canEdit && (
          <>
            <button
              onClick={handleClick}
              className="btn !mx-0"
            >
              Edit Blog
            </button>
            <button
              onClick={handlDelete}
              className="btn !mx-1 hover:bg-red-300"
            >
              Delete Blog
            </button>
          </>
        )}
      </div>
      <p className="text-gray-500">
        By {createdBy}, on{" "}
        {`${weekdays[cTime.getDay()]}, ${cTime.toLocaleString("default", {
          month: "long",
        })} ${cTime.getDate()}, ${cTime.getFullYear()}`}
      </p>
      <p className="pt-4 text-justify whitespace-pre-line">{text}</p>
    </div>
  );
};

export default Content;
