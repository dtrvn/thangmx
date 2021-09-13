import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { getPersonInShiftDate, clearPersonInShift } from "../../../actions/personInShift";
import ViewPersonInShift from "./ViewPersonInShift"
import { getAllShifts } from "../../../actions/shift";

const PersonInShiftList = ({
    // personInShiftsItem: {_id, personNumber}
    // personInShifts,
    getAllShifts,
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
        getAllShifts();
    }, [getAllShifts]);

    // useEffect(() => {
    //     console.log("chay mot lan");
    //     getPersonInShiftDate(branchId, moment(startDate).format('MM-DD-YYYY'), moment(endDate).format('MM-DD-YYYY'), moment(monday).format('MM-DD-YYYY'));
    // }, []);

    useEffect(() => {
        // getCurrentUser(match.params.id);
        setCurrentDate(moment(match.params.startDate).format('MM-DD-YYYY'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('MM-DD-YYYY'), moment(match.params.endDate).format('MM-DD-YYYY'), moment(match.params.startDate).format('MM-DD-YYYY'));
    }, []);

    // let shiftMon = [];
    // let shiftTue = [];
    // let shiftWed = [];
    // let shiftThu = [];
    // let shiftFri = [];
    // let shiftSat = [];
    // let shiftSun = [];

    // let shiftIndex = null;

    // for (let i = 0; i < (shifts.length * 2); i++) {
    //     if (i % 2 === 0) {
    //         shiftIndex = i/2;
    //         shiftMon.push(shifts[shiftIndex].shiftName);
    //         shiftTue.push(shifts[shiftIndex].shiftName);
    //         shiftWed.push(shifts[shiftIndex].shiftName);
    //         shiftThu.push(shifts[shiftIndex].shiftName);
    //         shiftFri.push(shifts[shiftIndex].shiftName);
    //         shiftSat.push(shifts[shiftIndex].shiftName);
    //         shiftSun.push(shifts[shiftIndex].shiftName);
    //     } else {
    //         shiftMon.push(" ");
    //         shiftTue.push(" ");
    //         shiftWed.push(" ");
    //         shiftThu.push(" ");
    //         shiftFri.push(" ");
    //         shiftSat.push(" ");
    //         shiftSun.push(" ");
    //     }

    // }

    // let getIndex = null;
    // let getPersonNo = null;
    // let saveShiftId = null;
    // personInShifts.map((ele) => {
    //     if (ele.shiftId !== saveShiftId) {

    //         getPersonNo = shifts.filter(x => x._id === ele.shiftId).personNumber;
    //         shiftMon[0] = shifts.filter(x => x._id === ele.shiftId).shiftName;
    //         shiftTue[0] = shifts.filter(x => x._id === ele.shiftId).shiftName;
    //         shiftWed[0] = shifts.filter(x => x._id === ele.shiftId).shiftName;
    //         shiftThu[0] = shifts.filter(x => x._id === ele.shiftId).shiftName;
    //         shiftFri[0] = shifts.filter(x => x._id === ele.shiftId).shiftName;
    //         shiftSat[0] = shifts.filter(x => x._id === ele.shiftId).shiftName;
    //         shiftSun[0] = shifts.filter(x => x._id === ele.shiftId).shiftName;
    //     }
    //     saveShiftId = ele.shiftId;

    //     if (moment(ele.date).format('MM-DD-YYYY') === moment(monday).format('MM-DD-YYYY')) {
    //         ele.personShift((x) => {
    //             getIndex = shifts.findIndex(x.shiftId);
    //             shiftMon[getIndex] = shifts.filter(x => x._id === ele.shiftId).shiftName;
    //         })
    //         shiftMon[getIndex + 1] = getPersonNo;
    //     }
    //     if (moment(ele.date).format('MM-DD-YYYY') === moment(tuesday).format('MM-DD-YYYY')) {
    //         shiftTue[getIndex + 1] = getPersonNo;
    //     }
    //     if (moment(ele.date).format('MM-DD-YYYY') === moment(wednesday).format('MM-DD-YYYY')) {
    //         shiftWed[getIndex + 1] = getPersonNo;
    //     }
    //     if (moment(ele.date).format('MM-DD-YYYY') === moment(thursday).format('MM-DD-YYYY')) {
    //         shiftThu[getIndex + 1] = getPersonNo;
    //     }
    //     if (moment(ele.date).format('MM-DD-YYYY') === moment(friday).format('MM-DD-YYYY')) {
    //         shiftFri[getIndex + 1] = getPersonNo;
    //     }
    //     if (moment(ele.date).format('MM-DD-YYYY') === moment(saturday).format('MM-DD-YYYY')) {
    //         shiftSat[getIndex + 1] = getPersonNo;
    //     }
    //     if (moment(ele.date).format('MM-DD-YYYY') === moment(sunday).format('MM-DD-YYYY')) {
    //         shiftSun[getIndex + 1] = getPersonNo;
    //     }
    // })

    // const [viewMon, setViewMon] = useState(false);
    // const [viewTue, setViewTue] = useState(false);
    // const [viewWed, setViewWed] = useState(false);
    // const [viewThu, setViewThu] = useState(false);
    // const [viewFri, setViewFri] = useState(false);
    // const [viewSat, setViewSat] = useState(false);
    // const [viewSun, setViewSun] = useState(false);

    const onViewMon = () => {
        // setViewMon(!viewMon);
        setActiveTab("2");
        setCurrentDate(moment(match.params.startDate).format('MM-DD-YYYY'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('MM-DD-YYYY'), moment(match.params.endDate).format('MM-DD-YYYY'), moment(match.params.startDate).format('MM-DD-YYYY'));

    }
    const onViewTue = () => {
        // setViewTue(!viewTue);
        setActiveTab("3");
        setCurrentDate(moment(match.params.startDate).add(1, "days").format('MM-DD-YYYY'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('MM-DD-YYYY'), moment(match.params.endDate).format('MM-DD-YYYY'), moment(match.params.startDate).add(1, "days").format('MM-DD-YYYY'));

    }
    const onViewWed = () => {
        // setViewWed(!viewWed);
        setActiveTab("4");
        setCurrentDate(moment(match.params.startDate).add(2, "days").format('MM-DD-YYYY'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('MM-DD-YYYY'), moment(match.params.endDate).format('MM-DD-YYYY'), moment(match.params.startDate).add(2, "days").format('MM-DD-YYYY'));

    }
    const onViewThu = () => {
        // setViewThu(!viewThu);
        setActiveTab("5");
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('MM-DD-YYYY'), moment(match.params.endDate).format('MM-DD-YYYY'), moment(match.params.startDate).add(3, "days").format('MM-DD-YYYY'));
        setCurrentDate(moment(match.params.startDate).add(3, "days").format('MM-DD-YYYY'));
    }
    const onViewFri = () => {
        // setViewFri(!viewFri);
        setActiveTab("6");
        setCurrentDate(moment(match.params.startDate).add(4, "days").format('MM-DD-YYYY'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('MM-DD-YYYY'), moment(match.params.endDate).format('MM-DD-YYYY'), moment(match.params.startDate).add(4, "days").format('MM-DD-YYYY'));

    }
    const onViewSat = () => {
        // setViewSat(!viewSat);
        setActiveTab("7");
        setCurrentDate(moment(match.params.startDate).add(5, "days").format('MM-DD-YYYY'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('MM-DD-YYYY'), moment(match.params.endDate).format('MM-DD-YYYY'), moment(match.params.startDate).add(5, "days").format('MM-DD-YYYY'));

    }
    const onViewSun = () => {
        // setViewSun(!viewSun);
        setActiveTab("8");
        setCurrentDate(moment(match.params.startDate).add(6, "days").format('MM-DD-YYYY'));
        getPersonInShiftDate(match.params.branchId, moment(match.params.startDate).format('MM-DD-YYYY'), moment(match.params.endDate).format('MM-DD-YYYY'), moment(match.params.endDate).format('MM-DD-YYYY'));

    }

    const clearData = () => {
        clearPersonInShift();
    }

    return (
        <Fragment>
            {/* <div className="col-sm-12 col-xs-12">
                <button
                    type="button"
                    class="btn btn-sm btn-info"
                    onClick={() => onViewMon()}
                >
                    <i class="fas fa-plus"></i>{"  "}Thứ 2
                </button>
                {viewMon ? (
                    <ViewPersonInShift personInShifts={personInShifts} shifts={shifts} />
                ) : " "}
                <button
                    type="button"
                    class="btn btn-sm btn-info"
                    onClick={() => onViewTue()}
                >
                    <i class="fas fa-plus"></i>{"  "}Thứ 3
                </button>
                {viewTue ? (
                    <ViewPersonInShift personInShifts={personInShifts} shifts={shifts} />
                ) : " "}
                <button
                    type="button"
                    class="btn btn-sm btn-info"
                    onClick={() => onViewWed()}
                >
                    <i class="fas fa-plus"></i>{"  "}Thứ 4
                </button>
                {viewWed ? (
                    <ViewPersonInShift personInShifts={personInShifts} shifts={shifts} />
                ) : " "}
                <button
                    type="button"
                    class="btn btn-sm btn-info"
                    onClick={() => onViewThu()}
                >
                    <i class="fas fa-plus"></i>{"  "}Thứ 5
                </button>
                {viewThu ? (
                    <ViewPersonInShift personInShifts={personInShifts} shifts={shifts} />
                ) : " "}
                <button
                    type="button"
                    class="btn btn-sm btn-info"
                    onClick={() => onViewFri()}
                >
                    <i class="fas fa-plus"></i>{"  "}Thứ 6
                </button>
                {viewFri ? (
                    <ViewPersonInShift personInShifts={personInShifts} shifts={shifts} />
                ) : " "}
                <button
                    type="button"
                    class="btn btn-sm btn-info"
                    onClick={() => onViewSat()}
                >
                    <i class="fas fa-plus"></i>{"  "}Thứ 7
                </button>
                {viewSat ? (
                    <ViewPersonInShift personInShifts={personInShifts} shifts={shifts} />
                ) : " "}
                <button
                    type="button"
                    class="btn btn-sm btn-info"
                    onClick={() => onViewSun()}
                >
                    <i class="fas fa-plus"></i>{"  "}Chủ nhật
                </button>
                {viewSun ? (
                    <ViewPersonInShift personInShifts={personInShifts} shifts={shifts} />
                ) : " "}

            </div> */}
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
                                                startDate={moment(match.params.startDate).format('MM-DD-YYYY')}
                                                endDate={moment(match.params.endDate).format('MM-DD-YYYY')}
                                                // currentDate={moment(match.params.startDate).format('MM-DD-YYYY')}
                                                currentDate={currentDate} />
                                        </div>
                                        <div className={`tab-pane ${activeTab === "3" ? "active" : ""}`} id="tue" role="tabpanel">
                                            <ViewPersonInShift
                                                personInShift={personInShift}
                                                shifts={shifts}
                                                branchId={match.params.branchId}
                                                startDate={moment(match.params.startDate).format('MM-DD-YYYY')}
                                                endDate={moment(match.params.endDate).format('MM-DD-YYYY')}
                                                // currentDate={moment(match.params.startDate).add(1, "days").format('MM-DD-YYYY')} 
                                                currentDate={currentDate} />
                                        </div>
                                        <div className={`tab-pane ${activeTab === "4" ? "active" : ""}`} id="wed" role="tabpanel">
                                            <ViewPersonInShift
                                                personInShift={personInShift}
                                                shifts={shifts}
                                                branchId={match.params.branchId}
                                                startDate={moment(match.params.startDate).format('MM-DD-YYYY')}
                                                endDate={moment(match.params.endDate).format('MM-DD-YYYY')}
                                                // currentDate={moment(match.params.startDate).add(2, "days").format('MM-DD-YYYY')} 
                                                currentDate={currentDate} />
                                        </div>
                                        <div className={`tab-pane ${activeTab === "5" ? "active" : ""}`} id="thu" role="tabpanel">
                                            <ViewPersonInShift
                                                personInShift={personInShift}
                                                shifts={shifts}
                                                branchId={match.params.branchId}
                                                startDate={moment(match.params.startDate).format('MM-DD-YYYY')}
                                                endDate={moment(match.params.endDate).format('MM-DD-YYYY')}
                                                // currentDate={moment(match.params.startDate).add(3, "days").format('MM-DD-YYYY')} 
                                                currentDate={currentDate} />
                                        </div>
                                        <div className={`tab-pane ${activeTab === "6" ? "active" : ""}`} id="fri" role="tabpanel">
                                            <ViewPersonInShift
                                                personInShift={personInShift}
                                                shifts={shifts}
                                                branchId={match.params.branchId}
                                                startDate={moment(match.params.startDate).format('MM-DD-YYYY')}
                                                endDate={moment(match.params.endDate).format('MM-DD-YYYY')}
                                                // currentDate={moment(match.params.startDate).add(4, "days").format('MM-DD-YYYY')} 
                                                currentDate={currentDate} />
                                        </div>
                                        <div className={`tab-pane ${activeTab === "7" ? "active" : ""}`} id="sat" role="tabpanel">
                                            <ViewPersonInShift
                                                personInShift={personInShift}
                                                shifts={shifts}
                                                branchId={match.params.branchId}
                                                startDate={moment(match.params.startDate).format('MM-DD-YYYY')}
                                                endDate={moment(match.params.endDate).format('MM-DD-YYYY')}
                                                // currentDate={moment(match.params.startDate).add(5, "days").format('MM-DD-YYYY')} 
                                                currentDate={currentDate} />
                                        </div>
                                        <div className={`tab-pane ${activeTab === "8" ? "active" : ""}`} id="sun" role="tabpanel">
                                            <ViewPersonInShift
                                                personInShift={personInShift}
                                                shifts={shifts}
                                                branchId={match.params.branchId}
                                                startDate={moment(match.params.startDate).format('MM-DD-YYYY')}
                                                endDate={moment(match.params.endDate).format('MM-DD-YYYY')}
                                                // currentDate={moment(match.params.startDate).add(6, "days").format('MM-DD-YYYY')} 
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

            {/* <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Điều chỉnh số người trong một ca</h4>
                            <div className="vtabs">
                                <ul className="nav nav-tabs tabs-vertical" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#mon" role="tab" onClick={() => onViewMon()}>
                                            <span className="hidden-sm-up"></span>
                                            <span className="hidden-xs-down">Thứ 2</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#tue" role="tab" onClick={() => onViewTue()}>
                                            <span className="hidden-sm-up"></span>
                                            <span className="hidden-xs-down">Thứ 3</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#wed" role="tab" onClick={() => onViewWed()}>
                                            <span className="hidden-sm-up"></span>
                                            <span className="hidden-xs-down">Thứ 4</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#thu" role="tab" onClick={() => onViewThu()}>
                                            <span className="hidden-sm-up"></span>
                                            <span className="hidden-xs-down">Thứ 5</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#fri" role="tab" onClick={() => onViewFri()}>
                                            <span className="hidden-sm-up"></span>
                                            <span className="hidden-xs-down">Thứ 6</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#sat" role="tab" onClick={() => onViewSat()}>
                                            <span className="hidden-sm-up"></span>
                                            <span className="hidden-xs-down">Thứ 7</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#sun" role="tab" onClick={() => onViewSun()}>
                                            <span className="hidden-sm-up"></span>
                                            <span className="hidden-xs-down">Chủ nhật</span>
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="mon" role="tabpanel">
                                        <ViewPersonInShift personInShift={personInShift} shifts={shifts} />
                                    </div>
                                    <div className="tab-pane" id="tue" role="tabpanel">
                                        <ViewPersonInShift personInShift={personInShift} shifts={shifts} />
                                    </div>
                                    <div className="tab-pane" id="wed" role="tabpanel">
                                        <ViewPersonInShift personInShift={personInShift} shifts={shifts} />
                                    </div>
                                    <div className="tab-pane" id="thu" role="tabpanel">
                                        <ViewPersonInShift personInShift={personInShift} shifts={shifts} />
                                    </div>
                                    <div className="tab-pane" id="fri" role="tabpanel">
                                        <ViewPersonInShift personInShift={personInShift} shifts={shifts} />
                                    </div>
                                    <div className="tab-pane" id="sat" role="tabpanel">
                                        <ViewPersonInShift personInShift={personInShift} shifts={shifts} />
                                    </div>
                                    <div className="tab-pane" id="sun" role="tabpanel">
                                        <ViewPersonInShift personInShift={personInShift} shifts={shifts} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link className="btn btn-inverse waves-effect waves-light" to="/shiftRegisters">
                            Trở về
                        </Link>
                    </div>
                </div>
            </div> */}

        </Fragment>

    )
};

PersonInShiftList.propTypes = {
    // personInShifts: PropTypes.object.isRequired,
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    // monday: PropTypes.object.isRequired,
    // tuesday: PropTypes.object.isRequired,
    // wednesday: PropTypes.object.isRequired,
    // thursday: PropTypes.object.isRequired,
    // friday: PropTypes.object.isRequired,
    // saturday: PropTypes.object.isRequired,
    // sunday: PropTypes.object.isRequired,
    shifts: PropTypes.object.isRequired,
    // branchId: PropTypes.object.isRequired,
    getPersonInShiftDate: PropTypes.func.isRequired,
    getAllShifts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    personInShift: state.personInShift,
    shift: state.shift,
});

export default connect(mapStateToProps, { getAllShifts, getPersonInShiftDate, clearPersonInShift })(
    PersonInShiftList
);
