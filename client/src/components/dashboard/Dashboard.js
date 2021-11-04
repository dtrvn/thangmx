import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Job from "./Job";
import Branch from "./Branch";
import Shift from "./Shift";
import TypeUser from "./TypeUser";
import PermissionShiftRegist from "./PermissionShiftRegist";
import ChangePassForm from "../memberChange-forms/ChangePassForm";
import { getCurrentUser } from "../../actions/user";
import { getAllJobs } from "../../actions/job";
import { getAllBranchs } from "../../actions/branch";
import { getAllShifts } from "../../actions/shift";
import { getAllTypeUsers } from "../../actions/typeUser";
import { getAllUsers } from "../../actions/user";
import { getAllPermitShifts } from "../../actions/permitShiftRegist";

const Dashboard = ({
  getCurrentUser,
  getAllJobs,
  getAllBranchs,
  getAllShifts,
  getAllTypeUsers,
  getAllUsers,
  getAllPermitShifts,
  auth: { user },
  profile: { profile, loading },
  job: { jobs },
  branch: { branchs },
  typeUser: { typeUsers },
  permitShiftRegist: { permitShiftRegists },
}) => {
  useEffect(() => {
    // getCurrentUser();
    getAllJobs();
    getAllBranchs();
    getAllShifts();
    getAllTypeUsers();
    getAllUsers();
    getAllPermitShifts();
  }, [
    // getCurrentUser,
    getAllJobs,
    getAllBranchs,
    getAllShifts,
    getAllTypeUsers,
    getAllUsers,
    getAllPermitShifts,
  ]);

  const [displayChangePass, toggleChangePass] = useState(false);
  // const [displayChangeInfo, toggleChangeInfo] = useState(false);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 m-t-30">
          <div className="card">
            <div className="card-header bg-info">
              <h4 class="m-b-0 text-white">Thông tin</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h4 className="card-title">Chào mừng {user && user.name}</h4>
                  <p className="card-text p-header-home">Email: {user && user.email}</p>
                  <p className="card-text p-header-home">Số điện thoại: {user && user.phone}</p>
                  <p className="card-text p-header-home">Loại nhân viên: {" "}
                    {user && typeUsers.map((ele) =>
                      ele._id === user.typeUserId ? ele.typeUsername : ""
                    )}
                  </p>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={(e) => toggleChangePass(!displayChangePass)}
                  >
                    <i className="fas fa-key"></i> Đổi mật khẩu
                  </button>
                  <Link to={`/modifer-shift`} className="btn btn-success"
                    style={{ marginLeft: "10px" }}>
                    <i className="fas fa-users"></i> Điều chỉnh ca
                  </Link>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  {displayChangePass && <ChangePassForm />}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      <Fragment>
        {user && user.roles === "User" ? (
          ""
        ) : (
          <Fragment>
            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div className="card-header">
                    <h4 class="m-b-0">Công việc</h4>
                  </div>
                  <div class="card-body">
                    <Job />
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div className="card-header">
                    <h4 class="m-b-0">Chi nhánh</h4>
                  </div>
                  <div class="card-body">
                    <Branch />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div className="card-header">
                    <h4 class="m-b-0">Số ca được phép đăng kí</h4>
                  </div>
                  <div class="card-body">
                    <PermissionShiftRegist branchs={branchs} />
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div className="card-header">
                    <h4 class="m-b-0">Loại nhân viên</h4>
                  </div>
                  <div class="card-body">
                    <TypeUser />
                  </div>
                </div>
              </div>
            </div>
            {/* <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div className="card-header">
                    <h4 class="m-b-0">Ca làm việc</h4>
                  </div>
                  <div class="card-body">
                    <Shift />
                  </div>
                </div>
              </div>
            </div> */}
          </Fragment>
        )}
      </Fragment>
    </Fragment>
  );
};

Dashboard.propTypes = {
  // getCurrentUser: PropTypes.func.isRequired,
  getAllJobs: PropTypes.func.isRequired,
  getAllBranchs: PropTypes.func.isRequired,
  getAllShifts: PropTypes.func.isRequired,
  getAllTypeUsers: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getAllPermitShifts: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  job: state.job,
  branch: state.branch,
  shift: state.shift,
  typeUser: state.typeUser,
  permitShiftRegist: state.permitShiftRegist,
});

export default connect(mapStateToProps, {
  // getCurrentUser,
  getAllJobs,
  getAllBranchs,
  getAllShifts,
  getAllTypeUsers,
  getAllUsers,
  getAllPermitShifts,
})(Dashboard);
