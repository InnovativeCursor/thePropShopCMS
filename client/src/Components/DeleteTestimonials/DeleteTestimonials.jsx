import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GlobalForm from "../GlobalForm/GlobalForm";

function DeleteTestimonials() {
  const location = useLocation();
  const [record, setRecord] = useState(location.state);
  useEffect(() => {
    if (location?.state) {
      "Location state", location.state;
      let asd = { ...location.state };
      setRecord(asd);
    }
  }, [location]);
  return (
    <>
      {record ? (
        <GlobalForm pageMode="Delete" type="Testimonials" record={record} />
      ) : null}
    </>
  );
}

export default DeleteTestimonials;
