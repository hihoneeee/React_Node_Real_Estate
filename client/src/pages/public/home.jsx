import banner from "src/assets/bg-home.png";
import { FilterHome } from "src/components";
import Button from "src/components/common/button";
const Home = () => {
  return (
    <div className="bg-white w-full h-[100rem]">
      <div className="w-full h-fit">
        <img src={banner} alt="banner" />
        <div className="absolute flex flex-col items-center justify-center inset-0 gap-5">
          <h1 className="desktop:text-4xl laptop:text-3xl text-2xl font-semibold text-white">
            Find Your Dream Home
          </h1>
          <p className="text-gray-400 desktop:w-1/3 laptop:w-[40%] text-center desktop:text-base laptop:text-sm text-xs">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Proin sodales ultrices nulla blandit
            volutpat.
          </p>
        </div>
      </div>
      <div className="relative z-0 h-[12rem] mt-[-8rem] flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <Button
            className="p-3 bg-main-500 text-white rounded-md"
            text="Rent"
          />
          <Button
            className="p-3 bg-white text-gray-400 rounded-md"
            text="Sale"
          />
        </div>
        <div>
          <FilterHome />
        </div>
      </div>
    </div>
  );
};

export default Home;
