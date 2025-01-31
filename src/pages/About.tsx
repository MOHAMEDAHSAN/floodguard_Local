import { RetroHeader } from "@/components/RetroHeader";
import { Footer } from "@/components/Footer";
import { AlertTriangle, Building2, Brain, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-light/50 to-secondary">
      <RetroHeader />
      
      <div className="container mx-auto px-6 py-12 flex-grow">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg animate-fadeIn">
            <h2 className="text-3xl font-bold text-primary-dark mb-6">About Our Mission</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-destructive mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-primary-dark mb-2">The Crisis</h3>
                  <p className="text-gray-700">
                    India faces a critical flooding crisis, with over 70% of disaster-related damages and annual losses exceeding ₹1 lakh crore. More than 1,500 lives are lost yearly, highlighting the urgent need for better flood management solutions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Building2 className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-primary-dark mb-2">Urban Impact</h3>
                  <p className="text-gray-700">
                    Major cities like Mumbai and Bengaluru suffer from paralyzing urban floods due to inadequate drainage systems and unplanned urbanization. Rising sea levels and erratic rainfall patterns pose additional threats to both urban and rural communities.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-primary-dark mb-2">Current Challenges</h3>
                  <p className="text-gray-700">
                    Current flood management strategies lack accurate, localized forecasting, leading to resource mismanagement and reactive responses. Fragmented data sources and limited community involvement further hinder effective planning and mitigation efforts.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Brain className="w-6 h-6 text-purple-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-primary-dark mb-2">Our Solution</h3>
                  <p className="text-gray-700">
                    We're developing an innovative AI-driven flood simulation and risk assessment platform that leverages real-time data, digital twin technology, and advanced machine learning. Our goal is to provide actionable insights for proactive decision-making and community-centric planning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 backdrop-blur-lg rounded-xl p-8 shadow-lg animate-slideIn">
            <h2 className="text-3xl font-bold text-primary-dark mb-6 flex items-center gap-2">
              <Users className="w-8 h-8" />
              Meet Our Team
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-primary-dark">Abishai K C</h3>
                <p className="text-gray-600 font-medium">Team Leader</p>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-700"><span className="font-medium">College:</span> Saveetha Engineering College</p>
                  <p className="text-gray-700"><span className="font-medium">Branch:</span> BTech AIML</p>
                  <p className="text-gray-700"><span className="font-medium">Semester:</span> III</p>
                  <p className="text-gray-700"><span className="font-medium">Email:</span> abishaioff@gmail.com</p>
                </div>
              </div>
              
              <div className="bg-white/50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-primary-dark">S Mohamed Ahsan</h3>
                <p className="text-gray-600 font-medium">Team Member</p>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-700"><span className="font-medium">College:</span> Saveetha Engineering College</p>
                  <p className="text-gray-700"><span className="font-medium">Branch:</span> BTech AIML</p>
                  <p className="text-gray-700"><span className="font-medium">Semester:</span> III</p>
                  <p className="text-gray-700"><span className="font-medium">Email:</span> ahsansaleem2006@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;