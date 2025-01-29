import { RetroHeader } from "@/components/RetroHeader";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/50 to-secondary pt-20">
      <RetroHeader />
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-primary-dark mb-6">About Us</h2>
            <div className="prose prose-lg">
              <p className="mb-6">
                India faces a growing crisis of urban and rural flooding, exacerbated by climate change, unplanned urbanization, and inadequate infrastructure. Floods account for over 70% of disaster-related damages in the country, with annual losses exceeding ₹1 lakh crore, and over 1,500 lives lost every year. Major cities like Mumbai and Bengaluru suffer from paralyzing urban floods due to poor drainage systems, while rising sea levels and erratic rainfall patterns threaten rural and coastal communities. Current flood management strategies lack accurate, localized forecasting, leading to resource mismanagement and reactive responses. Fragmented data sources and limited community involvement further hinder effective planning and mitigation efforts. This persistent issue disrupts essential services, displaces millions, and poses a significant threat to India's socio-economic development and environmental sustainability.
              </p>
              <p>
                Flooding is a persistent and escalating challenge in India, impacting urban and rural communities alike due to unplanned urbanization, climate change, and outdated infrastructure. This project proposes an innovative AI-driven flood simulation and risk assessment platform to address these critical issues. Leveraging real-time observational data, digital twin technology, and advanced machine learning techniques, the system aims to simulate flood scenarios, optimize resource allocation, and provide actionable insights for proactive decision-making.
              </p>
              <p>
                The solution integrates multi-source data, including meteorological, hydrological, and topographical inputs, to create a dynamic and comprehensive simulation environment. This facilitates localized predictions, targeted mitigation strategies, and community-centric planning. By focusing on India's most flood-prone regions, this platform aspires to reduce economic losses, protect human lives, and minimize environmental damage.
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-primary-dark mb-6">Our Team</h2>
            <img 
              src="/lovable-uploads/21b16aff-0753-4be2-a783-c8a9ccdd9ce4.png" 
              alt="Team GeoDevs" 
              className="w-full rounded-lg mb-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;