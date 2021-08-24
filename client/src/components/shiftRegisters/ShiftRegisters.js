import React, { Fragment, useState, useEffect, createElement } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import Moment from "react-moment";
import moment from "moment";
import { getAllShifts } from "../../actions/shift";
import { getAllBranchs } from "../../actions/branch";
import { getAllUsers } from "../../actions/user";
import { getPersonInShift } from "../../actions/personInShift";
import PersonInShiftList from "./personInShifts/PersonInShiftList";
import { getShiftRegisters } from "../../actions/shiftRegister";
import { getNextWeekActive, addNextWeekActive, deleteNextWeekActive } from "../../actions/nextWeekActive";
import { getAllJobs } from "../../actions/job";
import { getAllTypeUsers } from "../../actions/typeUser";
import styled from 'styled-components';
import TabContent from "./TabContent";

const ShiftRegisters = ({
  setAlert,
  getAllShifts,
  getAllUsers,
  getAllBranchs,
  getAllJobs,
  getAllTypeUsers,
  getPersonInShift,
  getShiftRegisters,
  getNextWeekActive,
  addNextWeekActive,
  deleteNextWeekActive,
  user: { users },
  auth: { user },
  shift: { shifts },
  branch: { branchs },
  job: { jobs },
  typeUser: { typeUsers },
  personInShift: { personInShifts },
  shiftRegister: { shiftRegisters },
  nextWeekActive: { nextWeekDB },
  history,
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
    getAllShifts();
    getAllUsers();
    getAllBranchs();
    getAllJobs();
    getAllTypeUsers();
    getNextWeekActive();
    // getPersonInShift(moment(createDate.firstdayOfThisWeek).format('MM-DD-YYYY'), moment(createDate.lastdayOfThisWeek).format('MM-DD-YYYY'));
  }, [getAllShifts, getAllUsers, getAllBranchs, getAllJobs, getNextWeekActive, getAllTypeUsers]);

  useEffect(() => {

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
      if (user && user.roles === "Admin") {
        if (moment().startOf("isoWeek").format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).subtract(7, "days").format('MM-DD-YYYY')) {
          setHiddenButtonDeleteNexWeek(0);
        }
      }
    }

  }, [nextWeekDB]);

  useEffect(() => {
    branchs.map((ele, idx) => {
      if (idx === activeTab) {
        return branchId = ele._id
      }
    });
    getPersonInShift(branchId, moment(createDate.firstdayOfThisWeek).format('MM-DD-YYYY'), moment(createDate.lastdayOfThisWeek).format('MM-DD-YYYY'));
    getShiftRegisters(branchId, moment(createDate.firstdayOfThisWeek).format('MM-DD-YYYY'), moment(createDate.lastdayOfThisWeek).format('MM-DD-YYYY'));
  }, [branchs]);

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
    if (user && user.roles === "Admin") {
      if (moment().startOf("isoWeek").format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).subtract(7, "days").format('MM-DD-YYYY')) {
        setHiddenButtonDeleteNexWeek(0);
      }
    }
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
        if (moment(currentFirstWeek).format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).subtract(7, "days").format('MM-DD-YYYY')) {
          setHiddenButtonAddNexWeek(0);
        } else {
          setHiddenButtonAddNexWeek(1);
        }
        setHiddenButtonDeleteNexWeek(1);
      }
    } else {
      setHiddenButton(0);
      if (user && user.roles === "Admin") {
        setHiddenButtonAddNexWeek(1);
        setHiddenButtonDeleteNexWeek(1);
      }
    }
    if (user && user.roles === "Admin") {
      if (moment().startOf("isoWeek").format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).subtract(7, "days").format('MM-DD-YYYY')) {
        setHiddenButtonDeleteNexWeek(0);
      }
    }
  };

  const onCurrentWeek = () => {
    const currentFirstWeek = moment().startOf("isoWeek");
    const currentLastWeek = moment().startOf("isoWeek").add(6, "days");

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
    if (user && user.roles === "Admin") {
      if (moment().startOf("isoWeek").format('MM-DD-YYYY') === moment(nextWeekDB.startDateNextWeek).subtract(7, "days").format('MM-DD-YYYY')) {
        setHiddenButtonDeleteNexWeek(0);
      }
    }
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
  // console.log("in ra " + shiftsSize + " - " + JSON.stringify(shiftsArray));
  // let elmPersonInShifts = [];
  // personInShifts.map((ele) => {
  //   if (moment(createDate.monday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
  //   }
  //   if (moment(createDate.tuesday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
  //   }
  //   if (moment(createDate.wednesday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
  //   }
  //   if (moment(createDate.thursday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
  //   }
  //   if (moment(createDate.friday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
  //   }
  //   if (moment(createDate.saturday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
  //   }
  //   if (moment(createDate.sunday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
  //   }
  // })

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
    // const dataWeekBefore = {
    //   currentFirstWeek: moment(nextWeekDB.startDateNextWeek).subtract(7, "days").format('MM-DD-YYYY'),
    //   currentLastWeek: moment(nextWeekDB.endDateNextWeek).subtract(7, "days").format('MM-DD-YYYY')
    // }
    deleteNextWeekActive(nextWeekDB._id);
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
                        Xoá tuần tiếp theo
                      </button>
                    )}
                  <button
                    type="button"
                    class="btn btn-sm btn-info"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    Tạo ca làm
                  </button>
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



        {/* Old source */}
        {/* <h1 className="large text-primary">Đăng ký ca</h1>
        <p class="card-category">
          Tuần: <Moment format="DD/MM/YYYY">{firstdayOfThisWeek}</Moment>
          {" - "}
          <Moment format="DD/MM/YYYY">{lastdayOfThisWeek}</Moment>
          <button
            type="button"
            class="btn btn-primary"
            style={{ marginLeft: "100px" }}
            onClick={() => onPrevWeek()}
          >
            Tuần trước
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => onCurrentWeek()}
          >
            Tuần hiện tại
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => onNextWeek()}
          >
            Tuần tới
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            Tạo ca làm
          </button>
        </p>
        <br />
        <div class="container">
          <div class="table-responsive-sm">
            <table class="table-shiftRegister">
              <thead class=" text-primary">
                <th colspan="3">Họ và Tên</th>
                <th colspan="3">
                  Thứ 2 (<Moment format="DD/MM">{monday}</Moment>)
                </th>
                <th colspan="3">
                  Thứ 3 (<Moment format="DD/MM">{tuesday}</Moment>)
                </th>
                <th colspan="3">
                  Thứ 4 (<Moment format="DD/MM">{wednesday}</Moment>)
                </th>
                <th colspan="3">
                  Thứ 5 (<Moment format="DD/MM">{thursday}</Moment>)
                </th>
                <th colspan="3">
                  Thứ 6 (<Moment format="DD/MM">{friday}</Moment>)
                </th>
                <th colspan="3">
                  Thứ 7 (<Moment format="DD/MM">{saturday}</Moment>)
                </th>
                <th colspan="3">
                  Chủ nhật (<Moment format="DD/MM">{sunday}</Moment>)
                </th>
                <th colspan="3">
                  Hành động
                </th>
              </thead>
              <tbody>
                <tr>
                  <td colspan="3">Ca</td>
                  {elmShiftsTable}
                  {elmShiftsTable}
                  {elmShiftsTable}
                  {elmShiftsTable}
                  {elmShiftsTable}
                  {elmShiftsTable}
                  {elmShiftsTable}
                </tr>
                <tr>
                  <td colspan="3">Số người</td>
                  {elmPersonInShifts.length > 0 ? (
                    elmPersonInShifts
                  ) : (
                    <Fragment>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                      <td colspan="1"></td>
                    </Fragment>
                  )

                  }

                  <td colspan="3">
                    <button

                      className="btn btn-success"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className="btn btn-danger"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>

                {elmUsers}
              </tbody>
            </table>
          </div> */}



        {/* Test table flex */}
        {/* <div className="wrapper">
            <div className="Rtable Rtable--5cols Rtable--collapse">
              <div className="Rtable-row Rtable-row--head">
                <div className="Rtable-cell date-cell column-heading">Họ và tên</div>
                <div className="Rtable-cell header-cell-1  column-heading">Thứ 2 (<Moment format="DD/MM">{monday}</Moment>)</div>
                <div className="Rtable-cell header-cell-allnot1 column-heading">Thứ 3 (<Moment format="DD/MM">{tuesday}</Moment>)</div>
                <div className="Rtable-cell header-cell-allnot1 column-heading">Thứ 4 (<Moment format="DD/MM">{wednesday}</Moment>)</div>
                <div className="Rtable-cell header-cell-allnot1 column-heading">Thứ 5 (<Moment format="DD/MM">{thursday}</Moment>)</div>
                <div className="Rtable-cell header-cell-allnot1 column-heading">Thứ 6 (<Moment format="DD/MM">{friday}</Moment>)</div>
                <div className="Rtable-cell header-cell-allnot1 column-heading">Thứ 7 (<Moment format="DD/MM">{saturday}</Moment>)</div>
                <div className="Rtable-cell header-cell-allnot1 column-heading">Chủ nhật (<Moment format="DD/MM">{sunday}</Moment>)</div>
                <div className="Rtable-cell action-cell column-heading">Hành động</div>
              </div>
              <div className="Rtable-row">
                <div className="Rtable-cell date-cell">
                  <div className="Rtable-cell--content date-content"><span className="webinar-date">August 2nd, 2016</span><br />6:00 pm (CDT)</div>
                </div>
                <div className="Rtable-cell monday-cell">
                  <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
                </div>
                <div className="Rtable-cell tuesday-cell">
                  <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
                </div>
                <div className="Rtable-cell wednesday-cell">
                  <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
                </div>
                <div className="Rtable-cell thursday-cell">
                  <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
                </div>
                <div className="Rtable-cell friday-cell">
                  <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
                </div>
                <div className="Rtable-cell saturday-cell">
                  <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
                </div>
                <div className="Rtable-cell sunday-cell">
                  <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
                </div>
                <div className="Rtable-cell action-cell">
                  <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
                </div>
              </div>
              <div className="Rtable-row is-striped">
                <div className="Rtable-cell date-cell">
                  <div className="Rtable-cell--content date-content"><span className="webinar-date">Ca</span></div>
                </div>
                <div className="Rtable-cell monday-cell">
                  {elmShifts}
                </div>
                <div className="Rtable-cell tuesday-cell">
                  {elmShifts}
                </div>
                <div className="Rtable-cell wednesday-cell">
                  {elmShifts}
                </div>
                <div className="Rtable-cell thursday-cell">
                  {elmShifts}
                </div>
                <div className="Rtable-cell friday-cell">
                  {elmShifts}
                </div>
                <div className="Rtable-cell saturday-cell">
                  {elmShifts}
                </div>
                <div className="Rtable-cell sunday-cell">
                  {elmShifts}
                </div>
                <div className="Rtable-cell action-cell">
                  {elmShifts}
                </div>
              </div>


            </div>
          </div> */}
        {/* End of add table flex */}




        {/* </div> */}
      </div>
    </Fragment>
  );
};

ShiftRegisters.propTypes = {
  getAllShifts: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getPersonInShift: PropTypes.func.isRequired,
  getAllBranchs: PropTypes.func.isRequired,
  getAllJobs: PropTypes.func.isRequired,
  getAllTypeUsers: PropTypes.func.isRequired,
  getShiftRegisters: PropTypes.func.isRequired,
  getNextWeekActive: PropTypes.func.isRequired,
  addNextWeekActive: PropTypes.func.isRequired,
  deleteNextWeekActive: PropTypes.func.isRequired,
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
  nextWeekActive: state.nextWeekActive,
});

export default connect(mapStateToProps, {
  getAllShifts,
  getAllUsers,
  getPersonInShift,
  getAllBranchs,
  getAllJobs,
  getAllTypeUsers,
  getShiftRegisters,
  getNextWeekActive,
  addNextWeekActive,
  deleteNextWeekActive
})(ShiftRegisters);
