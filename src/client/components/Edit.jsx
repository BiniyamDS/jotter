import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = ({ post }) => {
  const { id, title, image, text } = post;
  const [titleState, setTitle] = useState(title);
  const [imageState, setImage] = useState(image);
  const [textState, setText] = useState(text);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    // console.log('submitted')
    if (!titleState || !textState || !imageState) {
      setError("All fields are manadatory!");
    }

    try {
      await axios.put(`/api/edit/${id}`, {
        title: titleState,
        image: imageState,
        text: textState,
      });
      navigate(`/post/${id}`)
    } catch {
      setError("Failed to edit");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto !w-5/6 p-2 flex flex-col"
    >
      {error && <span className="error">{error}</span>}
      Title
      <input
        className="input"
        type="text"
        value={titleState}
        onChange={(e) => setTitle(e.target.value)}
      />
      Image URL
      <input
        className="input"
        type="text"
        value={imageState}
        onChange={(e) => setImage(e.target.value)}
      />
      Text
      <textarea
        className="input !h-64 text-justify"
        type="text"
        value={textState}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mx-auto">
        <button
          type="submit"
          className="btn mx-auto !m-2"
        >
          Save
        </button>
        <button
          onClick={() => navigate(-1)}
          className="btn mx-auto hover:bg-red-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Edit;
