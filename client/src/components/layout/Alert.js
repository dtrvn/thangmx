import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {

  // const [closeNotification, setCloseNotification] = useState("block");

  // useEffect(() => {
  //   setCloseNotification("block");
  // }, [alerts]);

  let elmNotifi = [];
  if (alerts != null && alerts.length > 0) {
    alerts.map((alert) => {
      elmNotifi.push(
        <div key={alert.id} className={`jq-toast-single jq-has-icon jq-icon-${alert.alertType}`} style={{ textAlign: 'left', display: 'block' }}>
          {/* <span className="jq-toast-loader jq-toast-loaded" style={{ WebkitTransition: 'width 3.1s ease-in', OTransition: 'width 3.1s ease-in', transition: 'width 3.1s ease-in', backgroundColor: '#ff6849' }} /> */}
          {/* <span className="close-jq-toast-single" onClick={() => setCloseNotification("none")}>×</span> */}
          <h2 className="jq-toast-heading">{alert.msg}</h2>
        </div>
      );
    })
  }

  return (
    // alerts != null &&
    // alerts.length > 0 &&
    // alerts.map((alert) => (
    //   // <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    //   //   {alert.msg}
    //   // </div>
    //   <div className="jq-toast-wrap">
    //     <div key={alert.id} className={`jq-toast-single jq-has-icon jq-icon-${alert.alertType}`} style={{ textAlign: 'left', display: closeNotification }}>
    //       <span className="jq-toast-loader jq-toast-loaded" style={{ WebkitTransition: 'width 3.1s ease-in', OTransition: 'width 3.1s ease-in', transition: 'width 3.1s ease-in', backgroundColor: '#ff6849' }} />
    //       <span className="close-jq-toast-single" onClick={() => setCloseNotification("none")}>×</span>
    //       <h2 className="jq-toast-heading">{alert.msg}</h2>
    //     </div>
    //   </div>
    // ))
    <div className="jq-toast-wrap top-right">
      {elmNotifi}
    </div>
  )
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
