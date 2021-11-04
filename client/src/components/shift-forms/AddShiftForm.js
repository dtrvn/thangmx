import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addShift } from "../../actions/shift";

const AddShiftForm = ({ addShift, editing, currentShift, history }) => {
  const initialFormState = { id: null, shiftName: "", shiftTime: "", time: "" };

  const [formData, setFormData] = useState(initialFormState);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearForm = () => {
    setFormData({ ...formData, shiftName: "", shiftTime: "", time: "" });
  };

  return (
    <Fragment>
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          addShift(formData, history);
          clearForm();
        }}
      >
        <div className="form-group add-flex" >
          <div class="col-md-3">
            <input
              type="text"
              placeholder="* Tên ca"
              name="shiftName"
              value={formData.shiftName}
              onChange={(e) => onChange(e)}
              style={{ fontSize: '14px' }}
              required
            />

          </div>
          <div class="col-md-3" >
            <input
              type="text"
              placeholder="* Số giờ"
              name="shiftTime"
              value={formData.shiftTime}
              onChange={(e) => onChange(e)}
              style={{ fontSize: '14px' }}
              required
            />
          </div>
          <div class="col-md-3" >
            <input
              type="text"
              placeholder="* Thời gian làm"
              name="time"
              value={formData.time}
              onChange={(e) => onChange(e)}
              style={{ fontSize: '14px' }}
              required
            />
          </div>
          <div class="col-md-3" >
            <button type="submit" class="btn btn-info"><i class="fas fa-plus"></i>
              <span className="hide-sm"> Thêm</span>
            </button>
          </div>
        </div>
        {/* <table className="table">
          <tbody>
            <td>
              <input
                type="text"
                placeholder="* Tên ca"
                name="shiftName"
                value={formData.shiftName}
                onChange={(e) => onChange(e)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="* Thời gian làm"
                name="shiftTime"
                value={formData.shiftTime}
                onChange={(e) => onChange(e)}
                required
              />
            </td>
            <td>
              <button type="submit" class="btn btn-primary my-1">
                Lưu
              </button>
            </td>
          </tbody>
        </table> */}
      </form>
    </Fragment>
  );
};

AddShiftForm.propTypes = {
  addShift: PropTypes.func.isRequired,
};

export default connect(null, { addShift })(withRouter(AddShiftForm));
