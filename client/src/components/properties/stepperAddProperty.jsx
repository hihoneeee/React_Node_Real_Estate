import { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  InputForm,
  InputTextArea,
  InputFileV3,
  LibSelect,
} from "src/components";
import { useCategoryStore, useLocationStore } from "src/store";
import InputSelect from "../inputs/inputSelect";
const steps = ["Main Property", "Detail Property", "Done!"];

const StepperAddProperty = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const { categories } = useCategoryStore();
  const { cities } = useLocationStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const onSubmitMainProperty = (data) => {
    console.log("Main Property Data:", data);
    handleNext();
  };

  const onSubmitDetailProperty = (data) => {
    console.log("Detail Property Data:", data);
    handleNext();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length - 1 ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => setActiveStep(0)}>Reset</Button>
          </Box>
        </Fragment>
      ) : (
        <form
          onSubmit={handleSubmit(
            activeStep === 0 ? onSubmitMainProperty : onSubmitDetailProperty
          )}
        >
          {activeStep === 0 && (
            <Fragment>
              <div className="space-y-4 mt-4">
                <InputForm
                  register={register}
                  setValue={setValue}
                  id="title"
                  label="Title"
                  placeholder="Enter title..."
                  validate={{ required: "This field can't be empty!" }}
                  containerClassName="w-full"
                  errors={errors}
                />
                <InputTextArea
                  label="Description"
                  id="description"
                  placeholder="Enter description..."
                  validate={{ required: "This field can't be empty!" }}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                />
                <div className="flex gap-4">
                  <div className="w-1/2 space-y-4">
                    <InputForm
                      register={register}
                      setValue={setValue}
                      id="price"
                      label="Price"
                      type="number"
                      placeholder="Enter price..."
                      validate={{ required: "This field can't be empty!" }}
                      containerClassName="w-full"
                      errors={errors}
                    />
                    <LibSelect
                      id="category"
                      label="Category"
                      placeholder="Select category"
                      register={register}
                      options={categories?.map((el) => ({
                        ...el,
                        label: el.title,
                      }))}
                      onChange={(val) => setValue("category", val)}
                    />
                    <InputSelect
                      register={register}
                      id="type"
                      label="Property type"
                      errors={errors}
                      placeholder="Select property type"
                      options={[
                        { title: "Sale", value: "1" },
                        { title: "Rental", value: "2" },
                      ]}
                      selectClassName="text-gray-500 py-2 px-2"
                    />
                  </div>
                  <div className="w-1/2">
                    <InputFileV3
                      title="Avatar"
                      id="avatar"
                      setValue={setValue}
                      errors={errors}
                      register={register}
                      getValues={getValues}
                      validate={{ required: "This field can't be empty!" }}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          {activeStep === 1 && (
            <Fragment>
              <LibSelect
                id="province"
                label="Province"
                placeholder="Select province"
                register={register}
                options={categories?.map((el) => ({
                  ...el,
                  label: el.title,
                }))}
                onChange={(val) => setValue("province", val)}
              />
              <LibSelect
                id="city"
                label="City"
                placeholder="Select city"
                register={register}
                options={cities?.map((el) => ({
                  ...el,
                  label: el.name,
                }))}
                onChange={(val) => setValue("category", val)}
              />
            </Fragment>
          )}{" "}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                mr: 1,
                color: activeStep === 1 ? "blue" : "inherit", // Change color on the second step
              }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <div className="bg-main-500 rounded-md px-2 hover:bg-opacity-20">
              <Button
                type="submit"
                sx={{ color: "white" }} // Set text color to white
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default StepperAddProperty;
