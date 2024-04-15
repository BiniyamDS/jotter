import { Link, Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-slate-500 w-1/3 h-80 rounded-3xl ">
        <div className="p-5">
          <ul className="pb-5 mx-auto flex bg-slate-900 text-white">
            <li className="px-2 hover:text-blue-400">
              <Link to="/auth/login">Login</Link>
            </li>
            <li className="px-2 hover:text-blue-400">
              <Link to="/auth/register">Register</Link>
            </li>
          </ul>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
