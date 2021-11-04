import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { getPersonInShiftDate, clearPersonInShift } from "../../../actions/personInShift";
import ViewPersonInShift from "./ViewPersonInShift"
import { getShiftForBranch } from "../../../actions/shift";

const PersonInShiftList = ({
    // personInShiftsItem: {_id, personNumber}
    // personInShifts,
    getShiftForBranch,
    // startDate,
    // endDate,
    // monday,
    // tuesday,
    // wednesday,
    // thursday,
    // friday,
    // saturday,
    // sunday,
    shift: { shifts },
    // branchId,
    getPersonInShiftDate,
    clearPersonInShift,
    personInShift: { personInShift },
    match
}) => {

    const [currentDate, setCurrentDate] = useState("");
    const [activeTab, setActiveTab] = useState("2");

    useEffect(() => {
        // getAllShifts();
        getShiftForBranch(match.params.branchId, moment(match.params.startDate).format('YYYY-MM-DD'));
    }, [getShiftForBranch]);

    useEffect(() => {
        setCurrentDate(moment(match.params.startDate).format('YYYY-MM-DD'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('YYYY-MM-DD'), moment(match.params.endDate).format('YYYY-MM-DD'), moment(match.params.startDate).format('YYYY-MM-DD'));
    }, []);

    const onViewMon = () => {
        setActiveTab("2");
        setCurrentDate(moment(match.params.startDate).format('YYYY-MM-DD'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('YYYY-MM-DD'), moment(match.params.endDate).format('YYYY-MM-DD'), moment(match.params.startDate).format('YYYY-MM-DD'));

    }
    const onViewTue = () => {
        setActiveTab("3");
        setCurrentDate(moment(match.params.startDate).add(1, "days").format('YYYY-MM-DD'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('YYYY-MM-DD'), moment(match.params.endDate).format('YYYY-MM-DD'), moment(match.params.startDate).add(1, "days").format('YYYY-MM-DD'));

    }
    const onViewWed = () => {
        setActiveTab("4");
        setCurrentDate(moment(match.params.startDate).add(2, "days").format('YYYY-MM-DD'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('YYYY-MM-DD'), moment(match.params.endDate).format('YYYY-MM-DD'), moment(match.params.startDate).add(2, "days").format('YYYY-MM-DD'));

    }
    const onViewThu = () => {
        setActiveTab("5");
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('YYYY-MM-DD'), moment(match.params.endDate).format('YYYY-MM-DD'), moment(match.params.startDate).add(3, "days").format('YYYY-MM-DD'));
        setCurrentDate(moment(match.params.startDate).add(3, "days").format('YYYY-MM-DD'));
    }
    const onViewFri = () => {
        setActiveTab("6");
        setCurrentDate(moment(match.params.startDate).add(4, "days").format('YYYY-MM-DD'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('YYYY-MM-DD'), moment(match.params.endDate).format('YYYY-MM-DD'), moment(match.params.startDate).add(4, "days").format('YYYY-MM-DD'));

    }
    const onViewSat = () => {
        setActiveTab("7");
        setCurrentDate(moment(match.params.startDate).add(5, "days").format('YYYY-MM-DD'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('YYYY-MM-DD'), moment(match.params.endDate).format('YYYY-MM-DD'), moment(match.params.startDate).add(5, "days").format('YYYY-MM-DD'));

    }
    const onViewSun = () => {
        setActiveTab("8");
        setCurrentDate(moment(match.params.startDate).add(6, "days").format('YYYY-MM-DD'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('YYYY-MM-DD'), moment(match.params.endDate).format('YYYY-MM-DD'), moment(match.params.endDate).format('YYYY-MM-DD'));

    }

    const clearData = () => {
        clearPersonInShift();
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 m-t-30">
                    <div className="card">
                        <div className="card-header bg-info">
                            <h4 class="m-b-0 text-white">Điều chỉnh số người trong một ca</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="vtabs">
                                    <ul className="nav nav-tabs tabs-vertical" role="tablist">
                                        <li className="nav-item">
                                            <a className={`nav-link ${activeTab === "2" ? "active" : ""}`} data-toggle="tab" role="tab" onClick={() => onViewMon()}>
                                                <span className="hidden-sm-up"></span>
                                                <span className="hidden-xs-down">Thứ 2</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${activeTab === "3" ? "active" : ""}`} data-toggle="tab" role="tab" onClick={() => onViewTue()}>
                                                <span className="hidden-sm-up"></span>
                                                <span className="hidden-xs-down">Thứ 3</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${activeTab === "4" ? "active" : ""}`} data-toggle="tab" role="tab" onClick={() => onViewWed()}>
                                                <span className="hidden-sm-up"></span>
                                                <span className="hidden-xs-down">Thứ 4</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${activeTab === "5" ? "active" : ""}`} data-toggle="tab" role="tab" onClick={() => onViewThu()}>
                                                <span className="hidden-sm-up"></span>
                                                <span className="hidden-xs-down">Thứ 5</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${activeTab === "6" ? "active" : ""}`} data-toggle="tab" role="tab" onClick={() => onViewFri()}>
                                                <span className="hidden-sm-up"></span>
                                                <span className="hidden-xs-down">Thứ 6</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${activeTab === "7" ? "active" : ""}`} data-toggle="tab" role="tab" onClick={() => onViewSat()}>
                                                <span className="hidden-sm-up"></span>
                                                <span className="hidden-xs-down">Thứ 7</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${activeTab === "8" ? "active" : ""}`} data-toggle="tab" role="tab" onClick={() => onViewSun()}>
                                                <span className="hidden-sm-up"></span>
                                                <span className="hidden-xs-down">Chủ nhật</span>
                                            </a>
                                        </li>
                                    </ul>
                                    {/* Tab panes */}
                                    <div className="tab-content">
                                        <div className="row">
                                            (<Moment format="DD/MM">{currentDate}</Moment>)
                                        </div>
                                        <div className={`tab-pane ${activeTab === "2" ? "active" : ""}`} id="mon" role="tabpanel">
                                            <ViewPersonInShift
                                                personInShift={personInShift}
                                                shifts={shifts}
                                                branchId={match.params.branchId}
                                                startDate={moment(match.params.startDate).format('YYYY-MM-DD')}
                                                endDate={moment(match.params.endDate).format('YYYY-MM-DD')}
                                                currentDate={currentDate} />
                                        </div>
                                        <div className={`tab-pane ${activeTab === "3" ? "active" : ""}`} id="tue" role="tabpanel">
                                            <ViewPersonInShift
                                                personInShift={personInShift}
                                                shifts={shifts}
                                                branchId={match.params.branchId}
                                                startDate={moment(match.params.startDate).format('YYYY-MM-DD')}
                                                endDate={moment(match.params.endDate).format('YYYY-MM-DD')}
                                                currentDate={currentDate} />
                                        </div>
                                        <div className={`tab-pane ${activeTab === "4" ? "active" : ""}`} id="wed" role="tabpanel">
                                            <ViewPersonInShift
                                                personInShift={personInShift}
                                                shifts={shifts}
                                                branchId={match.params.branchId}
                                                startDate={moment(match.params.startDate).format('YYYY-MM-DD')}
                                                endDate={moment(match.params.endDate).format('YYYY-MM-DD')}
                                                currentDate={currentDate} />
                                        </div>
                                        <div className={`tab-pane ${activeTab === "5" ? "active" : ""}`} id="thu" role="tabpanel">
                                            <ViewPersonInShift
                                                personInShift={personInShift}
                                                shifts={shifts}
                                                branchId={match.params.branchId}
                                                startDate={moment(match.params.startDate).format('YYYY-MM-DD')}
                                                endDate={moment(match.params.endDate).format('YYYY-MM-DD')}
                                                currentDate={currentDate} />
                                        </div>
                                        <div className={`tab-pane ${activeTab === "6" ? "active" : ""}`} id="fri" role="tabpanel">
                                            <ViewPersonInShift
                                                personInShift={personInShift}
                                                shifts={shifts}
                                                branchId={match.params.branchId}
                                                startDate={moment(match.params.startDate).format('YYYY-MM-DD')}
                                                endDate={moment(match.params.endDate).format('YYYY-MM-DD')}
                                                currentDate={currentDate} />
                                        </div>
                                        <div className={`tab-pane ${activeTab === "7" ? "active" : ""}`} id="sat" role="tabpanel">
                                            <ViewPersonInShift
                                                personInShift={personInShift}
                                                shifts={shifts}
                                                branchId={match.params.branchId}
                                                startDate={moment(match.params.startDate).format('YYYY-MM-DD')}
                                                endDate={moment(match.params.endDate).format('YYYY-MM-DD')}
                                                currentDate={currentDate} />
                                        </div>
                                        <div className={`tab-pane ${activeTab === "8" ? "active" : ""}`} id="sun" role="tabpanel">
                                            <ViewPersonInShift
                                                personInShift={personInShift}
                                                shifts={shifts}
                                                branchId={match.params.branchId}
                                                startDate={moment(match.params.startDate).format('YYYY-MM-DD')}
                                                endDate={moment(match.params.endDate).format('YYYY-MM-DD')}
                                                currentDate={currentDate} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <Link className="btn btn-inverse waves-effect waves-light" to="/shiftRegisters" onClick={() => clearData()}>
                                Trở về
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>

    )
};

PersonInShiftList.propTypes = {
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    shifts: PropTypes.object.isRequired,
    getPersonInShiftDate: PropTypes.func.isRequired,
    getShiftForBranch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    personInShift: state.personInShift,
    shift: state.shift,
});

export default connect(mapStateToProps, { getShiftForBranch, getPersonInShiftDate, clearPersonInShift })(
    PersonInShiftList
);
