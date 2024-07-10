/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Rectangle from "src/assets/Rectangle.png";
import {
  BreadCreumbPublic,
  FilterHelper,
  Pagination,
  PropertyCard,
} from "src/components";
import { usePropertyStore } from "src/store/usePropertyStore";
import { useQueryString } from "src/hooks/useQueryString";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const { properties, getProperties } = usePropertyStore();
  const params = useQueryString();
  const [sort, setSort] = useState("");

  useEffect(() => {
    if (sort) {
      params.sort = sort;
    }

    getProperties({
      limit: import.meta.env.VITE_LIMIT_PROPERTIES,
      ...params,
    });
  }, [searchParams, getProperties, sort]);
  return (
    <div className="bg-white w-full h-fit">
      <div className="w-full bg-white relative">
        <div className="h-60 bg-overlay-50 w-full">
          <img src={Rectangle} className="h-60" alt="banner" />
          <div className="absolute flex flex-col items-center justify-center inset-0 gap-5">
            <h1 className="lg:text-4xl text-2xl font-semibold text-white">
              {`${params.address || "Properties"}`}
            </h1>
            <BreadCreumbPublic />
          </div>
        </div>
      </div>
      <div className="px-60 py-16 space-y-8">
        <FilterHelper setSort={setSort} />
        <div className="grid desktop:grid-cols-4 laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-y-10 justify-items-center">
          {properties?.rows?.map((el) => (
            <PropertyCard key={el.id} properties={el} />
          ))}
        </div>
        <Pagination
          total={properties?.count}
          limit={properties?.limit}
          page={properties?.page}
        />
      </div>
    </div>
  );
};

export default Properties;
