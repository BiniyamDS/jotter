import { useNavigate } from "react-router-dom";

const PostCard = ({ post, align }) => {
  const { post_id, title, image_url, user_id, content_desc } = post;
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/post/${post_id}`);
  }
  return (
    <li className={"p-2 flex m-4 mb-16 " + (!align ? "flex-row-reverse" : "")}>
      <img className="max-h-64" src={image_url} />
      <div className="flex flex-col pl-8">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className=" text-gray-500 pb-4">
          By {user_id.charAt(0).toUpperCase() + user_id.slice(1)}
        </p>
        <p className="text-justify pr-28">{content_desc}</p>
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
