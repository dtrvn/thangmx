import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deletePermitShift, getAllPermitShifts } from "../../actions/permitShiftRegist";
import AddPermitShiftRegistForm from "../permitShiftRegist-forms/AddPermitShiftRegistForm";
import EditPermitShiftRegistForm from "../permitShiftRegist-forms/EditPermitShiftRegistForm";

const PermissionShiftRegist = ({ branchs, deletePermitShift, permitShiftRegist: { permitShiftRegists } }) => {
  const initialFormState = { id: null, branchName: "", shiftNoPermit: "" };

  // Setting state
  const [currentPermitShift, setCurrentPermitShift] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const editPermitShift = (permitShiftRegist) => {
    setEditing(true);

    setCurrentPermitShift({ id: permitShiftRegist._id, branchId: permitShiftRegist.branchId, shiftNoPermit: permitShiftRegist.shiftNoPermit });
  };

  const listPermitShifts = permitShiftRegists.map((per) => (
    <tr key={per._id}>
      <td>{branchs.find(({ _id }) => _id === per.branchId) ? branchs.find(({ _id }) => _id === per.branchId).branchName : ""}</td>
      <td>{per.shiftNoPermit}</td>
      <td>
        <button onClick={() => editPermitShift(per)} className="btn btn-success"><i class="far fa-edit"></i>
          <span className="hide-sm"> Sửa</span>
        </button>
        <button onClick={() => deletePermitShift(per._id)} className="btn btn-danger"><i class="fas fa-trash-alt"></i>
          <span className="hide-sm"> Xóa</span>
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      {editing ? (
        <EditPermitShiftRegistForm
          editing={editing}
          setEditing={setEditing}
          currentPermitShift={currentPermitShift}
          branchs={branchs}
        />
      ) : (
        <AddPermitShiftRegistForm branchs={branchs}/>
      )}
      <div class="table-responsive">
        <table class="table color-table info-table">
          <thead>
            <tr>
              <th>Tên chi nhánh</th>
              <th>Số ca được đăng kí</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{listPermitShifts}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

PermissionShiftRegist.propTypes = {
  branchs: PropTypes.object.isRequired,
  // getAllPermitShifts: PropTypes.func.isRequired,
  deletePermitShift: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  permitShiftRegist: state.permitShiftRegist,
});

export default connect(mapStateToProps, { deletePermitShift })(PermissionShiftRegist);
