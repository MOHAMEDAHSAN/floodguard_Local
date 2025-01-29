import { RetroHeader } from "@/components/RetroHeader";
import { AlertTriangle, Droplet, Building2, TreePine, Brain } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/50 to-secondary pt-20">
      <RetroHeader />
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg">
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
                <Droplet className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-primary-dark mb-2">Current Challenges</h3>
                  <p className="text-gray-700">
                    Current flood management strategies lack accurate, localized forecasting, leading to resource mismanagement and reactive responses. Fragmented data sources and limited community involvement further hinder effective planning and mitigation efforts.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <TreePine className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-primary-dark mb-2">Environmental Impact</h3>
                  <p className="text-gray-700">
                    This persistent issue disrupts essential services, displaces millions, and poses a significant threat to India's socio-economic development and environmental sustainability. Climate change continues to exacerbate these challenges.
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

          <div className="bg-primary/10 backdrop-blur-lg rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-primary-dark mb-4">Our Vision</h3>
            <p className="text-gray-700">
              By focusing on India's most flood-prone regions and integrating multi-source data, including meteorological, hydrological, and topographical inputs, we aim to create a comprehensive solution that reduces economic losses, protects human lives, and preserves our environment for future generations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;