import { useEffect } from "react";
import { BreadCreumbPublic, StepperAddProperty } from "src/components";
import { useLocationStore } from "src/store";

const AddProperty = () => {
  const { getCities } = useLocationStore();
  useEffect(() => {
    getCities();
  }, []);
  return (
    <>
      <BreadCreumbPublic style="text-gray-500 desktop:px-[22rem] px-[16rem] py-6" />
      <div className="px-[16rem] desktop:px-[22rem] py-2 space-y-8">
        <h2 className="laptop:text-3xl text-2xl font-semibold">
          <span className="border-l-8 border-main-500 mr-1"></span>
          Add Your Property
        </h2>
        <StepperAddProperty />
      </div>
    </>
  );
};

export default AddProperty;
