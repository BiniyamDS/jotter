const Posts = ({post}) => {
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
  //   console.log(typeof(createdAt))
  return (
    <div className="flex">
      <li
        className="p-2 my-4 mx-4 rounded-md"
        key={id}
      >
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-gray-500">
          By {createdBy}, on{" "}
          {`${weekdays[cTime.getDay()]}, ${cTime.toLocaleString("default", {
            month: "long",
          })} ${cTime.getDate()}, ${cTime.getFullYear()}`}
        </p>
        {text}
      </li>
    </div>
  );
};

export default Posts;
