import Rectangle from "src/assets/Rectangle.png";

const AboutUs = () => {
  return (
    <div className="bg-white w-full h-fit">
      <div className="w-full bg-white relative">
        <div className="h-60 bg-overlay-50 w-full">
          <img src={Rectangle} className="h-60" alt="banner" />
          <div className="absolute flex flex-col items-center justify-center inset-0 gap-5">
            <h1 className="lg:text-4xl text-2xl font-semibold text-white">
              Propertice
            </h1>
            <p className="lg:text-sm text-xs text-gray-300 lg:w-[35%] text-center">
              Home / Properties
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
