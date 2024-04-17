import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const [canEdit, setCanEdit] = useState(false);

  function handleClick() {
    navigate(`/edit/${id}`, { state: post });
  }

  useEffect(() => {
    if (currentUser.username === createdBy) {
      setCanEdit(true);
    }
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="text-xl font-bold">
        {title}
        {canEdit && (
          <button
            onClick={handleClick}
            className="btn !mx-2"
          >
            Edit Blog
          </button>
        )}
      </h1>
      <p className="text-gray-500">
        By {createdBy}, on{" "}
        {`${weekdays[cTime.getDay()]}, ${cTime.toLocaleString("default", {
          month: "long",
        })} ${cTime.getDate()}, ${cTime.getFullYear()}`}
      </p>
      <p className="pt-4 text-justify">{text}</p>
    </div>
  );
};

export default Content;
