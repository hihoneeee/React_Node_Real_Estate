import { usePropertyStore } from "src/store";
import { PropertyCard } from "..";
import { useEffect } from "react";

const SimilarProperty = ({ cateId }) => {
  const { getSimilarProperties, similarProperties } = usePropertyStore();
  useEffect(() => {
    getSimilarProperties({ categoryId: cateId, sort: "-createdAt" });
  }, []);
  return (
    <div>
      <PropertyCard properties={similarProperties} />
    </div>
  );
};

export default SimilarProperty;
