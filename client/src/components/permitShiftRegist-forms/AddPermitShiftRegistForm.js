import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPermitShiftRegist } from "../../actions/permitShiftRegist";

const AddPermitShiftRegistForm = ({ addPermitShiftRegist, editing, currentPermitShift, history, branchs }) => {
  const initialFormState = { id: null, branchId: "", shiftNoPermit: "" };

  const [formData, setFormData] = useState(initialFormState);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearForm = () => {
    setFormData({ ...formData, branchId: "", shiftNoPermit: "" });
  };

  let elmBranchs = branchs.map((ele) => (
    <option value={ele._id}>{ele.branchName}</option>
  ));

  return (
    <Fragment>
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          if(!formData.branchId){
            formData.branchId = branchs[0]._id;
          }
          addPermitShiftRegist(formData, history);
          clearForm();
        }}
      >
        <div className="form-group add-flex" >
          <div class="col-md-4">
            {/* <input
              type="text"
              placeholder="* Tên chi nhánh"
              name="branchName"
              value={formData.branchName}
              onChange={(e) => onChange(e)}
              style={{ fontSize: '14px' }}
              required
            /> */}
            <select
              name="branchId"
              value={formData.branchId}
              onChange={(e) => onChange(e)}
              class="form-control custom-select"
            >
              {elmBranchs}
            </select>

          </div>
          <div class="col-md-4" >
            <input
              type="text"
              placeholder="* Số ca được đăng kí"
              name="shiftNoPermit"
              value={formData.shiftNoPermit}
              onChange={(e) => onChange(e)}
              style={{ fontSize: '14px' }}
              required
            />
          </div>
          <div class="col-md-6" >
            <button type="submit" class="btn btn-info"><i class="fas fa-plus"></i>
              <span className="hide-sm"> Thêm</span>
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

AddPermitShiftRegistForm.propTypes = {
  branchs: PropTypes.object.isRequired,
  addPermitShiftRegist: PropTypes.func.isRequired,
};

export default connect(null, { addPermitShiftRegist })(withRouter(AddPermitShiftRegistForm));
