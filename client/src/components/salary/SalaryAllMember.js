import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter, Redirect } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import { getShiftRegistersForMonth, getShiftRegisterViewSalary } from "../../actions/shiftRegister";
import { getAllUsers } from "../../actions/user";

const SalaryAllMember = ({
    getShiftRegistersForMonth,
    getShiftRegisterViewSalary,
    getAllUsers,
    shiftRegister: { shiftRegisters },
    auth: { user },
    user: { users },
}) => {

    const [createDate, setCreateDate] = useState({
        currentDay: moment(),
        currentMonth: moment().month() + 1,
        firstDayOfFirstWeekInMonth: moment().startOf('month').startOf("isoWeek").format('MM-DD-YYYY'),
        lastDayOfLastWeekInMonth: moment().endOf('month').startOf("isoWeek").add(6, "days").format('MM-DD-YYYY'),
    });

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    useEffect(() => {
        getShiftRegistersForMonth(moment(createDate.firstDayOfFirstWeekInMonth), moment(createDate.lastDayOfLastWeekInMonth));
    }, [createDate]);

    const onPrevMonth = () => {
        const prevMonth = createDate.currentDay.subtract(1, "months");
        const getMonth = moment(prevMonth).month() + 1;
        const firstWeekPrevMonth = moment(prevMonth).startOf('month').startOf("isoWeek").format('MM-DD-YYYY');
        const lastWeekPrevMonth = moment(prevMonth).endOf('month').startOf("isoWeek").add(6, "days").format('MM-DD-YYYY');
        setCreateDate({
            ...createDate,
            currentDay: prevMonth,
            currentMonth: getMonth,
            firstDayOfFirstWeekInMonth: firstWeekPrevMonth,
            lastDayOfLastWeekInMonth: lastWeekPrevMonth,
        });
    };

    const onNextMonth = () => {
        const nextMonth = createDate.currentDay.add(1, "months");
        const getMonth = moment(nextMonth).month() + 1;
        const firstWeekNextMonth = moment(nextMonth).startOf('month').startOf("isoWeek").format('MM-DD-YYYY');
        const lastWeekNextMonth = moment(nextMonth).endOf('month').startOf("isoWeek").add(6, "days").format('MM-DD-YYYY');
        setCreateDate({
            ...createDate,
            currentDay: nextMonth,
            currentMonth: getMonth,
            firstDayOfFirstWeekInMonth: firstWeekNextMonth,
            lastDayOfLastWeekInMonth: lastWeekNextMonth,
        });
    };

    const onCurrentMonth = () => {
        setCreateDate({
            ...createDate,
            currentDay: moment(),
            currentMonth: moment().month() + 1,
            firstDayOfFirstWeekInMonth: moment().startOf('month').startOf("isoWeek").format('MM-DD-YYYY'),
            lastDayOfLastWeekInMonth: moment().endOf('month').startOf("isoWeek").add(6, "days").format('MM-DD-YYYY'),
        });
    };


    let getUsers = "";

    let elmDetails = [];
    let elmUserIds = [];
    let elmUserNames = [];
    let elmSalarys = [];
    let countSalary = 0;
    let getIndex = null;
    if(shiftRegisters.length > 0 && users.length > 0){
        shiftRegisters.map((ele) => {
            getUsers = users.find(({ _id }) => _id === ele.userId);
            // Nếu chưa tồn tại thì add vào elmUserNames, tồn tại rồi thì không add
            getIndex = elmUserIds.findIndex(x => x === getUsers._id);
            countSalary = 0;
            if(getIndex < 0){
                elmUserNames.push(getUsers.name);
                elmUserIds.push(getUsers._id);
                elmSalarys.push(0);
                getIndex = elmSalarys.length === 0 ? 0 : elmSalarys.length-1;
            } else {
                countSalary = elmSalarys[getIndex];
            }
            ele.register.map((reg) => {
                countSalary = countSalary + reg.cost;
            })
            elmSalarys[getIndex] = countSalary;
        })
    }
    

    // console.log("elmUserIds "+JSON.stringify(elmUserIds));
    // console.log("elmUserNames "+JSON.stringify(elmUserNames));
    // console.log("elmSalarys "+JSON.stringify(elmSalarys));

    elmDetails = elmUserNames.map((item, idx) => (
        <tr>
          <td>{item}</td>
          <td class="text-right">{elmSalarys[idx].toLocaleString()}</td>
          <td>
            <Link
              to={`/salarys/${elmUserIds[idx]}/${createDate.firstDayOfFirstWeekInMonth}/${createDate.lastDayOfLastWeekInMonth}/${moment(createDate.currentDay).format('MM-DD-YYYY')}`}
              className="btn btn-success"
              onClick={() => getShiftRegisterViewSalary(elmUserIds[idx], createDate.firstDayOfFirstWeekInMonth, createDate.lastDayOfLastWeekInMonth, createDate.currentDay)}
            >
              Xem chi tiết
            </Link>
          </td>
        </tr>
      ));

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 m-t-30">
                    <div className="card">
                        <div className="card-header bg-info">
                            <h4 class="m-b-0 text-white">Thông tin lương</h4>
                            {/* <p>{createDate.firstDayOfFirstWeekInMonth} - {createDate.lastDayOfLastWeekInMonth}</p> */}
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <h3>Tháng <Moment format="MM">{createDate.currentDay}</Moment></h3> Năm <Moment format="YYYY">{createDate.currentDay}</Moment>
                                </div>
                                <div className="col-md-8">
                                    <button
                                        types="button"
                                        class="btn btn-sm btn-info"
                                        onClick={() => onPrevMonth()}
                                    >
                                        <i className="ti-control-backward"></i>{"  "}<span className="hide-sm">Tháng trước</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-info"
                                        onClick={() => onCurrentMonth()}
                                    >
                                        <i className="ti-shine"></i>{"  "}<span className="hide-sm">Tháng hiện tại</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="btn btn-sm btn-info"
                                        onClick={() => onNextMonth()}
                                    >
                                        <i className="ti-control-forward"></i>{"  "}<span className="hide-sm">Tháng tới</span>
                                    </button>
                                </div>
                            </div>

                            <div className="row">
                                <div class="table-responsive" style={{ marginRight: "10px" , marginLeft: "10px" }}>
                                    <table id="myTable" class="table-salary color-table success-table">
                                        <thead>
                                            <tr>
                                                <th>Tên nhân viên</th>
                                                <th>Lương</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {elmDetails}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

SalaryAllMember.propTypes = {
    getShiftRegistersForMonth: PropTypes.func.isRequired,
    getShiftRegisterViewSalary: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.user,
    auth: state.auth,
    shiftRegister: state.shiftRegister,
});

export default connect(mapStateToProps, {
    getShiftRegistersForMonth, getAllUsers, getShiftRegisterViewSalary
})(SalaryAllMember);
