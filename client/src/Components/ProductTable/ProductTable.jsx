import React, { useEffect, useState } from "react";
import GlobalForm from "../GlobalForm/GlobalForm";
import { Table } from "antd";
import PageWrapper from "../PageContainer/PageWrapper";
import { getAxiosCall } from "../../Axios/UniversalAxiosCalls";
import { useNavigate } from "react-router-dom";

function ProductTable(props) {
  const columns = [
    {
      title: "Prd ID",
      dataIndex: "prd_id",
      key: "prd_id",
      fixed: "left",
    },
    {
      title: "Exhibition Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Booth Size",
      dataIndex: "booth_size",
      key: "booth_size",
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
    },
  ];
  const award_columns = [
    {
      title: "Award Id",
      dataIndex: "award_id",
      key: "award_id",
      fixed: "left",
    },
    {
      title: "Award Year",
      dataIndex: "award_year",
      key: "award_year",
    },
    {
      title: "Award Title",
      dataIndex: "award_title",
      key: "award_title",
    },
  ];
  const [result, setResult] = useState(null);
  const [switchRoutes, setSwitchRoutes] = useState(false);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!props.filteredProducts) {
      answer();
    } else {
      setResult(props?.filteredProducts);
    }
  }, [props?.filteredProducts]);
  const answer = async () => {
    const result = await getAxiosCall("/products");
    setResult(result?.data?.products);
  };

  const renderContent = () => {
    if (props.type === "Awards") {
      return (
        <PageWrapper title={`${props.pageMode} Award`}>
          <Table
            columns={award_columns}
            dataSource={result}
            size="large"
            onRow={(record) => ({
              onClick: () => {
                navigateTo(
                  props.pageMode === "Delete"
                    ? "/deleteawardinner"
                    : "/updateawardinner",
                  { state: record }
                );
              },
            })}
            scroll={{ x: 1000, y: 1500 }}
          />
        </PageWrapper>
      );
    } else if (props.type === "Inquiries") {
      return (
        <PageWrapper title={`${props.pageMode}`}>
          {/* Additional logic for Inquiries can go here */}
        </PageWrapper>
      );
    } else {
      return (
        <PageWrapper title={`${props.pageMode} Products`}>
          <Table
            columns={columns}
            dataSource={result}
            size="large"
            onRow={(record) => ({
              onClick: () => {
                navigateTo(
                  props.pageMode === "View"
                    ? "/viewinner"
                    : props.pageMode === "Delete"
                    ? "/deleteinner"
                    : "/updateinner",
                  { state: record }
                );
              },
            })}
            scroll={{ x: 1000, y: 1500 }}
          />
        </PageWrapper>
      );
    }
  };

  return <>{renderContent()}</>;
}
export default ProductTable;
