import React, { useEffect, useState } from "react";
import GlobalForm from "../GlobalForm/GlobalForm";
import { Button, Table, message } from "antd";
import PageWrapper from "../PageContainer/PageWrapper";
import { deleteAxiosCall, getAxiosCall } from "../../Axios/UniversalAxiosCalls";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
  const inquiry_columns = [
    {
      title: "Inquiry_ID",
      dataIndex: "inquiry_id",
      key: "inquiry_id",
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_number",
      key: "mobile_number",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <Button onClick={() => deleteInquire(record.inquiry_id)}>Delete</Button>
      ),
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
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!props.filteredProducts) {
      fetchData();
    } else {
      setResult(props.filteredProducts);
    }
  }, [props]);

  const fetchData = async () => {
    try {
      if (props.type === "Awards") {
        const result = await getAxiosCall("/getAward");
        setResult(result.data);
      }
      if (props.type === "Inquiries") {
        const result = await getAxiosCall("/fetchInquiries");
        setResult(result.data);
      } else {
        const result = await getAxiosCall("/products");
        setResult(result.data.products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteInquire = async (id) => {
    try {
      const remove = await deleteAxiosCall("/deleteInquiry", id);
      if (remove) {
        Swal.fire({
          title: "Success",
          text: remove?.message,
          icon: "success",
          confirmButtonText: "Great!",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
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

  const renderTable = () => {
    switch (props.type) {
      case "Awards":
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
      case "Inquiries":
        return (
          <PageWrapper title={`${props.pageMode}`}>
            <Table
              columns={inquiry_columns}
              dataSource={result}
              size="large"
              onRow={(record) => ({})}
              scroll={{ x: 1000, y: 1500 }}
            />
          </PageWrapper>
        );
      default:
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

  return <>{renderTable()}</>;
}

export default ProductTable;
