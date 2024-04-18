import { useNavigate } from "react-router-dom";

const PostCard = ({ post, align }) => {
  const { id, title, image, createdBy, desc } = post;
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/post/${id}`);
  }
  return (
    <li className={"p-2 flex m-4 mb-16 " + (!align ? "flex-row-reverse" : "")}>
      <img className="max-h-64" src={image} />
      <div className="flex flex-col pl-8">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className=" text-gray-500 pb-4">
          By {createdBy.charAt(0).toUpperCase() + createdBy.slice(1)}
        </p>
        <p className="text-justify pr-28">{desc}</p>
        <button
          onClick={handleClick}
          className="border-2 w-28 h-16 ml-96 hover:shadow-lg hover:bg-gray-200"
        >
          Read Blog
        </button>
      </div>
    </li>
  );
};

export default PostCard;
