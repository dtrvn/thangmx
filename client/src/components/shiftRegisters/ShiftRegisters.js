import React, { Fragment, useState, useEffect, createElement } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { getAllShifts } from "../../actions/shift";
import { getAllBranchs } from "../../actions/branch";
import { getAllUsers } from "../../actions/user";
import { getPersonInShift, getPreWeekPersonInShift, deletePersonInShift } from "../../actions/personInShift";
import { getShiftRegisters, deleteShiftRegisterNextWeek } from "../../actions/shiftRegister";
import { getNextWeekActive, addNextWeekActive, deleteNextWeekActive } from "../../actions/nextWeekActive";
import { getAllJobs } from "../../actions/job";
import { getAllTypeUsers } from "../../actions/typeUser";
import TabContent from "./TabContent";
import { addUpdateShiftRegisterManager, getShiftRegisterManagers } from "../../actions/shiftRegisterManager";
import Spinner from "../layout/Spinner";
import { setAlert } from "../../actions/alert";

const ShiftRegisters = ({
  getAllShifts,
  getAllUsers,
  getAllBranchs,
  getAllJobs,
  getAllTypeUsers,
  getPersonInShift,
  getPreWeekPersonInShift,
  deletePersonInShift,
  getShiftRegisters,
  deleteShiftRegisterNextWeek,
  getNextWeekActive,
  addNextWeekActive,
  deleteNextWeekActive,
  getShiftRegisterManagers,
  user: { users },
  auth: { user },
  shift: { shifts },
  branch: { branchs },
  job: { jobs },
  typeUser: { typeUsers },
  personInShift: { personInShifts, personInShiftsPrevWeek },
  shiftRegister: { shiftRegisters },
  shiftRegisterManager: { shiftRegisterManagers },
  nextWeekActive: { nextWeekDB },
  history,
  setAlert,
}) => {
  let branchId = null;

  const [activeTab, setActiveTab] = useState(0);
  const [hiddenButton, setHiddenButton] = useState(0);
  const [hiddenButtonAddNexWeek, setHiddenButtonAddNexWeek] = useState(1);
  const [hiddenButtonDeleteNexWeek, setHiddenButtonDeleteNexWeek] = useState(1);

  // const [currentWeek, setCurrentWeek] = useState({
  //   firstdayOfCurrentWeek: moment().startOf("isoWeek"),
  //   lastdayOfCurrentWeek: moment().startOf("isoWeek").add(6, "days"),
  // });

  const [createDate, setCreateDate] = useState({
    firstdayOfThisWeek: moment().startOf("isoWeek"),
    lastdayOfThisWeek: moment().startOf("isoWeek").add(6, "days"),
    monday: moment().startOf("isoWeek"),
    tuesday: moment().startOf("isoWeek").add(1, "days"),
    wednesday: moment().startOf("isoWeek").add(2, "days"),
    thursday: moment().startOf("isoWeek").add(3, "days"),
    friday: moment().startOf("isoWeek").add(4, "days"),
    saturday: moment().startOf("isoWeek").add(5, "days"),
    sunday: moment().startOf("isoWeek").add(6, "days"),
  });


  useEffect(() => {
    console.log("lan 3");
    getAllShifts();
    getAllUsers();
    getAllBranchs();
    getAllJobs();
    getAllTypeUsers();
    getNextWeekActive();
    // getPersonInShift(moment(createDate.firstdayOfThisWeek).format('MM-DD-YYYY'), moment(createDate.lastdayOfThisWeek).format('MM-DD-YYYY'));
  }, [getAllShifts, getAllUsers, getAllBranchs, getAllJobs, getNextWeekActive, getAllTypeUsers]);

  // useEffect(() => {
  //   if (branchs.length >= 0) {
  //     setRunTabContentAgain(runTabContentAgain + 1);
  //   }
  // }, [branchs]);


  useEffect(() => {
    console.log("lan 4");
    if (nextWeekDB) {
      if (moment().startOf("isoWeek").format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).format('MM-DD-YYYY')) {
        setHiddenButton(1);
        if (user && user.roles === "Admin") {
          setHiddenButtonAddNexWeek(0);
          setHiddenButtonDeleteNexWeek(1);
        }
      } else {
        setHiddenButton(0);
        if (user && user.roles === "Admin") {
          setHiddenButtonAddNexWeek(1);
          setHiddenButtonDeleteNexWeek(1);
        }
      }
      // if (user && user.roles === "Admin") {
      //   if (moment().startOf("isoWeek").format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).subtract(7, "days").format('MM-DD-YYYY')) {
      //     setHiddenButtonDeleteNexWeek(0);
      //   }
      // }
    }
  }, [nextWeekDB, user]);

  // useEffect(() => {
  //   branchs.map((ele, idx) => {
  //     if (idx === activeTab) {
  //       return branchId = ele._id
  //     }
  //   });
  // getPreWeekPersonInShift(branchId, moment(createDate.firstdayOfThisWeek).subtract(7, "days").format('MM-DD-YYYY'), moment(createDate.lastdayOfThisWeek).subtract(7, "days").format('MM-DD-YYYY'));
  // getPersonInShift(branchId, moment(createDate.firstdayOfThisWeek).format('MM-DD-YYYY'), moment(createDate.lastdayOfThisWeek).format('MM-DD-YYYY'));
  // getShiftRegisters(branchId, moment(createDate.firstdayOfThisWeek).format('MM-DD-YYYY'), moment(createDate.lastdayOfThisWeek).format('MM-DD-YYYY'));
  // getShiftRegisterManagers(branchId, moment(createDate.firstdayOfThisWeek).format('MM-DD-YYYY'), moment(createDate.lastdayOfThisWeek).format('MM-DD-YYYY'));
  // }, [branchs]);

  const onPrevWeek = () => {
    const currentFirstWeek = createDate.firstdayOfThisWeek.subtract(7, "days");
    const currentLastWeek = createDate.lastdayOfThisWeek.subtract(7, "days");

    const mondayCurrent = currentFirstWeek;
    const tuesdayCurrent = currentFirstWeek.clone().add(1, "days");
    const wednesdayCurrent = currentFirstWeek.clone().add(2, "days");
    const thursdayCurrent = currentFirstWeek.clone().add(3, "days");
    const fridayCurrent = currentFirstWeek.clone().add(4, "days");
    const saturdayCurrent = currentFirstWeek.clone().add(5, "days");
    const sundayCurrent = currentLastWeek;

    setCreateDate({
      ...createDate,
      firstdayOfThisWeek: currentFirstWeek,
      lastdayOfThisWeek: currentLastWeek,
      monday: mondayCurrent,
      tuesday: tuesdayCurrent,
      wednesday: wednesdayCurrent,
      thursday: thursdayCurrent,
      friday: fridayCurrent,
      saturday: saturdayCurrent,
      sunday: sundayCurrent,
    });
    if (moment(currentFirstWeek).format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).format('MM-DD-YYYY')) {
      setHiddenButton(1);
      if (user && user.roles === "Admin") {
        setHiddenButtonAddNexWeek(0);
        setHiddenButtonDeleteNexWeek(1);
      }
    } else {
      setHiddenButton(0);
      if (user && user.roles === "Admin") {
        setHiddenButtonAddNexWeek(1);
        setHiddenButtonDeleteNexWeek(1);
      }
    }
    // if (user && user.roles === "Admin") {
    //   if (moment().startOf("isoWeek").format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).subtract(7, "days").format('MM-DD-YYYY')) {
    //     setHiddenButtonDeleteNexWeek(0);
    //   }
    // }
  };

  const onNextWeek = () => {
    const currentFirstWeek = createDate.firstdayOfThisWeek.add(7, "days");
    const currentLastWeek = createDate.lastdayOfThisWeek.add(7, "days");

    const mondayCurrent = currentFirstWeek;
    const tuesdayCurrent = currentFirstWeek.clone().add(1, "days");
    const wednesdayCurrent = currentFirstWeek.clone().add(2, "days");
    const thursdayCurrent = currentFirstWeek.clone().add(3, "days");
    const fridayCurrent = currentFirstWeek.clone().add(4, "days");
    const saturdayCurrent = currentFirstWeek.clone().add(5, "days");
    const sundayCurrent = currentLastWeek;

    setCreateDate({
      ...createDate,
      firstdayOfThisWeek: currentFirstWeek,
      lastdayOfThisWeek: currentLastWeek,
      monday: mondayCurrent,
      tuesday: tuesdayCurrent,
      wednesday: wednesdayCurrent,
      thursday: thursdayCurrent,
      friday: fridayCurrent,
      saturday: saturdayCurrent,
      sunday: sundayCurrent,
    });
    if (moment(currentFirstWeek).format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).format('MM-DD-YYYY')) {
      setHiddenButton(1);
      if (user && user.roles === "Admin") {
        // if (moment(currentFirstWeek).format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).subtract(7, "days").format('MM-DD-YYYY')) {
        //   setHiddenButtonAddNexWeek(0);
        // } else {
        //   setHiddenButtonAddNexWeek(1);
        // }
        // setHiddenButtonDeleteNexWeek(1);
        if (moment().startOf("isoWeek").format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).subtract(7, "days").format('MM-DD-YYYY')) {
          setHiddenButtonAddNexWeek(1);
          setHiddenButtonDeleteNexWeek(0);
        } else {
          setHiddenButtonAddNexWeek(0);
          setHiddenButtonDeleteNexWeek(1);
        }


        // setHiddenButtonAddNexWeek(0);
        // setHiddenButtonDeleteNexWeek(1);
      }
    } else {
      setHiddenButton(0);
      if (user && user.roles === "Admin") {
        setHiddenButtonAddNexWeek(1);
        setHiddenButtonDeleteNexWeek(1);
      }
    }
    // if (user && user.roles === "Admin") {
    //   if (moment().startOf("isoWeek").format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).subtract(7, "days").format('MM-DD-YYYY')) {
    //     setHiddenButtonDeleteNexWeek(0);
    //   }
    // }
  };

  const onCurrentWeek = () => {

    const currentFirstWeek = moment().startOf("isoWeek");
    const currentLastWeek = moment().startOf("isoWeek").add(6, "days");
    if (moment(currentFirstWeek).format('MM-DD-YYYY') !== moment(createDate.firstdayOfThisWeek).format('MM-DD-YYYY')) {
      const mondayCurrent = currentFirstWeek;
      const tuesdayCurrent = currentFirstWeek.clone().add(1, "days");
      const wednesdayCurrent = currentFirstWeek.clone().add(2, "days");
      const thursdayCurrent = currentFirstWeek.clone().add(3, "days");
      const fridayCurrent = currentFirstWeek.clone().add(4, "days");
      const saturdayCurrent = currentFirstWeek.clone().add(5, "days");
      const sundayCurrent = currentLastWeek;

      setCreateDate({
        ...createDate,
        firstdayOfThisWeek: currentFirstWeek,
        lastdayOfThisWeek: currentLastWeek,
        monday: mondayCurrent,
        tuesday: tuesdayCurrent,
        wednesday: wednesdayCurrent,
        thursday: thursdayCurrent,
        friday: fridayCurrent,
        saturday: saturdayCurrent,
        sunday: sundayCurrent,
      });
      if (moment(currentFirstWeek).format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).format('MM-DD-YYYY')) {
        setHiddenButton(1);
        if (user && user.roles === "Admin") {
          setHiddenButtonAddNexWeek(0);
          setHiddenButtonDeleteNexWeek(1);
        }
      } else {
        setHiddenButton(0);
        if (user && user.roles === "Admin") {
          setHiddenButtonAddNexWeek(1);
          setHiddenButtonDeleteNexWeek(1);
        }
      }
    }
    // if (user && user.roles === "Admin") {
    //   if (moment().startOf("isoWeek").format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).subtract(7, "days").format('MM-DD-YYYY')) {
    //     setHiddenButtonDeleteNexWeek(0);
    //   }
    // }
  };

  const {
    firstdayOfThisWeek,
    lastdayOfThisWeek,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = createDate;

  let elmShiftsTable = shifts.map((ele) => <td colspan="1">{ele.shiftName}</td>);
  let elmShifts = shifts.map((ele) => <div className="Rtable-cell--content boder-cell">{ele.shiftName}</div>);

  let shiftsSize = shifts.length;
  let shiftsArray = [];
  shifts.map((ele) => shiftsArray.push(ele._id));

  let getUsers = users.filter((ele) => ele.roles === "User");

  let elmUsers = getUsers.map((ele, index) => (
    <tr>
      <td colspan="3">{ele.name}</td>
      <td colspan="3"></td>
      <td colspan="3"></td>
      <td colspan="3"></td>
      <td colspan="3"></td>
      <td colspan="3"></td>
      <td colspan="3"></td>
      <td colspan="3"></td>
    </tr>
  ));

  const types = branchs.map((branch) => branch.branchAddress);

  const onAddNextWeekActive = () => {
    const data = {
      currentFirstWeek: moment().startOf("isoWeek").add(7, "days").format('MM-DD-YYYY'),
      currentLastWeek: moment().startOf("isoWeek").add(13, "days").format('MM-DD-YYYY')
    }
    addNextWeekActive(data, history);
  }

  const onDeleteNextWeekActive = () => {
    deleteNextWeekActive(nextWeekDB._id);
    deletePersonInShift(branchs[activeTab]._id, moment(createDate.firstdayOfThisWeek).format('MM-DD-YYYY'), moment(createDate.lastdayOfThisWeek).format('MM-DD-YYYY'));
    deleteShiftRegisterNextWeek(branchs[activeTab]._id, moment(createDate.firstdayOfThisWeek).format('MM-DD-YYYY'), moment(createDate.lastdayOfThisWeek).format('MM-DD-YYYY'));
    if (moment(createDate.firstdayOfThisWeek).format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).format('MM-DD-YYYY')) {
      onPrevWeek();
    }
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 m-t-30">
          <div className="card">
            <div className="card-header bg-info">
              <h4 class="m-b-0 text-white">Đăng ký ca</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  Tuần: <Moment format="DD/MM/YYYY">{firstdayOfThisWeek}</Moment>
                  {" - "}
                  <Moment format="DD/MM/YYYY">{lastdayOfThisWeek}</Moment>
                </div>
                <div className="col-md-9">
                  <button
                    types="button"
                    class="btn btn-sm btn-info"
                    // style={{ marginLeft: "100px" }}
                    onClick={() => onPrevWeek()}
                  >
                    <i className="ti-control-backward"></i>{"  "}<span className="hide-sm">Tuần trước</span>
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-info"
                    onClick={() => onCurrentWeek()}
                  >
                    <i className="ti-shine"></i>{"  "}<span className="hide-sm">Tuần hiện tại</span>
                  </button>
                  {hiddenButton === 1 ? "" :
                    (
                      <button
                        type="button"
                        class="btn btn-sm btn-info"
                        onClick={() => onNextWeek()}
                      >
                        <i className="ti-control-forward"></i>{"  "}<span className="hide-sm">Tuần tới</span>
                      </button>
                    )}
                  {hiddenButtonAddNexWeek === 1 ? "" :
                    (
                      <button
                        type="button"
                        class="btn btn-sm btn-info"
                        onClick={() => onAddNextWeekActive()}
                      >
                        Tạo tuần tiếp theo
                      </button>
                    )}
                  {hiddenButtonDeleteNexWeek === 1 ? "" :
                    (
                      <button
                        type="button"
                        class="btn btn-sm btn-info"
                        onClick={() => onDeleteNextWeekActive()}
                      >
                        Xoá tạo tuần tiếp theo
                      </button>
                    )}
                  {/* <button
                    type="button"
                    class="btn btn-sm btn-info"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    Tạo ca làm
                  </button> */}
                  {/* <button
                    type="button"
                    class="btn btn-sm btn-info"
                    onClick={() => setAlert("Kiểm tra chức năng", "success")}
                  >
                    Kiểm tra Alert
                  </button> */}
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  {/* Nav tabs */}
                  <ul className="nav nav-tabs customtab2" role="tablist">
                    {/* {types.map((branch, idx) => (
                      <li className="nav-item"> <a className={`nav-link ${idx === activeTab ? "active" : ""}`}
                        data-toggle="tab" href={`#${branch}`} role="tab" onClick={() => setActiveTab(idx)}>
                        <span className="hidden-sm-up"><i className="ti-home" /></span>
                        <span className="hidden-xs-down">{branch}</span></a> </li>
                    ))} */}
                    {branchs.map((branch, idx) => (
                      <li className="nav-item"> <a className={`nav-link ${idx === activeTab ? "active" : ""}`}
                        data-toggle="tab" href={`#${branch.branchAddress}`} role="tab" onClick={() => setActiveTab(idx)}>
                        <span className="hidden-sm-up"><i className="ti-home" /></span>
                        <span className="hidden-xs-down">{branch.branchAddress}</span></a> </li>
                    ))}

                  </ul>
                  {/* Tab panes */}
                  <div className="tab-content">
                    <TabContent
                      key={monday}
                      branchTabName={types[activeTab]}
                      activeTab={activeTab}
                      startDate={firstdayOfThisWeek}
                      endDate={lastdayOfThisWeek}
                      monday={monday}
                      tuesday={tuesday}
                      wednesday={wednesday}
                      thursday={thursday}
                      friday={friday}
                      saturday={saturday}
                      sunday={sunday}
                      shifts={shifts}
                      branchs={branchs}
                      typeUsers={typeUsers}
                      users={users}
                      userLogin={user}
                      jobs={jobs} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    //   )}
    // </Fragment>
  );
};

