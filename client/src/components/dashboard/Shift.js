import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { deleteShift, getAllShifts, getShiftForBranch } from "../../actions/shift";
import AddShiftForm from "../shift-forms/AddShiftForm";
import EditShiftForm from "../shift-forms/EditShiftForm";
import Moment from "react-moment";

const Shift = ({ deleteShift, getAllShifts, shift: { shifts, shift }, match }) => {
  const initialFormState = { id: null, shiftName: "", shiftTime: "" };

  // Setting state
  const [currentShift, setCurrentShift] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getAllShifts();
  }, [getAllShifts]);

  const editShift = (shift) => {
    setEditing(true);

    setCurrentShift({
      id: shift._id,
      shiftName: shift.shiftName,
      shiftTime: shift.shiftTime,
      time: shift.time,
    });
  };

  const listShifts = shifts.map((shift) => (
    <tr key={shift._id}>
      <td>{shift.shiftName}</td>
      <td>{shift.shiftTime}</td>
      <td>{shift.time}</td>
      <td>{shift.shiftTime}</td>
      <td><Moment format="DD/MM/YYYY">{shift.date}</Moment></td>
      <td>
        <button onClick={() => editShift(shift)} className="btn btn-success"><i class="far fa-edit"></i>
          <span className="hide-sm"> Sửa</span>
        </button>
        <button
          onClick={() => deleteShift(shift._id)}
          className="btn btn-danger"
        ><i class="fas fa-trash-alt"></i>
          <span className="hide-sm"> Xóa</span>
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <div className="col-12 m-t-30">
        <div className="card">
          <div className="card-header bg-info">
            <h4 class="m-b-0 text-white">Điều chỉnh ca</h4>
          </div>
          <div className="card-body">
            <div className="row">
              {editing ? (
                <EditShiftForm
                  editing={editing}
                  setEditing={setEditing}
                  currentShift={currentShift}
                />
              ) : (
                <AddShiftForm />
              )}
              <div class="table-responsive">
                <table class="table color-table purple-table">

                  <thead>
                    <tr>
                      <th>Tên ca</th>
                      <th>Số giờ làm</th>
                      <th>Thời gian làm</th>
                      <th>Chi nhánh</th>
                      <th>Ngày sử dụng</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>{listShifts}</tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <Link className="btn btn-inverse waves-effect waves-light" to="/dashboard">
              Trở về
            </Link>
          </div>
        </div>
      </div>

      {/* {editing?(
      <EditShiftForm
      editing={editing}
      setEditing={setEditing}
      currentShift={currentShift}
      />
    ): (
      <AddShiftForm />
    )}
      <div class ="table-responsive">
      <table class ="table color-table purple-table">

      <thead>
      <tr>
      <th>Tên ca</th>
      <th>Số giờ làm</th>
      <th>Thời gian làm</th>
      <th>Chi nhánh</th>
      <th>Ngày sử dụng</th>
      <th>Hành động</th>
      </tr>
      </thead>
      <tbody>{listShifts}</tbody>
      </table>
      </div> */}
    </Fragment>
  );
};

Shift.propTypes = {
  getAllShifts: PropTypes.func.isRequired,
  deleteShift: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  shift: state.shift,
});

export default connect(mapStateToProps, { deleteShift, getAllShifts })(Shift);
