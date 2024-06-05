import Rectangle from "src/assets/Rectangle.png";
import { BreadCreumbPublic, FilterHelper, PropertyCard } from "src/components";
const Properties = () => {
  return (
    <div className="bg-white w-full h-fit">
      <div className="w-full bg-white relative">
        <div className="h-60 bg-overlay-50 w-full">
          <img src={Rectangle} className="h-60" alt="banner" />
          <div className="absolute flex flex-col items-center justify-center inset-0 gap-5">
            <h1 className="lg:text-4xl text-2xl font-semibold text-white">
              Propertice
            </h1>
            <BreadCreumbPublic />
          </div>
        </div>
      </div>
      <div className="px-60 py-16 space-y-8">
        <FilterHelper />
        <div className="grid grid-cols-3 gap-6">
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div>
      </div>
    </div>
  );
};

export default Properties;
