import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter, Redirect } from "react-router-dom";
import { deleteUser, getAllUsers, getUser } from "../../actions/user";
import { getAllTypeUsers } from "../../actions/typeUser";
import Moment from "react-moment";
import moment from "moment";
import { getShiftRegisters } from "../../actions/shiftRegister";
import SalaryPersonalList from "./SalaryPersonalComponent/SalaryPersonalList";

const SalaryPersonal = ({
    shiftRegister: { shiftRegisters },
}) => {

    const [createDate, setCreateDate] = useState({
        currentDay: moment(),
        currentMonth: moment().month()+1,
        firstdayOfThisWeek: moment().startOf("isoWeek"),
        lastdayOfThisWeek: moment().startOf("isoWeek").add(6, "days"),
    });

    useEffect(() => {
        let findFirstDayOfFirstWeekInMonth = ""; 
        let findLastDayOfFirstWeekInMonth = "";

        getShiftRegisters(moment(findFirstDayOfFirstWeekInMonth).format('MM-DD-YYYY'), moment(findLastDayOfFirstWeekInMonth).format('MM-DD-YYYY'));
    }, []);

    const onPrevMonth = () => {
        const currentFirstWeek = createDate.firstdayOfThisWeek.subtract(7, "days");
        const currentLastWeek = createDate.lastdayOfThisWeek.subtract(7, "days");
        setCreateDate({
            ...createDate,
            currentDay: createDate.currentDay.subtract(1, "months"),
            firstdayOfThisWeek: currentFirstWeek,
            lastdayOfThisWeek: currentLastWeek,
        });
    };

    const onNextMonth = () => {
        const currentFirstWeek = createDate.firstdayOfThisWeek.add(7, "days");
        const currentLastWeek = createDate.lastdayOfThisWeek.add(7, "days");
        setCreateDate({
            ...createDate,
            currentDay: createDate.currentDay.add(1, "months"),
            firstdayOfThisWeek: currentFirstWeek,
            lastdayOfThisWeek: currentLastWeek,
        });
    };

    const onCurrentMonth = () => {
        const currentFirstWeek = moment().startOf("isoWeek");
        const currentLastWeek = moment().startOf("isoWeek").add(6, "days");
        setCreateDate({
            ...createDate,
            currentDay: moment(),
            firstdayOfThisWeek: currentFirstWeek,
            lastdayOfThisWeek: currentLastWeek,
        });
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 m-t-30">
                    <div className="card">
                        <div className="card-header bg-info">
                            <h4 class="m-b-0 text-white">Thông tin lương</h4>
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

                            <div class="card-group-shiftRegister color-bordered-table-shiftRegister">
                                <div class="card-shiftRegister col-md-1-7">
                                    <div class="card-body-shiftRegister text-center">
                                        <p class="text-center font-medium m-b-0">Thứ 2</p>
                                        {/* <p>(<Moment format="DD/MM">{monday}</Moment>)</p> */}
                                    </div>
                                </div>


                                <div class="card-shiftRegister col-md-1-7">
                                    <div class="card-body-shiftRegister text-center">
                                        <p class="text-center font-medium m-b-0">Thứ 3</p>
                                        {/* <p>(<Moment format="DD/MM">{tuesday}</Moment>)</p> */}
                                    </div>
                                </div>


                                <div class="card-shiftRegister col-md-1-7">
                                    <div class="card-body-shiftRegister text-center">
                                        <p class="text-center font-medium m-b-0">Thứ 4</p>
                                        {/* <p>(<Moment format="DD/MM">{wednesday}</Moment>)</p> */}
                                    </div>
                                </div>
                                <div class="card-shiftRegister col-md-1-7">
                                    <div class="card-body-shiftRegister text-center">
                                        <p class="text-center font-medium m-b-0">Thứ 5</p>
                                        {/* <p>(<Moment format="DD/MM">{thursday}</Moment>)</p> */}
                                    </div>
                                </div>
                                <div class="card-shiftRegister col-md-1-7">
                                    <div class="card-body-shiftRegister text-center">
                                        <p class="text-center font-medium m-b-0">Thứ 6</p>
                                        {/* <p>(<Moment format="DD/MM">{friday}</Moment>)</p> */}
                                    </div>
                                </div>
                                <div class="card-shiftRegister col-md-1-7">
                                    <div class="card-body-shiftRegister text-center">
                                        <p class="text-center font-medium m-b-0">Thứ 7</p>
                                        {/* <p>(<Moment format="DD/MM">{saturday}</Moment>)</p> */}
                                    </div>
                                </div>
                                <div class="card-shiftRegister col-md-1-7">
                                    <div class="card-body-shiftRegister text-center">
                                        <p class="text-center font-medium m-b-0">Chủ nhật</p>
                                        {/* <p>(<Moment format="DD/MM">{sunday}</Moment>)</p> */}
                                    </div>
                                </div>
                                <div class="card-shiftRegister col-md-1-7">
                                    <div class="card-body-shiftRegister text-center">
                                        <p class="text-center font-medium m-b-0">Lương</p>
                                    </div>
                                </div>

                            </div>
                            <SalaryPersonalList />

                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

SalaryPersonal.propTypes = {
    getShiftRegisters: PropTypes.func.isRequired,

}
const mapStateToProps = (state) => ({
    
    shiftRegister: state.shiftRegister,
});

export default connect(mapStateToProps, {
    getShiftRegisters
})(SalaryPersonal);
