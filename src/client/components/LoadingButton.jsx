import { useState } from "react";

const LoadingButton = ({ name, handleAction, ...props }) => {
  const [Loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    setLoading(true);
    // Simulate a loading process
    try {
        await handleAction(e);
    } catch (err) {
        console.log(err)
    }
    setLoading(false);
  };

  return (
    <button
      disabled={Loading}
      className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        Loading ? "cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
      {...props}
    >
      {Loading && (
        <svg
          className="animate-spin h-5 w-5 mr-3 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {name}
    </button>
  );
};

export default LoadingButton;
