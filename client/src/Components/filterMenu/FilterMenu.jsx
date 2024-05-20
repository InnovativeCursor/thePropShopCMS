import React, { useEffect, useState } from "react";
import PageWrapper from "../PageContainer/PageWrapper";
import { Checkbox, Form, InputNumber, Spin } from "antd";
import Select from "react-select";
import { getAxiosCall } from "../../Axios/UniversalAxiosCalls";

function FilterMenu() {
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
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({});
  const [checkboxValues, setCheckboxValues] = useState();
  const [locationOptions, setLocationOptions] = useState();
  const [boothSizeOptions, setBoothSizeOptions] = useState();
  const [budgetOptions, setBudgetOptions] = useState();
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
    setCheckboxValues(checkedValues);
    // Create an updated inputs object based on checkedValues
    const updatedInputs = options.reduce((acc, option) => {
      acc[option.value] = checkedValues.includes(option.value);
      return acc;
    }, {});
    setInputs((prevInputs) => ({
      ...prevInputs,
      ...updatedInputs,
    }));
  };
  return (
    <PageWrapper title="Filter Exhibitions">
      <div className="container mx-auto p-4 text-xl">
        <Spin spinning={loading}>
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location (City,Country)
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={true}
                  isSearchable={true}
                  name="location"
                  options={locationOptions?.length != 0 ? locationOptions : []}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Booth Size (For eg: 10X20)
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={true}
                  isSearchable={true}
                  name="location"
                  options={
                    boothSizeOptions?.length != 0 ? boothSizeOptions : []
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Budget Range (in US$)
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={true}
                  isSearchable={true}
                  name="location"
                  options={budgetOptions?.length != 0 ? budgetOptions : []}
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
                  value={inputs?.closed_meeting_room}
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
                  value={inputs?.demo_stations}
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
                  value={inputs?.open_discussion_area}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Filter by Functional Requirements
              </label>
              <br />
              <Checkbox.Group
                options={options}
                onChange={onChange}
                value={checkboxValues}
              />
              <br />
            </div>
            <div className="acitonButtons w-full flex justify-center">
              <button
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out items-center justify-center"
                type="submit"
              >
                Filter Data
              </button>
            </div>
          </Form>
        </Spin>
      </div>
    </PageWrapper>
  );
}

export default FilterMenu;
