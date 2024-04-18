import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const { id, title, image, createdBy, createdAt } = post;
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/post/${id}`);
  }
  return (
    <li
      className="w-1/2 p-2 hover:border-2 hover:cursor-pointer"
      onClick={handleClick}
    >
      <img className="w-full  max-h-64" src={image} />
      <h1 className="text-xl font-bold p-2">{title}</h1>
      <p className="px-2 text-gray-500">By {createdBy}</p>
    </li>
  );
};

export default PostCard;
