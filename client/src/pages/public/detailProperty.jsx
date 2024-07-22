import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePropertyStore } from "src/store/usePropertyStore";

const DetailProperty = () => {
  const { id } = useParams();
  const { getProperty, property } = usePropertyStore();
  useEffect(() => {
    getProperty(id);
  }, []);
  console.log(property);
  return <div>Detail</div>;
};

export default DetailProperty;
