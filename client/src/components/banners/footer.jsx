import banner from "src/assets/bannerFooter.png";
import Button from "../common/button";
const Footer = () => {
  return (
    <div className="w-full bg-white relative">
      <div className="h-full bg-overlay-50 w-full">
        <img src={banner} className="h-full" alt="banner" />
        <div className="absolute flex flex-col items-center justify-center inset-0 gap-5">
          <h1 className="desktop:text-4xl laptop:text-3xl text-2xl font-semibold text-white">
            Find Best Place For Living
          </h1>
          <p className="text-gray-400 desktop:w-1/3 laptop:w-[40%] text-center desktop:text-base laptop:text-sm text-xs">
            Spend vacations in best hotels and resorts find the great place of
            your choice using different searching options.
          </p>
          <Button
            text="Contact Us"
            className="text-white bg-transparen px-4 py-2 border hover:shadow-[5px_5px_5px_rgba(0,0,0,0.24)]"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