ShiftRegisters.propTypes = {
  getAllShifts: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getPersonInShift: PropTypes.func.isRequired,
  getPreWeekPersonInShift: PropTypes.func.isRequired,
  getAllBranchs: PropTypes.func.isRequired,
  getAllJobs: PropTypes.func.isRequired,
  getAllTypeUsers: PropTypes.func.isRequired,
  getShiftRegisters: PropTypes.func.isRequired,
  getNextWeekActive: PropTypes.func.isRequired,
  addNextWeekActive: PropTypes.func.isRequired,
  deleteNextWeekActive: PropTypes.func.isRequired,
  getShiftRegisterManagers: PropTypes.func.isRequired,
  deletePersonInShift: PropTypes.func.isRequired,
  deleteShiftRegisterNextWeek: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
  shift: state.shift,
  branch: state.branch,
  job: state.job,
  typeUser: state.typeUser,
  personInShift: state.personInShift,
  shiftRegister: state.shiftRegister,
  shiftRegisterManager: state.shiftRegisterManager,
  nextWeekActive: state.nextWeekActive,
});

export default connect(mapStateToProps, {
  getAllShifts,
  getAllUsers,
  getPersonInShift,
  getPreWeekPersonInShift,
  deletePersonInShift,
  getAllBranchs,
  getAllJobs,
  getAllTypeUsers,
  getShiftRegisters,
  deleteShiftRegisterNextWeek,
  getNextWeekActive,
  addNextWeekActive,
  deleteNextWeekActive,
  getShiftRegisterManagers,
  setAlert
})(ShiftRegisters);
