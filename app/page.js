
  export default function Home() {
    return (
      <div className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white">Logo</div>

        {/* Burger menu for mobile */}
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <div className="hidden lg:flex space-x-4">
          <a href="#" className="text-white">Home</a>
          <a href="#" className="text-white">Work</a>
          <a href="#" className="text-white">About</a>
          <a href="#" className="text-white">CV</a>
        </div>
      </div>

      {/* Mobile menu */}
      {/* {(
        <div className="lg:hidden mt-4">
          <a href="#" className="block text-white">Home</a>
          <a href="#" className="block text-white">Work</a>
          <a href="#" className="block text-white">About</a>
          <a href="#" className="block text-white">CV</a>
        </div>
      )} */}

      {/* Your content goes here */}
      <div className="mt-8">
        <h1 className="text-4xl text-white">Welcome to my website</h1>
        <p className="text-white">Your content goes here...</p>
      </div>
    </div>
    )
  }