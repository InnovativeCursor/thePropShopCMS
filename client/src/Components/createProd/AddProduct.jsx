import React, { useState } from "react";
import PageWrapper from "../PageContainer/PageWrapper";
import { Form, Input, Spin, Checkbox, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [imageArray, setImageArray] = useState([]);

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const options = [
    {
      label: "Bar Area",
      value: "BarArea",
    },
    {
      label: "Hanging sign",
      value: "HangingSign",
    },
    {
      label: "LED Video Wall",
      value: "LEDWall",
    },
    {
      label: "Lounge Area",
      value: "LoungeArea",
    },
    {
      label: "Product Display",
      value: "ProductDisplay",
    },
    {
      label: "Reception Counter",
      value: "ReceptionCounter",
    },
    {
      label: "Semi Closed Meeting Area",
      value: "ClosedMeetingArea",
    },
    {
      label: "Storage Room",
      value: "StorageRoom",
    },
    {
      label: "Theatre Style Demo",
      value: "TheatreStyleDemo",
    },
    {
      label: "Touch Screen Kiosk",
      value: "TouchScreenKiosk",
    },
  ];
  return (
    <PageWrapper title={"Add Data"}>
      <div className="container mx-auto p-4 text-xl">
        <Spin spinning={loading}>
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  SKU
                </label>
                <Input
                  required
                  type="text"
                  id="sku"
                  name="sku"
                  className="mt-1 p-2 block w-full border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <Input
                  required
                  type="text"
                  id="productName"
                  name="productName"
                  className="mt-1 p-2 block w-full border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <select
                  required
                  size="large"
                  className="mt-1 p-2 block w-full border rounded-md"
                  name="Location"
                  id="Location"
                ></select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Booth Size
                </label>
                <select
                  required
                  size="large"
                  className="mt-1 p-2 block w-full border rounded-md"
                  name="BoothSize"
                  id="BoothSize"
                ></select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Budget
                </label>
                <select
                  required
                  size="large"
                  className="mt-1 p-2 block w-full border rounded-md"
                  name="Budget"
                  id="Budget"
                ></select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Closed Meeting Room
                </label>
                <select
                  required
                  size="large"
                  className="mt-1 p-2 block w-full border rounded-md"
                  name="ClosedMeetingRoom"
                  id="ClosedMeetingRoom"
                ></select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Demo Stations
                </label>
                <select
                  required
                  size="large"
                  className="mt-1 p-2 block w-full border rounded-md"
                  name="DemoStations"
                  id="DemoStations"
                ></select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Open Discussion Areas
                </label>
                <select
                  required
                  size="large"
                  className="mt-1 p-2 block w-full border rounded-md"
                  name="OpenDiscussionAreas"
                  id="OpenDiscussionAreas"
                ></select>
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
