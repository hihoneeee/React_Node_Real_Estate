import banner from "src/assets/bg-home.png";
const Home = () => {
  return (
    <div className="bg-white w-full">
      <div className="w-full h-fit fixed">
        <img src={banner} alt="banner" />
        <div className="absolute flex flex-col items-center justify-center inset-0 gap-5">
          <h1 className="lg:text-4xl text-2xl font-semibold text-white">
            Find Your Dream Home
          </h1>
          <p className="lg:text-sm text-xs text-gray-300 lg:w-[35%] text-center">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Proin sodales ultrices nulla blandit
            volutpat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
