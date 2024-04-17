import { useLocation } from "react-router-dom";
import Edit from "../components/Edit";

const EditBlog = () => {
  const location = useLocation();

  const data = location.state;
  
  return <div className="flex"><Edit post={data}/></div>;
};

export default EditBlog;
