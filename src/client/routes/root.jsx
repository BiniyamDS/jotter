// import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Root = () => {
  const navigate = useNavigate();
  
  useEffect(()=> {
    navigate('/login')
  }, [])
  return <div>Root page!</div>;
};

export default Root;
