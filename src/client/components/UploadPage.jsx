import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadPage = ({ post, handleAction }) => {
  const { title, image, text, desc } = post;
  const [titleState, setTitle] = useState(title);
  const [descState, setDesc] = useState(desc);
  const [imageState, setImage] = useState(image);
  const [textState, setText] = useState(text);
  const [error, setError] = useState(false);

  const content = {
    title: titleState,
    image: imageState,
    text: textState,
    desc: descState,
  }

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    if (!titleState || !textState || !imageState) {
      return setError("All fields are manadatory!");
    }

    try {
      // await axios.put(`/api/edit/${id}`, );
      const {data} = await handleAction(content)
      // console.log(data)
      navigate(`/post/${data.id}`)
    } catch(err) {
      console.log(err)
      setError("Failed to upload content");
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
      Description
      <textarea
        className="input !h-32 text-justify"
        type="text"
        value={descState}
        onChange={(e) => setDesc(e.target.value)}
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

export default UploadPage;
