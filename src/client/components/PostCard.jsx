const PostCard = ({ post }) => {
    const { id, title, image, createdBy, createdAt } = post;
  
    return (
    <div className="flex p-2 border-2 m-2 rounded-sm">
        <li key={id}>
            <img src='../../public/img.png'/>
            <h1>{title}</h1>
        </li>
    </div>
  )
};

export default PostCard;
