export const RetroHeader = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-dark via-primary to-primary-light py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-start justify-center">
          <h1 
            className="text-6xl font-black tracking-tighter text-white"
            style={{
              textShadow: `
                ${getComputedStyle(document.documentElement).getPropertyValue('--primary-light')} 2px 2px 0px,
                ${getComputedStyle(document.documentElement).getPropertyValue('--primary')} 4px 4px 0px,
                ${getComputedStyle(document.documentElement).getPropertyValue('--primary-dark')} 6px 6px 0px,
                #006064 8px 8px 0px
              `
            }}
          >
            FloodGuard
          </h1>
          <p className="text-xl font-light text-white tracking-[0.2em] italic mt-4">
            Advanced Flood Warning System
          </p>
        </div>
      </div>
    </div>
  );
};