import RetroHeader from "@/components/RetroHeader";
import { AlertTriangle, Building2, Brain, Users, Github, Linkedin, Mail, Phone } from "lucide-react";
import { VantaBackground } from "@/components/VantaBackground";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-light/50 to-secondary">
      <VantaBackground />
      <RetroHeader />
      
      <div className="container mx-auto px-6 pt-32 pb-12 flex-grow">
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
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="bg-white/50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                    <h3 className="text-xl font-semibold text-primary-dark">Abishai K C</h3>
                    <p className="text-gray-600 font-medium">Team Leader</p>
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-700"><span className="font-medium">College:</span> Saveetha Engineering College</p>
                      <p className="text-gray-700"><span className="font-medium">Branch:</span> BTech AIML</p>
                      <p className="text-gray-700"><span className="font-medium">Semester:</span> III</p>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white/95 backdrop-blur-sm">
                  <div className="flex justify-between space-x-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" />
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h4 className="text-lg font-semibold">Contact Information</h4>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <a href="mailto:abishaioff@gmail.com" className="text-sm text-blue-600 hover:underline">
                            abishaioff@gmail.com
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Github className="w-4 h-4" />
                          <a href="https://github.com/abishai" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            GitHub Profile
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Linkedin className="w-4 h-4" />
                          <a href="https://linkedin.com/in/abishai" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            LinkedIn Profile
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">+91 9876543210</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="bg-white/50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                    <h3 className="text-xl font-semibold text-primary-dark">S Mohamed Ahsan</h3>
                    <p className="text-gray-600 font-medium">Team Member</p>
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-700"><span className="font-medium">College:</span> Saveetha Engineering College</p>
                      <p className="text-gray-700"><span className="font-medium">Branch:</span> BTech AIML</p>
                      <p className="text-gray-700"><span className="font-medium">Semester:</span> III</p>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white/95 backdrop-blur-sm">
                  <div className="flex justify-between space-x-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" />
                      <AvatarFallback>MA</AvatarFallback>
                    </Avatar>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h4 className="text-lg font-semibold">Contact Information</h4>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <a href="mailto:ahsansaleem2006@gmail.com" className="text-sm text-blue-600 hover:underline">
                            ahsansaleem2006@gmail.com
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Github className="w-4 h-4" />
                          <a href="https://github.com/ahsan" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            GitHub Profile
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Linkedin className="w-4 h-4" />
                          <a href="https://linkedin.com/in/ahsan" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            LinkedIn Profile
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">+91 9876543210</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;