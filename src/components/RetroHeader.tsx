import { Link } from "react-router-dom";

export const RetroHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-dark via-primary to-primary-light py-2">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <h1 className="text-4xl font-black tracking-tighter text-white">
                FloodGuard
              </h1>
            </Link>
            <p className="text-lg font-light text-white tracking-[0.2em] italic">
              Advanced Flood Warning System
            </p>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  to="/" 
                  className="text-white relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/chatbot" 
                  className="text-white relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  Chatbot
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-white relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};