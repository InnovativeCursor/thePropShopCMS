import React, { useEffect, useState } from "react";
import PageWrapper from "../PageContainer/PageWrapper";
import { Form, Input, Spin, Checkbox, Upload, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import Creatable from "react-select/creatable";
import Swal from "sweetalert2";
import { getAxiosCall, postAxiosCall } from "../../Axios/UniversalAxiosCalls";
import { useNavigate } from "react-router-dom";
import GlobalForm from "../GlobalForm/GlobalForm";

export default function AddProduct(props) {
  return <GlobalForm pageMode="Add" />;
}
