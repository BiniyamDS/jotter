const Card = ({children}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card">
        <div className="mx-auto">
          
          {/* <h1 className="text-xl text-gray-500">Welcome to Jotter!</h1> */}
        </div>
        {children}
      </div>
    </div>
  )
}

export default Card