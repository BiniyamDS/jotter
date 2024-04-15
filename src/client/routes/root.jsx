import { Link, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card">
        <div className="mx-auto">
          
          <h1 className="text-xl text-gray-500">Welcome to Jotter!</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
// /home/abugida/Documents/Projects/jotter/public/blog.svg
// /home/abugida/Documents/Projects/jotter/src/client/routes/root.jsx