import { useEffect, useState } from "react";
import { apiGetProperties } from "src/apis/property";
import Rectangle from "src/assets/Rectangle.png";
import { BreadCreumbPublic, FilterHelper, PropertyCard } from "src/components";

const Properties = () => {
  const [properties, setProperties] = useState();
  useEffect(() => {
    const fetchProperties = async () => {
      const response = await apiGetProperties({
        limit: import.meta.env.VITE_LIMIT_PROPERTIES,
      });
      if (response.success) setProperties(response.properties);
    };
    fetchProperties();
  }, []);
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
        <div className="grid desktop:grid-cols-4 laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-y-10 justify-items-center">
          {properties?.rows?.map((el) => (
            <PropertyCard key={el.id} properties={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
