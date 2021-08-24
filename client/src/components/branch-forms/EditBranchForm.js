import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBranch } from "../../actions/branch";

const EditBranchForm = ({
  addBranch,
  editing,
  setEditing,
  currentBranch,
  history,
}) => {
  const [formData, setFormData] = useState(currentBranch);

  useEffect(() => {
    setFormData(currentBranch);
  }, [currentBranch]);

  const branchName = formData.branchName;
  const branchAddress = formData.branchAddress;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearForm = () => {
    setFormData({ ...formData, branchName: "", branchAddress: "" });
    setEditing(false);
  };

  return (
    <Fragment>
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          addBranch(formData, history, true);
          clearForm();
        }}
      >
        <div className="form-group add-flex" >
          <div class="col-md-4">
            <input
              type="text"
              placeholder="* Tên chi nhánh"
              name="branchName"
              value={formData.branchName}
              onChange={(e) => onChange(e)}
              style={{ fontSize: '14px' }}
              required
            />

          </div>
          <div class="col-md-4" >
            <input
              type="text"
              placeholder="* Địa chỉ"
              name="branchAddress"
              value={formData.branchAddress}
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
                placeholder="* Tên chi nhánh"
                name="branchName"
                value={formData.branchName}
                onChange={(e) => onChange(e)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="* Địa chỉ"
                name="branchAddress"
                value={formData.branchAddress}
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

EditBranchForm.propTypes = {
  addBranch: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
};

export default connect(null, { addBranch })(withRouter(EditBranchForm));
