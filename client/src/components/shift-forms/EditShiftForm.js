import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addShift } from "../../actions/shift";

const EditShiftForm = ({
  addShift,
  editing,
  setEditing,
  currentShift,
  history,
}) => {
  const [formData, setFormData] = useState(currentShift);

  useEffect(() => {
    setFormData(currentShift);
  }, [currentShift]);

  const shiftName = formData.shiftName;
  const shiftTime = formData.shiftTime;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearForm = () => {
    setFormData({ ...formData, shiftName: "", shiftTime: "" });
    setEditing(false);
  };

  return (
    <Fragment>
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          addShift(formData, history, true);
          clearForm();
        }}
      >
        <div className="form-group add-flex" >
          <div class="col-md-4">
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
          <div class="col-md-4" >
            <input
              type="text"
              placeholder="* Thời gian làm"
              name="shiftTime"
              value={formData.shiftTime}
              onChange={(e) => onChange(e)}
              style={{ fontSize: '14px' }}
              required
            />
          </div>
          <div class="col-md-6" >
            <button type="submit" class="btn btn-info"><i class="fas fa-save"></i>
              <span className="hide-sm"> Lưu</span>
            </button>
            <button
              onClick={() => setEditing(false)}
              class="btn btn-warning"
            ><i class="fas fa-times"></i>
              <span className="hide-sm"> Hủy</span>
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
              <button
                onClick={() => setEditing(false)}
                class="btn btn-danger my-1"
              >
                Hủy bỏ
              </button>
            </td>
          </tbody>
        </table> */}
      </form>
    </Fragment>
  );
};

EditShiftForm.propTypes = {
  addShift: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
};

export default connect(null, { addShift })(withRouter(EditShiftForm));
