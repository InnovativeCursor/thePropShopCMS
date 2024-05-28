import { connect } from "react-redux";
import "./App.css";
import Navigation from "./Navigation/Navigation";
import { Spin } from "antd";
import { useEffect } from "react";

function App(props) {
  //Clearing localstorage after shutting the browser or tab window..
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.clear();
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return (
    <>
      <Spin
        spinning={props?.loading == undefined ? false : props?.loading}
        size="large"
        tip="Powered by Innovative Cursor"
      >
        <Navigation />
      </Spin>
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: () => dispatch({ type: "LOGGEDIN" }),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.loadingReducer?.loading,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
