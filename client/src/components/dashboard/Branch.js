import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { deleteBranch, getAllBranchs } from "../../actions/branch";
import AddBranchForm from "../branch-forms/AddBranchForm";
import EditBranchForm from "../branch-forms/EditBranchForm";

const Branch = ({
  deleteBranch,
  getAllBranchs,
  branch: { branchs, branch },
}) => {
  const initialFormState = { id: null, branchName: "", branchAddress: "" };

  // Setting state
  const [currentBranch, setCurrentBranch] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const editBranch = (branch) => {
    setEditing(true);

    setCurrentBranch({
      id: branch._id,
      branchName: branch.branchName,
      branchAddress: branch.branchAddress,
    });
  };

  const listBranchs = branchs.map((branch) => (
    <tr key={branch._id}>
      <td>{branch.branchName}</td>
      <td>{branch.branchAddress}</td>
      <td>
        <button onClick={() => editBranch(branch)} className="btn btn-success"><i class="far fa-edit"></i>
          <span className="hide-sm"> Sửa</span>
        </button>
        <button
          onClick={() => deleteBranch(branch._id)}
          className="btn btn-danger"
        ><i class="fas fa-trash-alt"></i>
          <span className="hide-sm"> Xóa</span>
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      {editing ? (
        <EditBranchForm
          editing={editing}
          setEditing={setEditing}
          currentBranch={currentBranch}
        />
      ) : (
        <AddBranchForm />
      )}
      <div class="table-responsive">
        <table class="table color-table success-table">

          <thead>
            <tr>
              <th>Tên chi nhánh</th>
              <th>Địa chỉ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{listBranchs}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

Branch.propTypes = {
  getAllBranchs: PropTypes.func.isRequired,
  deleteBranch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  branch: state.branch,
});

export default connect(mapStateToProps, { deleteBranch, getAllBranchs })(
  Branch
);
