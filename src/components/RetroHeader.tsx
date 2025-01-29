import { Link } from "react-router-dom";

export const RetroHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-dark via-primary to-primary-light py-4">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <h1 
                className="text-4xl font-black tracking-tighter text-white"
                style={{
                  textShadow: `
                    ${getComputedStyle(document.documentElement).getPropertyValue('--primary-light')} 2px 2px 0px,
                    ${getComputedStyle(document.documentElement).getPropertyValue('--primary')} 4px 4px 0px
                  `
                }}
              >
                FloodGuard
              </h1>
            </Link>
            <p className="text-lg font-light text-white tracking-[0.2em] italic">
              Advanced Flood Warning System
            </p>
          </div>
          <nav>
            <ul className="flex space-x-6 text-white">
              <li>
                <Link to="/" className="hover:text-primary-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="hover:text-primary-light transition-colors">
                  Chatbot
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-light transition-colors">
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