import React, { useEffect, useState } from "react";
import PageWrapper from "../PageContainer/PageWrapper";
import { Form, Input, Spin, Checkbox, Upload, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import Creatable from "react-select/creatable";
import Swal from "sweetalert2";
import { getAxiosCall, postAxiosCall } from "../../Axios/UniversalAxiosCalls";
import { useNavigate } from "react-router-dom";

export default function AddProduct(props) {
  const [loading, setLoading] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [checkedValues, setCheckedValues] = useState();
  const [inputs, setInputs] = useState({});
  const [locationOptions, setLocationOptions] = useState();
  const [boothSizeOptions, setBoothSizeOptions] = useState();
  const [budgetOptions, setBudgetOptions] = useState();
  const NavigateTo = useNavigate();
  useEffect(() => {
    callingOptions();
  }, []);
  const callingOptions = async () => {
    const resLocation = await getAxiosCall("/locationOptions");
    if (resLocation) {
      const collection = resLocation.data?.map((el) => ({
        label: el,
        value: el,
      }));
      setLocationOptions(collection);
    }
    const resBooth = await getAxiosCall("/boothsizeOptions");
    if (resBooth) {
      const collection = resBooth.data?.map((el) => ({
        label: el,
        value: el,
      }));
      setBoothSizeOptions(collection);
    }
    const resBudget = await getAxiosCall("/budgetOptions");
    if (resBudget) {
      const collection = resBudget.data?.map((el) => ({
        label: el,
        value: el,
      }));
      setBudgetOptions(collection);
    }
  };
  const onChange = (checkedValues) => {
    const object = checkedValues.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setCheckedValues(object);

    console.log("checked = ", checkedValues);
  };
  const options = [
    {
      label: "Bar Area",
      value: "bar_area",
    },
    {
      label: "Hanging sign",
      value: "hanging_sign",
    },
    {
      label: "LED Video Wall",
      value: "led_video_wall",
    },
    {
      label: "Lounge Area",
      value: "longue_area",
    },
    {
      label: "Product Display",
      value: "product_display",
    },
    {
      label: "Reception Counter",
      value: "reception_counter",
    },
    {
      label: "Semi Closed Meeting Area",
      value: "semi_closed_meeting_area",
    },
    {
      label: "Storage Room",
      value: "storage_room",
    },
    {
      label: "Theatre Style Demo",
      value: "theatre_style_demo",
    },
    {
      label: "Touch Screen Kiosk",
      value: "touch_screen_kiosk",
    },
  ];
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const convertAllToBase64 = async () => {
    if (props.pageMode === "Add") {
      if (imageArray?.length != 0) {
        let B64Array = [];
        let asd;
        for (let i = 0; i < imageArray?.length; i++) {
          const base64String = await getBase64(imageArray[i]?.originFileObj);
          B64Array.push(base64String);
        }
        let dummyObj = { pictures: [...B64Array] };

        asd = Object.assign(inputs, { pictures: dummyObj?.pictures });
        setInputs({ ...inputs, pictures: asd });
      }
    } else {
      if (imageArray?.length != 0) {
        let B64Array = [];
        let asd;
        for (let i = 0; i < imageArray.length; i++) {
          const base64String = await getBase64(imageArray[i]?.originFileObj);
          B64Array.push(base64String);
        }
        let dummyObj = [...(inputs && inputs?.pictures)];

        dummyObj = [...dummyObj, ...B64Array];
        asd = Object.assign(inputs, { pictures: dummyObj });
        setInputs({ ...inputs, pictures: asd });
      }
    }
  };
  const submitForm = async () => {
    if (!inputs?.location || !inputs?.booth_size || !inputs?.budget) {
      Swal.fire({
        title: "error",
        text: "Location, Booth Size and Budget are mandatory fields",
        icon: "error",
        confirmButtonText: "Alright!",
        allowOutsideClick: false,
      });
      return;
    }
    try {
      if (imageArray.length == 0) {
        Swal.fire({
          title: "error",
          text: "Add at least one Picture to proceed!",
          icon: "error",
          confirmButtonText: "Alright!",
          allowOutsideClick: false,
        });
        return;
      }
      await convertAllToBase64();
      const mergedObject = Object.assign({}, inputs, checkedValues);
      setInputs(mergedObject);
      const answer = await postAxiosCall("/createproduct", mergedObject);
      if (answer) {
        Swal.fire({
          title: "Success",
          text: answer?.message,
          icon: "success",
          confirmButtonText: "Great!",
          allowOutsideClick: false,
        }).then(() => {
          window.location.reload(true);
        });
        setInputs({});
      }
    } catch (error) {
      Swal.fire({
        title: "error",
        text: error,
        icon: "error",
        confirmButtonText: "Alright!",
        allowOutsideClick: false,
      });
    }
  };
  return (
    <PageWrapper title={"Add Data"}>
      <div className="container mx-auto p-4 text-xl">
        <Spin spinning={loading}>
          <Form onFinish={submitForm}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <Input
                  required
                  type="text"
                  id="product_name"
                  name="product_name"
                  className="mt-1 p-2 block w-full border rounded-md"
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  value={inputs?.product_name}
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location (City,Country)
                </label>
                <Creatable
                  placeholder="Location"
                  required
                  isMulti={false}
                  onChange={(e) => {
                    setInputs({ ...inputs, location: e.value });
                  }}
                  isClearable
                  options={locationOptions?.length != 0 ? locationOptions : []}
                  isSearchable
                  value={{ label: inputs?.location, value: inputs?.location }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Booth Size (For eg: 10X20)
                </label>
                <Creatable
                  placeholder="Booth Size"
                  required
                  isMulti={false}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      booth_size: e.value?.toUpperCase(),
                    });
                  }}
                  isClearable
                  options={
                    boothSizeOptions?.length != 0 ? boothSizeOptions : []
                  }
                  isSearchable
                  value={{
                    label: inputs?.booth_size?.toUpperCase(),
                    value: inputs?.booth_size?.toUpperCase(),
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Budget Range (in US$)
                </label>
                <Creatable
                  placeholder="Budget"
                  required
                  isMulti={false}
                  onChange={(e) => {
                    setInputs({ ...inputs, budget: e.value?.toUpperCase() });
                  }}
                  isClearable
                  options={budgetOptions?.length != 0 ? budgetOptions : []}
                  isSearchable
                  value={{
                    label: inputs?.budget?.toUpperCase(),
                    value: inputs?.budget?.toUpperCase(),
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Closed Meeting Room
                </label>
                <InputNumber
                  size="large"
                  className="w-full rounded-md"
                  min={1}
                  max={10}
                  onChange={(e) => {
                    setInputs({ ...inputs, closed_meeting_room: e });
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Demo Stations
                </label>
                <InputNumber
                  size="large"
                  className="w-full rounded-md"
                  min={1}
                  max={10}
                  onChange={(e) => {
                    setInputs({ ...inputs, demo_stations: e });
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Open Discussion Areas
                </label>
                <InputNumber
                  size="large"
                  className="w-full rounded-md"
                  min={1}
                  max={10}
                  onChange={(e) => {
                    setInputs({ ...inputs, open_discussion_area: e });
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Filter by Functional Requirements
              </label>
              <br />
              <Checkbox.Group options={options} onChange={onChange} />
              <br />
            </div>
            <div className="my-5">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <TextArea
                required
                type="text"
                id="description"
                name="description"
                className="mt-1 p-2 block w-full border rounded-md"
              />
            </div>
            <div className="my-5">
              <label className="block text-sm font-medium text-gray-700">
                Upload Pictures
              </label>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                multiple={true}
                name="productImages"
                fileList={imageArray}
                maxCount={4}
                onChange={(e) => {
                  setImageArray(e.fileList);
                }}
              >
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </div>
            <div className="flex justify-center">
              <button class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out items-center justify-center">
                Add Data
              </button>
            </div>
          </Form>
        </Spin>
      </div>
    </PageWrapper>
  );
}
