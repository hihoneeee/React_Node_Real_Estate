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
import { useCategoryStore } from "src/store/useCategoryStore";
const Properties = () => {
  const [searchParams] = useSearchParams();
  const { properties, getProperties } = usePropertyStore();
  const { category, getCategory } = useCategoryStore();
  const params = useQueryString();
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("properties");
  useEffect(() => {
    if (sort) {
      params.sort = sort;
      if (sort === "-createdAt") {
        setTitle("filter sort: Latest");
      }
      if (sort === "createdAt") {
        setTitle("filter sort: Oldest");
      }
      if (sort === "title") {
        setTitle("filter sort: A - Z");
      }
      if (sort === "-title") {
        setTitle("filter sort: Z - A");
      }
    }
    if (params.address) {
      setTitle("filter address: " + params.address);
    }
    if (params.price) {
      params.price = searchParams.getAll("price");
      setTitle("filter price: " + searchParams.getAll("price"));
    }
    if (params.categoryId) {
      getCategory(params.categoryId);
      category?.title;
      setTitle("filter category: " + category?.title);
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
              {title}
            </h1>
            <BreadCreumbPublic />
          </div>
        </div>
      </div>
      <div className="px-[16rem] desktop:px-[22rem] py-16 space-y-8">
        <FilterHelper setSort={setSort} />
        <div className="grid desktop:grid-cols-3 laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-y-10 justify-items-center">
          {properties?.data?.map((el) => (
            <PropertyCard key={el.id} properties={el} />
          ))}
        </div>
        <Pagination
          total={properties?.total}
          limit={properties?.limit}
          page={properties?.page}
        />
      </div>
    </div>
  );
};

export default Properties;
