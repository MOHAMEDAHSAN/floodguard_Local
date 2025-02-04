import { VantaBackground } from "@/components/VantaBackground";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-secondary/50 dark:from-[#0a0f1a] dark:to-[#151b29] transition-colors duration-500">
      <VantaBackground />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 dark:border-white/10">
          <h1 className="text-4xl font-bold mb-8 text-primary-dark dark:text-cyan-400">
            About Our Mission
          </h1>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-destructive dark:text-destructive flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive inline-block"></span>
                The Crisis
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                India faces a critical flooding crisis, with over 70% of disaster-related damages and annual losses exceeding ₹1 lakh crore. More than 1,500 lives are lost yearly, highlighting the urgent need for better flood management solutions.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block"></span>
                Urban Impact
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Major cities like Mumbai and Bengaluru suffer from paralyzing urban floods due to inadequate drainage systems and unplanned urbanization. Rising sea levels and erratic rainfall patterns pose additional threats to both urban and rural communities.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
                Current Challenges
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Current flood management strategies lack accurate, localized forecasting, leading to resource mismanagement and reactive responses. Fragmented data sources and limited community involvement further hinder effective planning and mitigation efforts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;