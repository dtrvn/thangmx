import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AlertShiftRegister = ({ alertModals }) =>
  alertModals != null &&
  alertModals.length > 0 &&
  alertModals.map((alertShiftRegister) => (
    <div key={alertShiftRegister.id} className={`alert alert-${alertShiftRegister.alertType}`}>
      {alertShiftRegister.msg}
    </div>
  ));

AlertShiftRegister.propTypes = {
  alertModals: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alertModals: state.alertShiftRegister,
});

export default connect(mapStateToProps)(AlertShiftRegister);
