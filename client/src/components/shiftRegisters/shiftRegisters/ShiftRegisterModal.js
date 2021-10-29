import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import moment from "moment";
import { updateShiftRegister, setShowShiftRegistersModal } from "../../../actions/shiftRegister";
import Switch from './Switch';
// import AlertShiftRegister from '../../layout/AlertShiftRegister';
import { clearPersonInShift } from "../../../actions/personInShift";

const ShiftRegisterModal = ({
    currentDay,
    dateFrom,
    dateTo,
    branchId,
    currentUserLineId,
    shifts,
    jobs,
    users,
    typeUsers,
    shiftRegisters,
    permitShiftRegists,
    updateShiftRegister,
    clearPersonInShift,
    count,
    auth: { user },
    personInShift,
    showShiftRegistersModal,
    // setShowShiftRegisterModal,
    setShowShiftRegistersModal,
}) => {
    const [formData, setFormData] = useState({
        id: null,
        // userId1: userId,
        branchId: branchId,
        listShifts: [],
        listShiftsName: [],
        dateFrom: 0,
        dateTo: 0,
        date: 0,
        registerId0: "",
        registerId1: "",
        registerId2: "",
        shiftId0: "",
        shiftId1: "",
        shiftId2: "",
        jobId0: "",
        jobId1: "",
        jobId2: "",
        cost0: 0,
        cost1: 0,
        cost2: 0,
        personInShift0: 0,
        personInShift1: 0,
        personInShift2: 0,
        shiftFlag0: "",
        shiftFlag1: "",
        shiftFlag2: "",
        permitShiftRegistFlag: true,
    });

    const [value0, setValue0] = useState(false);
    const [value1, setValue1] = useState(false);
    const [value2, setValue2] = useState(false);

    const { date, shiftId0, shiftId1, shiftId2, jobId0, jobId1, jobId2, cost0, cost1, cost2 } = formData;

    let shiftCurrentList = [];
    let jobCurrentList = [];
    let getId = null;
    // let oldData = [];

    // console.log("currentUserLineId1 "+currentUserLineId);
    // let idx = null;
    let getRegisterId0 = null;
    let getRegisterId1 = null;
    let getRegisterId2 = null;
    let countShiftRegistedNo = 0;
    shiftRegisters.map((ele) => {
        if (ele.userId === currentUserLineId && ele.branchId === branchId) {
            ele.register.map((reg) => {
                countShiftRegistedNo = countShiftRegistedNo + 1;
                if (moment(reg.date).format('MM-DD-YYYY') === moment(currentDay).format('MM-DD-YYYY')) {
                    shiftCurrentList.push(reg.shiftId);
                    jobCurrentList.push(reg.jobId);
                    shifts.map((ele, idx) => {
                        if (ele._id === reg.shiftId) {
                            if (idx === 0) {
                                return getRegisterId0 = reg._id;
                            }
                            if (idx === 1) {
                                return getRegisterId1 = reg._id;
                            }
                            if (idx === 2) {
                                return getRegisterId2 = reg._id;
                            }
                        }
                    })

                }
            })
            getId = ele._id;
        }
    })

    // const [showModal, setShowModal] = useState(true);


    let getIndex = null;
    let getShiftId0 = null;
    let getShiftId1 = null;
    let getShiftId2 = null;
    let getJobIdOld0 = null;
    let getJobIdOld1 = null;
    let getJobIdOld2 = null;
    let getJobId0, getJobId1, getJobId2 = null;
    let getLishShifts = [];
    let getLishShiftsName = [];
    useEffect(() => {
        shifts.map((ele, idx) => {
            getIndex = shiftCurrentList.indexOf(ele._id);
            if (idx === 0) {
                if (getIndex >= 0) {
                    setValue0(true);
                    getShiftId0 = shiftCurrentList[getIndex];
                    getJobId0 = jobCurrentList[getIndex];
                    getJobIdOld0 = getJobId0;
                } else {
                    setValue0(false);
                    getShiftId0 = ele._id;
                    getJobId0 = jobs[0]._id;
                }
            }
            if (idx === 1) {
                if (getIndex >= 0) {
                    setValue1(true);
                    getShiftId1 = shiftCurrentList[getIndex];
                    getJobId1 = jobCurrentList[getIndex];
                    getJobIdOld1 = getJobId1;
                } else {
                    setValue1(false);
                    getShiftId1 = ele._id;
                    getJobId1 = jobs[0]._id;
                }
            }
            if (idx === 2) {
                if (getIndex >= 0) {
                    setValue2(true);
                    getShiftId2 = shiftCurrentList[getIndex];
                    getJobId2 = jobCurrentList[getIndex];
                    getJobIdOld2 = getJobId2;
                } else {
                    setValue2(false);
                    getShiftId2 = ele._id;
                    getJobId2 = jobs[0]._id;
                }
            }
            getLishShifts.push(ele._id);
            getLishShiftsName.push(ele.shiftName);
        })

        setFormData({
            ...formData,
            id: getId,
            listShifts: getLishShifts,
            listShiftsName: getLishShiftsName,
            dateFrom: moment(dateFrom).format('MM-DD-YYYY'),
            dateTo: moment(dateTo).format('MM-DD-YYYY'),
            // date: moment(currentDay).toDate().toString(),
            date: moment(currentDay).format('MM-DD-YYYY'),
            registerId0: getRegisterId0,
            registerId1: getRegisterId1,
            registerId2: getRegisterId2,
            shiftId0: getShiftId0,
            shiftId1: getShiftId1,
            shiftId2: getShiftId2,
            jobIdOld0: getJobIdOld0,
            jobIdOld1: getJobIdOld1,
            jobIdOld2: getJobIdOld2,
            jobId0: getJobId0,
            jobId1: getJobId1,
            jobId2: getJobId2,
        })
    }, [currentDay, shiftRegisters, count]);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    let elmShifts = jobs.map((ele) => (
        <option value={ele._id}>{ele.jobName}</option>
    ));

    // console.log("get shift list " + JSON.stringify(shiftCurrentList));
    // console.log("get job list " + JSON.stringify(jobCurrentList));

    const onSubmit = (e) => {
        e.preventDefault();

        let getJobCost = 0;
        let getShiftTime = 0;
        let getTypeUserPercentCost = "";
        let getTypeUserIdInUser = "";
        users.filter((ele) => {
            if (ele._id === currentUserLineId) {
                getTypeUserIdInUser = ele.typeUserId;
            };
        })
        typeUsers.filter((ele) => {
            if (ele._id === getTypeUserIdInUser) {
                getTypeUserPercentCost = ele.typeUserPercentCost;
            }
        });

        if (value0 === true) {


            jobs.map((ele) => {
                if (ele._id === formData.jobId0) {
                    return getJobCost = ele.jobCost
                }
            });
            getShiftTime = shifts[0].shiftTime;

            formData.cost0 = getJobCost * getShiftTime * getTypeUserPercentCost / 100;
        } else {
            formData.shiftId0 = null;
        }
        if (value1 === true) {

            jobs.map((ele) => {
                if (ele._id === formData.jobId1) {
                    return getJobCost = ele.jobCost
                }
            });
            getShiftTime = shifts[1].shiftTime;

            formData.cost1 = getJobCost * getShiftTime * getTypeUserPercentCost / 100;
        } else {
            formData.shiftId1 = null;
        }
        if (value2 === true) {

            jobs.map((ele) => {
                if (ele._id === formData.jobId2) {
                    return getJobCost = ele.jobCost
                }
            });
            getShiftTime = shifts[2].shiftTime;

            formData.cost2 = getJobCost * getShiftTime * getTypeUserPercentCost / 100;
        } else {
            formData.shiftId2 = null;
        }

        // Kiểm tra trường hợp Add, Update, Delete
        let getIndex = 0;
        shifts.map((ele, idx) => {
            if (idx === 0) {
                getIndex = shiftCurrentList.indexOf(ele._id);
                if (getIndex >= 0) {
                    if (shiftCurrentList[getIndex] === formData.shiftId0) {
                        if (jobCurrentList[getIndex] === formData.jobId0) {
                            // Không thay đổi
                            formData.shiftFlag0 = "0";
                        } else {
                            // Update
                            formData.shiftFlag0 = "1";
                        }
                    } else {
                        // Delete
                        formData.shiftFlag0 = "3";
                        formData.shiftId0 = shifts[0]._id;
                    }
                } else {
                    if (value0 === true) {
                        // Add
                        formData.shiftFlag0 = "2";
                    } else {
                        // Không đăng kí
                        formData.shiftFlag0 = "0";
                    }
                }
            }
            if (idx === 1) {
                getIndex = shiftCurrentList.indexOf(ele._id);
                if (getIndex >= 0) {
                    if (shiftCurrentList[getIndex] === formData.shiftId1) {
                        if (jobCurrentList[getIndex] === formData.jobId1) {
                            // Không thay đổi
                            formData.shiftFlag1 = "0";
                        } else {
                            // Update
                            formData.shiftFlag1 = "1";
                        }
                    } else {
                        // Delete
                        formData.shiftFlag1 = "3";
                        formData.shiftId1 = shifts[1]._id;
                    }
                } else {
                    if (value1 === true) {
                        // Add
                        formData.shiftFlag1 = "2";
                    } else {
                        // Không đăng kí
                        formData.shiftFlag1 = "0";
                    }
                }
            }
            if (idx === 2) {
                getIndex = shiftCurrentList.indexOf(ele._id);
                if (getIndex >= 0) {
                    if (shiftCurrentList[getIndex] === formData.shiftId2) {
                        if (jobCurrentList[getIndex] === formData.jobId2) {
                            // Không thay đổi
                            formData.shiftFlag2 = "0";
                        } else {
                            // Update
                            formData.shiftFlag2 = "1";
                        }
                    } else {
                        // Delete
                        formData.shiftFlag2 = "3";
                        formData.shiftId2 = shifts[2]._id;
                    }
                } else {
                    if (value2 === true) {
                        // Add
                        formData.shiftFlag2 = "2";
                    } else {
                        // Không đăng kí
                        formData.shiftFlag2 = "0";
                    }
                }
            }
        })

        getIndex = 0;
        personInShift.map((ele) => {
            ele.personShift.map((reg) => {
                getIndex = formData.listShifts.indexOf(reg.shiftId);
                if (getIndex === 0) formData.personInShift0 = reg.personNumber;
                if (getIndex === 1) formData.personInShift1 = reg.personNumber;
                if (getIndex === 2) formData.personInShift2 = reg.personNumber;
            })
        })

        if (user.roles === "User") {
            // Kiểm tra số ca đăng kí có vượt quá số ca cho phép đăng kí của từng nhân viên
            let getShiftNoPermit = permitShiftRegists.find(({ branchId }) => branchId === branchId).shiftNoPermit;
            let countNo = 0;
            if (formData.shiftFlag0 === "2") {
                countNo = countNo + 1;
            }
            if (formData.shiftFlag1 === "2") {
                countNo = countNo + 1;
            }
            if (formData.shiftFlag2 === "2") {
                countNo = countNo + 1;
            }
            if ((countShiftRegistedNo + countNo) > getShiftNoPermit) {
                formData.permitShiftRegistFlag = false;
            } else {
                formData.permitShiftRegistFlag = true;
            }
        }

        updateShiftRegister(formData);
        clearPersonInShift();
        // setShowShiftRegisterModal(0);
        // setShowShiftRegistersModal(false);
    };

    const clearData = () => {
        clearPersonInShift();
        // setShowShiftRegisterModal(0);
        setShowShiftRegistersModal(false);
    }

    return (
        <Fragment>
            <div className="fade modal-backdrop show"></div>
            <div id="responsive-modal" className={`fade modal ${showShiftRegistersModal === true ? "show" : ""}`} tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: showShiftRegistersModal === true ? 'block' : 'none' }} data-backdrop="static"
                data-keyboard="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Đăng kí ca cho ngày </h3>
                            <h3>{" "}(<Moment format="DD/MM">{currentDay}</Moment>)</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => clearData()}>×</button>
                        </div>
                        <form className="form" onSubmit={(e) => onSubmit(e)}>
                            {/* <div className="alert alert-success">
                                Đăng kí thành công
                            </div> */}
                            {/* <AlertShiftRegister /> */}

                            <div className="modal-body">

                                <div class="form-group">
                                    <div className="row">
                                        <Switch
                                            isOn={value0}
                                            onColor="#00c292"
                                            handleToggle={() => setValue0(!value0)}
                                            itemClass={""} />
                                        <div className="col-md-7">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text label-success">{shifts[0].shiftName}</span>
                                                </div>
                                                <select
                                                    disabled={value0 ? "" : "disabled"}
                                                    name="jobId0"
                                                    value={jobId0}
                                                    onChange={(e) => onChange(e)}
                                                    class="form-control custom-select"
                                                >
                                                    {elmShifts}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div className="row">
                                        <Switch
                                            isOn={value1}
                                            onColor="#03a9f3"
                                            handleToggle={() => setValue1(!value1)}
                                            itemClass={"-1"} />
                                        <div className="col-md-7">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text label-info">{shifts[1].shiftName}</span>
                                                </div>
                                                <select
                                                    disabled={value1 ? "" : "disabled"}
                                                    name="jobId1"
                                                    value={jobId1}
                                                    onChange={(e) => onChange(e)}
                                                    class="form-control custom-select"
                                                >
                                                    {elmShifts}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div className="row">
                                        <Switch
                                            isOn={value2}
                                            onColor="#fec107"
                                            handleToggle={() => setValue2(!value2)}
                                            itemClass={"-2"} />
                                        <div className="col-md-7">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text label-warning">{shifts[2].shiftName}</span>
                                                </div>
                                                <select
                                                    disabled={value2 ? "" : "disabled"}
                                                    name="jobId2"
                                                    value={jobId2}
                                                    onChange={(e) => onChange(e)}
                                                    class="form-control custom-select"
                                                >
                                                    {elmShifts}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default waves-effect" data-dismiss="modal" onClick={() => clearData()}>Đóng</button>
                                <button type="submit" className="btn btn-danger waves-effect waves-light">Lưu thay đổi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

ShiftRegisterModal.propTypes = {
    currentDay: PropTypes.object.isRequired,
    dateFrom: PropTypes.object.isRequired,
    dateTo: PropTypes.object.isRequired,
    branchId: PropTypes.object.isRequired,
    userLogin: PropTypes.object.isRequired,
    currentUserLineId: PropTypes.object.isRequired,
    shifts: PropTypes.object.isRequired,
    jobs: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    typeUsers: PropTypes.object.isRequired,
    permitShiftRegists: PropTypes.object.isRequired,
    shiftRegisters: PropTypes.object.isRequired,
    showShiftRegisterModal: PropTypes.object.isRequired,
    count: PropTypes.object.isRequired,
    personInShift: PropTypes.object.isRequired,
    updateShiftRegister: PropTypes.func.isRequired,
    setShowShiftRegisterModal: PropTypes.func.isRequired,
    setShowShiftRegistersModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { updateShiftRegister, clearPersonInShift, setShowShiftRegistersModal })(
    ShiftRegisterModal
);
