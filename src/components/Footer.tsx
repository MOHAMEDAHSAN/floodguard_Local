import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary-light transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary-light transition-colors">About Us</Link></li>
              <li><Link to="/chatbot" className="hover:text-primary-light transition-colors">Chatbot</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Team GeoDevs</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Abishai K C</p>
                <p className="text-sm text-gray-300">Team Leader</p>
                <div className="flex space-x-2 mt-2">
                  <a href="https://github.com/Abishai95141" target="_blank" rel="noopener noreferrer" 
                     className="hover:text-primary-light transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" 
                     className="hover:text-primary-light transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div>
                <p className="font-semibold">Mohamed Ahsan</p>
                <p className="text-sm text-gray-300">Team Member</p>
                <div className="flex space-x-2 mt-2">
                  <a href="https://github.com/MOHAMEDAHSAN" target="_blank" rel="noopener noreferrer" 
                     className="hover:text-primary-light transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:abishaioff@gmail.com" className="hover:text-primary-light transition-colors">
                  abishaioff@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:8667331224" className="hover:text-primary-light transition-colors">
                  +91 8667331224
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Institution</h3>
            <div className="space-y-2">
              <p>Saveetha Engineering College</p>
              <p className="text-sm text-gray-300">BTech AIML - Semester III</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-sm text-gray-400">
            © 2024 GeoDevs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};