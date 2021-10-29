import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import moment from "moment";
import { getShiftRegisters, addUserShiftRegister, deleteUserShiftRegister, setShowShiftRegistersModal, setShowShiftRegistersUserModal } from "../../actions/shiftRegister";
import { setShowAddManagerModal } from "../../actions/shiftRegisterManager";
import { getAllPermitShifts } from "../../actions/permitShiftRegist";
import Spinner from "../layout/Spinner";
import { getPersonInShift, getPreWeekPersonInShift, copyPersonInShifts, getPersonInShiftDate, setValueLoader, viewPersonInShiftArlet } from "../../actions/personInShift";
import { getShiftRegisterManagers } from "../../actions/shiftRegisterManager";
import ShiftRegisterModal from "./shiftRegisters/ShiftRegisterModal";
import UpdateDeleteUserModal from "./update-deleteUser/UpdateDeleteUserModal";
import AddUserForm from "./addUser-forms/AddUserForm";
import AddManagerModal from "./addUpdateDeleteManager/AddManagerModal";
import ExportExcel from "./exportExcelFile/ExportExcel";

const TabContent = ({
    activeTab,
    startDate,
    endDate,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    shifts,
    users,
    userLogin,
    jobs,
    branchs,
    typeUsers,
    getShiftRegisters,
    addUserShiftRegister,
    deleteUserShiftRegister,
    getPersonInShift,
    getPreWeekPersonInShift,
    getPersonInShiftDate,
    getShiftRegisterManagers,
    copyPersonInShifts,
    getAllPermitShifts,
    setValueLoader,
    viewPersonInShiftArlet,
    shiftRegister: { shiftRegisters, showShiftRegistersModal, showUpdateOrDeleteUserModal, shiftRegisterLoader },
    shiftRegisterManager: { shiftRegisterManagers, showAddManagerModal },
    personInShift: { personInShifts, personInShiftsPrevWeek, personInShift, loader },
    auth: { user },
    permitShiftRegist: { permitShiftRegists },
    setShowShiftRegistersModal,
    setShowShiftRegistersUserModal,
    setShowAddManagerModal,
}) => {

    let branchId = null;
    let getUsers = null;
    let elmShiftRegisters = [];
    let elmPersonInShifts = [];
    let elmShiftRegisterManagers = [];
    let findUser = null;

    // Kiểm tra xem user đã tạo đăng kí ca của tuần hiện tại chưa
    let checkExistUserInShiftRegister = null;

    // 0 : Không hiển thị ; 1: Hiển thị
    const [addButton, setAddButton] = useState(0);
    const [deleteButton, setDeleteButton] = useState(0);

    // const [showShiftRegisterModal, setShowShiftRegisterModal] = useState(0);

    // const [showUpdateOrDeleteModal, setShowUpdateOrDeleteModal] = useState(0);

    // const [showAddManagerModal, setShowAddManagerModal] = useState(0);

    const [showButtonCopyPersonInShift, setShowButtonCopyPersonInShift] = useState("0");

    const [dayRegist, setDayRegist] = useState(0);

    const [viewFormPersonInShiftRegist, setViewFormPersonInShiftRegist] = useState(false);

    // Tạo biến này để mỗi lần gọi ShiftRegisterModal giá trị sẽ được reset
    // UseEffect bên ShiftRegisterModal sẽ chạy lại
    const [count, setCount] = useState(0);

    const [countCallUpdateDeleteUserModal, setCountCallUpdateDeleteUserModal] = useState(0);

    const [countCallAddManagerModal, setCountCallAddManagerModal] = useState(0);

    const [createBranchId, setCreateBranchId] = useState("");

    const [currentUserId, setCurrentUserId] = useState("");

    const [idUpdate, setIdUpdate] = useState("");

    const [currentDay, setCurrentDay] = useState(0);

    useEffect(() => {
        if (branchs.length > 0) {
            branchs.map((ele, idx) => {
                if (idx === activeTab) {
                    return branchId = ele._id
                }
            });
            if (branchs && branchId !== null) {
                setCreateBranchId(branchId);
            }
            getPersonInShift(branchId, moment(startDate).format('MM-DD-YYYY'), moment(endDate).format('MM-DD-YYYY'));
            getPreWeekPersonInShift(branchId, moment(startDate).subtract(7, "days").format('MM-DD-YYYY'), moment(endDate).subtract(7, "days").format('MM-DD-YYYY'));
            getShiftRegisters(branchId, moment(startDate).format('MM-DD-YYYY'), moment(endDate).format('MM-DD-YYYY'));
            getShiftRegisterManagers(branchId, moment(startDate).format('MM-DD-YYYY'), moment(endDate).format('MM-DD-YYYY'));
            setViewFormPersonInShiftRegist(false);
        }
    }, [activeTab, branchs]);

    useEffect(() => {
        if (personInShifts.length > 0) {
            setShowButtonCopyPersonInShift("0");
        } else {
            setShowButtonCopyPersonInShift("1");
        }
    }, [personInShifts]);

    useEffect(() => {
        getAllPermitShifts();
    }, []);

    useEffect(() => {
        if (moment(startDate).format('MM-DD-YYYY') > moment().startOf("isoWeek").format('MM-DD-YYYY')
            && userLogin.roles !== "Admin") {
            shiftRegisters.map((ele) => {
                if (ele.userId === userLogin._id && ele.branchId === branchs[activeTab]._id) {
                    return findUser = ele._id;
                }
            });

            if (findUser) {
                setDeleteButton(1);
                setAddButton(0);
            } else {
                setAddButton(1);
                setDeleteButton(0);
            }
        }
    }, [shiftRegisters]);

    // Initial variable
    let totalShiftsNum = [];
    let totalLackShiftsNum = [];
    let totalShiftsNumRule = [];
    for (let i = 0; i < shifts.length * 7; i++) {
        totalShiftsNum.push(0);
        totalLackShiftsNum.push(0);
        totalShiftsNumRule.push(0);
    }

    let classNameListMon = [];
    let classNameListTue = [];
    let classNameListWed = [];
    let classNameListThu = [];
    let classNameListFri = [];
    let classNameListSat = [];
    let classNameListSun = [];
    let valueListMon = [];
    let valueListTue = [];
    let valueListWed = [];
    let valueListThu = [];
    let valueListFri = [];
    let valueListSat = [];
    let valueListSun = [];

    let className = null;

    let listJobsModal = [];
    let listShiftsModal = [];

    let index = null;
    let jobIndex = null;

    let eleMon = [];
    let eleTue = [];
    let eleWed = [];
    let eleThu = [];
    let eleFri = [];
    let eleSat = [];
    let eleSun = [];

    const resetData = () => {
        classNameListMon = [];
        classNameListTue = [];
        classNameListWed = [];
        classNameListThu = [];
        classNameListFri = [];
        classNameListSat = [];
        classNameListSun = [];
        valueListMon = [];
        valueListTue = [];
        valueListWed = [];
        valueListThu = [];
        valueListFri = [];
        valueListSat = [];
        valueListSun = [];
        for (let i = 0; i < shifts.length; i++) {
            classNameListMon.push(" ");
            valueListMon.push("0");

            classNameListTue.push(" ");
            valueListTue.push("0");

            classNameListWed.push(" ");
            valueListWed.push("0");

            classNameListThu.push(" ");
            valueListThu.push("0");

            classNameListFri.push(" ");
            valueListFri.push("0");

            classNameListSat.push(" ");
            valueListSat.push("0");

            classNameListSun.push(" ");
            valueListSun.push("0");
        }
    }

    resetData();
    /* Start Create view Get Person In Shift */
    personInShifts.map((ele) => {
        ele.personShift.map((reg) => {
            index = shifts.findIndex(x => x._id === reg.shiftId);
            if (index === 0) {
                className = "label label-success";
            }
            if (index === 1) {
                className = "label label-info";
            }
            if (index === 2) {
                className = "label label-warning";
            }
            if (index === 3) {
                className = "label label-warning";
            }
            if (index === 4) {
                className = "label label-warning";
            }
            if (index === 5) {
                className = "label label-warning";
            }
            if (index === 6) {
                className = "label label-warning";
            }
            if (index === 7) {
                className = "label label-warning";
            }
            if (index === 8) {
                className = "label label-warning";
            }
            if (index === 9) {
                className = "label label-warning";
            }

            if (moment(ele.date).format('MM-DD-YYYY') === moment(monday).format('MM-DD-YYYY')) {
                classNameListMon[index] = className;
                valueListMon[index] = reg.personNumber;
                totalShiftsNumRule[index] = reg.personNumber;
            }
            if (moment(ele.date).format('MM-DD-YYYY') === moment(tuesday).format('MM-DD-YYYY')) {
                classNameListTue[index] = className;
                valueListTue[index] = reg.personNumber;
                totalShiftsNumRule[index + 3] = reg.personNumber;
            }
            if (moment(ele.date).format('MM-DD-YYYY') === moment(wednesday).format('MM-DD-YYYY')) {
                classNameListWed[index] = className;
                valueListWed[index] = reg.personNumber;
                totalShiftsNumRule[index + 6] = reg.personNumber;
            }
            if (moment(ele.date).format('MM-DD-YYYY') === moment(thursday).format('MM-DD-YYYY')) {
                classNameListThu[index] = className;
                valueListThu[index] = reg.personNumber;
                totalShiftsNumRule[index + 9] = reg.personNumber;
            }
            if (moment(ele.date).format('MM-DD-YYYY') === moment(friday).format('MM-DD-YYYY')) {
                classNameListFri[index] = className;
                valueListFri[index] = reg.personNumber;
                totalShiftsNumRule[index + 12] = reg.personNumber;
            }
            if (moment(ele.date).format('MM-DD-YYYY') === moment(saturday).format('MM-DD-YYYY')) {
                classNameListSat[index] = className;
                valueListSat[index] = reg.personNumber;
                totalShiftsNumRule[index + 15] = reg.personNumber;
            }
            if (moment(ele.date).format('MM-DD-YYYY') === moment(sunday).format('MM-DD-YYYY')) {
                classNameListSun[index] = className;
                valueListSun[index] = reg.personNumber;
                totalShiftsNumRule[index + 18] = reg.personNumber;
            }
        })
    });

    // console.log("in ra " + JSON.stringify(classNameListTue) + " - " + valueListTue);
    valueListMon.map((ele, idx) => {
        if (idx === 0) {
            className = "label label-success";
        }
        if (idx === 1) {
            className = "label label-info";
        }
        if (idx === 2) {
            className = "label label-warning";
        }
        if (ele !== null) {
            eleMon.push(<span className={className}>{shifts[idx].shiftName}{" - "}{ele}</span>)
        } else {
            eleMon.push(<span className={className}>{shifts[idx].shiftName}{" - "}{"0"}</span>)
        }
    });
    valueListTue.map((ele, idx) => {
        if (idx === 0) {
            className = "label label-success";
        }
        if (idx === 1) {
            className = "label label-info";
        }
        if (idx === 2) {
            className = "label label-warning";
        }
        if (ele) {
            eleTue.push(<span className={className}>{shifts[idx].shiftName}{" - "}{ele}</span>)
        } else {
            eleTue.push(<span className={className}>{shifts[idx].shiftName}{" - "}{"0"}</span>)
        }
    });
    valueListWed.map((ele, idx) => {
        if (idx === 0) {
            className = "label label-success";
        }
        if (idx === 1) {
            className = "label label-info";
        }
        if (idx === 2) {
            className = "label label-warning";
        }
        if (ele !== null) {
            eleWed.push(<span className={className}>{shifts[idx].shiftName}{" - "}{ele}</span>)
        } else {
            eleWed.push(<span className={className}>{shifts[idx].shiftName}{" - "}{"0"}</span>)
        }
    });
    valueListThu.map((ele, idx) => {
        if (idx === 0) {
            className = "label label-success";
        }
        if (idx === 1) {
            className = "label label-info";
        }
        if (idx === 2) {
            className = "label label-warning";
        }
        if (ele !== null) {
            eleThu.push(<span className={className}>{shifts[idx].shiftName}{" - "}{ele}</span>)
        } else {
            eleThu.push(<span className={className}>{shifts[idx].shiftName}{" - "}{"0"}</span>)
        }
    });
    valueListFri.map((ele, idx) => {
        if (idx === 0) {
            className = "label label-success";
        }
        if (idx === 1) {
            className = "label label-info";
        }
        if (idx === 2) {
            className = "label label-warning";
        }
        if (ele !== null) {
            eleFri.push(<span className={className}>{shifts[idx].shiftName}{" - "}{ele}</span>)
        } else {
            eleFri.push(<span className={className}>{shifts[idx].shiftName}{" - "}{"0"}</span>)
        }
    });
    valueListSat.map((ele, idx) => {
        if (idx === 0) {
            className = "label label-success";
        }
        if (idx === 1) {
            className = "label label-info";
        }
        if (idx === 2) {
            className = "label label-warning";
        }
        if (ele !== null) {
            eleSat.push(<span className={className}>{shifts[idx].shiftName}{" - "}{ele}</span>)
        } else {
            eleSat.push(<span className={className}>{shifts[idx].shiftName}{" - "}{"0"}</span>)
        }
    });
    valueListSun.map((ele, idx) => {
        if (idx === 0) {
            className = "label label-success";
        }
        if (idx === 1) {
            className = "label label-info";
        }
        if (idx === 2) {
            className = "label label-warning";
        }
        if (ele !== null) {
            eleSun.push(<span className={className}>{shifts[idx].shiftName}{" - "}{ele}</span>)
        } else {
            eleSun.push(<span className={className}>{shifts[idx].shiftName}{" - "}{"0"}</span>)
        }
    });

    classNameListMon = [];
    classNameListTue = [];
    classNameListWed = [];
    classNameListThu = [];
    classNameListFri = [];
    classNameListSat = [];
    classNameListSun = [];

    classNameListMon.push(
        <div class="card-shiftRegister col-md-1-5">
            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 2">
                <div class="col-salary-md-5"></div>
                <div class="col-salary-md-7">
                    <p class="text-center font-medium m-b-0">{eleMon}</p>
                </div>
            </div>
            <div class="card-body-shiftRegister text-center hiddenContent-2">
                <p class="text-center font-medium m-b-0">{eleMon}</p>
            </div>
        </div>
    );
    classNameListTue.push(
        <div class="card-shiftRegister col-md-1-5">
            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 3">
                <div class="col-salary-md-5"></div>
                <div class="col-salary-md-7">
                    <p class="text-center font-medium m-b-0">{eleTue}</p>
                </div>
            </div>
            <div class="card-body-shiftRegister text-center hiddenContent-2">
                <p class="text-center font-medium m-b-0">{eleTue}</p>
            </div>
        </div>
    );
    classNameListWed.push(
        <div class="card-shiftRegister col-md-1-5">
            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 4">
                <div class="col-salary-md-5"></div>
                <div class="col-salary-md-7">
                    <p class="text-center font-medium m-b-0">{eleWed}</p>
                </div>
            </div>
            <div class="card-body-shiftRegister text-center hiddenContent-2">
                <p class="text-center font-medium m-b-0">{eleWed}</p>
            </div>
        </div>
    );
    classNameListThu.push(
        <div class="card-shiftRegister col-md-1-5">
            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 5">
                <div class="col-salary-md-5"></div>
                <div class="col-salary-md-7">
                    <p class="text-center font-medium m-b-0">{eleThu}</p>
                </div>
            </div>
            <div class="card-body-shiftRegister text-center hiddenContent-2">
                <p class="text-center font-medium m-b-0">{eleThu}</p>
            </div>
        </div>
    );
    classNameListFri.push(
        <div class="card-shiftRegister col-md-1-5">
            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 6">
                <div class="col-salary-md-5"></div>
                <div class="col-salary-md-7">
                    <p class="text-center font-medium m-b-0">{eleFri}</p>
                </div>
            </div>
            <div class="card-body-shiftRegister text-center hiddenContent-2">
                <p class="text-center font-medium m-b-0">{eleFri}</p>
            </div>
        </div>
    );
    classNameListSat.push(
        <div class="card-shiftRegister col-md-1-5">
            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 7">
                <div class="col-salary-md-5"></div>
                <div class="col-salary-md-7">
                    <p class="text-center font-medium m-b-0">{eleSat}</p>
                </div>
            </div>
            <div class="card-body-shiftRegister text-center hiddenContent-2">
                <p class="text-center font-medium m-b-0">{eleSat}</p>
            </div>
        </div>
    );
    classNameListSun.push(
        <div class="card-shiftRegister col-md-1-5">
            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Chủ nhật">
                <div class="col-salary-md-5"></div>
                <div class="col-salary-md-7">
                    <p class="text-center font-medium m-b-0">{eleSun}</p>
                </div>
            </div>
            <div class="card-body-shiftRegister text-center hiddenContent-2">
                <p class="text-center font-medium m-b-0">{eleSun}</p>
            </div>
        </div>
    );

    elmPersonInShifts.push(
        <div class="card-group-shiftRegister">

            <div class="card-shiftRegister col-md-4-5" style={{ background: "#ab8ce4" }}>
                <div class="card-body-shiftRegister">
                    <p class="font-medium m-b-0">Số người trong ca</p>

                </div>
                <div class="box b-t text-center"></div>
            </div>

            {classNameListMon}
            {classNameListTue}
            {classNameListWed}
            {classNameListThu}
            {classNameListFri}
            {classNameListSat}
            {classNameListSun}

            <div class="card-shiftRegister col-md-1-5">
                <div class="card-body-shiftRegister text-center">
                    <p class="text-center font-medium m-b-0"></p>
                </div>
            </div>

        </div>
    );


    /* End Create view Get Person In Shift */

    resetData();
    let countGridRecord = 0;
    let saveUserId = [];
    let totalAmount = 0;
    let checkViewListFlag = 0;
    if (shiftRegisters.length > 0 && shifts.length > 0 && jobs.length > 0) {
        shiftRegisters.map((ele) => {
            getUsers = users.find(({ _id }) => _id === ele.userId);
            saveUserId.push(ele.userId);
            // Reset lương
            totalAmount = 0;
            resetData();
            ele.register.map((reg) => {
                totalAmount = totalAmount + reg.cost;
                index = shifts.findIndex(x => x._id === reg.shiftId);
                jobIndex = jobs.findIndex(x => x._id === reg.jobId);
                if (index === 0) {
                    className = "label label-success";
                }
                if (index === 1) {
                    className = "label label-info";
                }
                if (index === 2) {
                    className = "label label-warning";
                }

                if (moment(reg.date).format('MM-DD-YYYY') === moment(monday).format('MM-DD-YYYY')) {
                    if (index === 0) {
                        totalShiftsNum[0] = totalShiftsNum[0] + 1;
                    }
                    if (index === 1) {
                        totalShiftsNum[1] = totalShiftsNum[1] + 1;
                    }
                    if (index === 2) {
                        totalShiftsNum[2] = totalShiftsNum[2] + 1;
                    }
                    classNameListMon[index] = className;
                    valueListMon[index] = jobs[jobIndex].jobName;
                }
                if (moment(reg.date).format('MM-DD-YYYY') === moment(tuesday).format('MM-DD-YYYY')) {
                    if (index === 0) {
                        totalShiftsNum[3] = totalShiftsNum[3] + 1;
                    }
                    if (index === 1) {
                        totalShiftsNum[4] = totalShiftsNum[4] + 1;
                    }
                    if (index === 2) {
                        totalShiftsNum[5] = totalShiftsNum[5] + 1;
                    }
                    classNameListTue[index] = className;
                    valueListTue[index] = jobs[jobIndex].jobName;
                }
                if (moment(reg.date).format('MM-DD-YYYY') === moment(wednesday).format('MM-DD-YYYY')) {
                    if (index === 0) {
                        totalShiftsNum[6] = totalShiftsNum[6] + 1;
                    }
                    if (index === 1) {
                        totalShiftsNum[7] = totalShiftsNum[7] + 1;
                    }
                    if (index === 2) {
                        totalShiftsNum[8] = totalShiftsNum[8] + 1;
                    }
                    classNameListWed[index] = className;
                    valueListWed[index] = jobs[jobIndex].jobName;
                }
                if (moment(reg.date).format('MM-DD-YYYY') === moment(thursday).format('MM-DD-YYYY')) {
                    if (index === 0) {
                        totalShiftsNum[9] = totalShiftsNum[9] + 1;
                    }
                    if (index === 1) {
                        totalShiftsNum[10] = totalShiftsNum[10] + 1;
                    }
                    if (index === 2) {
                        totalShiftsNum[11] = totalShiftsNum[11] + 1;
                    }
                    classNameListThu[index] = className;
                    valueListThu[index] = jobs[jobIndex].jobName;
                }
                if (moment(reg.date).format('MM-DD-YYYY') === moment(friday).format('MM-DD-YYYY')) {
                    if (index === 0) {
                        totalShiftsNum[12] = totalShiftsNum[12] + 1;
                    }
                    if (index === 1) {
                        totalShiftsNum[13] = totalShiftsNum[13] + 1;
                    }
                    if (index === 2) {
                        totalShiftsNum[14] = totalShiftsNum[14] + 1;
                    }
                    classNameListFri[index] = className;
                    valueListFri[index] = jobs[jobIndex].jobName;
                }
                if (moment(reg.date).format('MM-DD-YYYY') === moment(saturday).format('MM-DD-YYYY')) {
                    if (index === 0) {
                        totalShiftsNum[15] = totalShiftsNum[15] + 1;
                    }
                    if (index === 1) {
                        totalShiftsNum[16] = totalShiftsNum[16] + 1;
                    }
                    if (index === 2) {
                        totalShiftsNum[17] = totalShiftsNum[17] + 1;
                    }
                    classNameListSat[index] = className;
                    valueListSat[index] = jobs[jobIndex].jobName;
                }
                if (moment(reg.date).format('MM-DD-YYYY') === moment(sunday).format('MM-DD-YYYY')) {
                    if (index === 0) {
                        totalShiftsNum[18] = totalShiftsNum[18] + 1;
                    }
                    if (index === 1) {
                        totalShiftsNum[19] = totalShiftsNum[19] + 1;
                    }
                    if (index === 2) {
                        totalShiftsNum[20] = totalShiftsNum[20] + 1;
                    }
                    classNameListSun[index] = className;
                    valueListSun[index] = jobs[jobIndex].jobName;
                }
            })

            let eleMon = [];
            let eleTue = [];
            let eleWed = [];
            let eleThu = [];
            let eleFri = [];
            let eleSat = [];
            let eleSun = [];
            classNameListMon.map((ele, idx) => {
                if (ele !== " ") {
                    eleMon.push(<span className={ele}>{valueListMon[idx]}</span>)
                } else {
                    eleMon.push(<span className="label">AAAA</span>)
                }
            });
            classNameListTue.map((ele, idx) => {
                if (ele !== " ") {
                    eleTue.push(<span className={ele}>{valueListTue[idx]}</span>)
                } else {
                    eleTue.push(<span className="label">AAAA</span>)
                }
            });
            classNameListWed.map((ele, idx) => {
                if (ele !== " ") {
                    eleWed.push(<span className={ele}>{valueListWed[idx]}</span>)
                } else {
                    eleWed.push(<span className="label">AAAA</span>)
                }
            });
            classNameListThu.map((ele, idx) => {
                if (ele !== " ") {
                    eleThu.push(<span className={ele}>{valueListThu[idx]}</span>)
                } else {
                    eleThu.push(<span className="label">AAAA</span>)
                }
            });
            classNameListFri.map((ele, idx) => {
                if (ele !== " ") {
                    eleFri.push(<span className={ele}>{valueListFri[idx]}</span>)
                } else {
                    eleFri.push(<span className="label">AAAA</span>)
                }
            });
            classNameListSat.map((ele, idx) => {
                if (ele !== " ") {
                    eleSat.push(<span className={ele}>{valueListSat[idx]}</span>)
                } else {
                    eleSat.push(<span className="label">AAAA</span>)
                }
            });
            classNameListSun.map((ele, idx) => {
                if (ele !== " ") {
                    eleSun.push(<span className={ele}>{valueListSun[idx]}</span>)
                } else {
                    eleSun.push(<span className="label">AAAA</span>)
                }
            });

            classNameListMon = [];
            classNameListTue = [];
            classNameListWed = [];
            classNameListThu = [];
            classNameListFri = [];
            classNameListSat = [];
            classNameListSun = [];

            if (getUsers && userLogin) {
                if ((getUsers._id === userLogin._id
                    && moment(startDate).format('MM-DD-YYYY') > moment().startOf("isoWeek").format('MM-DD-YYYY'))
                    || userLogin.roles === "Admin") {
                    classNameListMon.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 2">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <div class="el-element-overlay">
                                        <div class="card-body-shiftRegister text-center">
                                            <div class="el-card-item">
                                                <div class="el-card-avatar el-overlay-1">
                                                    <p class="text-center font-medium m-b-0">{eleMon}</p>
                                                    <div class="el-overlay">
                                                        <ul class="el-info">
                                                            <li>
                                                                <a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(monday, eleMon, ele.userId)}><i class="ti-plus"></i></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <div class="el-element-overlay">
                                    <div class="card-body-shiftRegister text-center">
                                        <div class="el-card-item">
                                            <div class="el-card-avatar el-overlay-1">
                                                <p class="text-center font-medium m-b-0">{eleMon}</p>
                                                <div class="el-overlay">
                                                    <ul class="el-info">
                                                        <li>
                                                            <a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(monday, eleMon, ele.userId)}><i class="ti-plus"></i></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="el-element-overlay">
                                <div class="card-body-shiftRegister text-center">
                                    <div class="el-card-item">
                                        <div class="el-card-avatar el-overlay-1">
                                            <p class="text-center font-medium m-b-0">{eleMon}</p>
                                            <div class="el-overlay">
                                                <ul class="el-info">
                                                    <li>
                                                        <a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(monday, eleMon, ele.userId)}><i class="ti-plus"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    );
                    classNameListTue.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 3">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <div class="el-element-overlay">
                                        <div class="card-body-shiftRegister text-center">
                                            <div class="el-card-item">
                                                <div class="el-card-avatar el-overlay-1">
                                                    <p class="text-center font-medium m-b-0">{eleTue}</p>
                                                    <div class="el-overlay">
                                                        <ul class="el-info">
                                                            <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(tuesday, eleTue, ele.userId)}><i class="ti-plus"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <div class="el-element-overlay">
                                    <div class="card-body-shiftRegister text-center">
                                        <div class="el-card-item">
                                            <div class="el-card-avatar el-overlay-1">
                                                <p class="text-center font-medium m-b-0">{eleTue}</p>
                                                <div class="el-overlay">
                                                    <ul class="el-info">
                                                        <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(tuesday, eleTue, ele.userId)}><i class="ti-plus"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                    classNameListWed.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 4">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <div class="el-element-overlay">
                                        <div class="card-body-shiftRegister text-center">
                                            <div class="el-card-item">
                                                <div class="el-card-avatar el-overlay-1">
                                                    <p class="text-center font-medium m-b-0">{eleWed}</p>
                                                    <div class="el-overlay">
                                                        <ul class="el-info">
                                                            <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(wednesday, eleWed, ele.userId)}><i class="ti-plus"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <div class="el-element-overlay">
                                    <div class="card-body-shiftRegister text-center">
                                        <div class="el-card-item">
                                            <div class="el-card-avatar el-overlay-1">
                                                <p class="text-center font-medium m-b-0">{eleWed}</p>
                                                <div class="el-overlay">
                                                    <ul class="el-info">
                                                        <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(wednesday, eleWed, ele.userId)}><i class="ti-plus"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                    classNameListThu.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 5">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <div class="el-element-overlay">
                                        <div class="card-body-shiftRegister text-center">
                                            <div class="el-card-item">
                                                <div class="el-card-avatar el-overlay-1">
                                                    <p class="text-center font-medium m-b-0">{eleThu}</p>
                                                    <div class="el-overlay">
                                                        <ul class="el-info">
                                                            <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(thursday, eleThu, ele.userId)}><i class="ti-plus"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <div class="el-element-overlay">
                                    <div class="card-body-shiftRegister text-center">
                                        <div class="el-card-item">
                                            <div class="el-card-avatar el-overlay-1">
                                                <p class="text-center font-medium m-b-0">{eleThu}</p>
                                                <div class="el-overlay">
                                                    <ul class="el-info">
                                                        <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(thursday, eleThu, ele.userId)}><i class="ti-plus"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                    classNameListFri.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 6">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <div class="el-element-overlay">
                                        <div class="card-body-shiftRegister text-center">
                                            <div class="el-card-item">
                                                <div class="el-card-avatar el-overlay-1">
                                                    <p class="text-center font-medium m-b-0">{eleFri}</p>
                                                    <div class="el-overlay">
                                                        <ul class="el-info">
                                                            <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(friday, eleFri, ele.userId)}><i class="ti-plus"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <div class="el-element-overlay">
                                    <div class="card-body-shiftRegister text-center">
                                        <div class="el-card-item">
                                            <div class="el-card-avatar el-overlay-1">
                                                <p class="text-center font-medium m-b-0">{eleFri}</p>
                                                <div class="el-overlay">
                                                    <ul class="el-info">
                                                        <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(friday, eleFri, ele.userId)}><i class="ti-plus"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                    classNameListSat.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 7">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <div class="el-element-overlay">
                                        <div class="card-body-shiftRegister text-center">
                                            <div class="el-card-item">
                                                <div class="el-card-avatar el-overlay-1">
                                                    <p class="text-center font-medium m-b-0">{eleSat}</p>
                                                    <div class="el-overlay">
                                                        <ul class="el-info">
                                                            <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(saturday, eleSat, ele.userId)}><i class="ti-plus"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <div class="el-element-overlay">
                                    <div class="card-body-shiftRegister text-center">
                                        <div class="el-card-item">
                                            <div class="el-card-avatar el-overlay-1">
                                                <p class="text-center font-medium m-b-0">{eleSat}</p>
                                                <div class="el-overlay">
                                                    <ul class="el-info">
                                                        <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(saturday, eleSat, ele.userId)}><i class="ti-plus"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                    classNameListSun.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Chủ nhật">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <div class="el-element-overlay">
                                        <div class="card-body-shiftRegister text-center">
                                            <div class="el-card-item">
                                                <div class="el-card-avatar el-overlay-1">
                                                    <p class="text-center font-medium m-b-0">{eleSun}</p>
                                                    <div class="el-overlay">
                                                        <ul class="el-info">
                                                            <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(sunday, eleSun, ele.userId)}><i class="ti-plus"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <div class="el-element-overlay">
                                    <div class="card-body-shiftRegister text-center">
                                        <div class="el-card-item">
                                            <div class="el-card-avatar el-overlay-1">
                                                <p class="text-center font-medium m-b-0">{eleSun}</p>
                                                <div class="el-overlay">
                                                    <ul class="el-info">
                                                        <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal" onClick={() => onPutShiftRegister(sunday, eleSun, ele.userId)}><i class="ti-plus"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    classNameListMon.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 2">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{eleMon}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{eleMon}</p>
                            </div>
                        </div>
                    );
                    classNameListTue.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 3">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{eleTue}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{eleTue}</p>
                            </div>
                        </div>
                    );
                    classNameListWed.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 4">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{eleWed}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{eleWed}</p>
                            </div>
                        </div>
                    );
                    classNameListThu.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 5">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{eleThu}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{eleThu}</p>
                            </div>
                        </div>
                    );
                    classNameListFri.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 6">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{eleFri}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{eleFri}</p>
                            </div>
                        </div>
                    );
                    classNameListSat.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 7">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{eleSat}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{eleSat}</p>
                            </div>
                        </div>
                    );
                    classNameListSun.push(
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Chủ nhật">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{eleSun}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{eleSun}</p>
                            </div>
                        </div>
                    );
                }
            }

            if (user.roles === "User") {
                // Đăng kí ca cho tuần sau
                if (moment().startOf("isoWeek").add(7, "days").format('MM-DD-YYYY') === moment(monday).format('MM-DD-YYYY')) {
                    if (user._id === getUsers._id) {
                        // Hiển thị chỉ một mình user đăng nhập
                        checkViewListFlag = 1;
                    }
                } else {
                    // Hiển thị tất cả các user
                    checkViewListFlag = 2;
                }
            } else {
                // Hiển thị tất cả các user
                checkViewListFlag = 2;
            }

            if (checkViewListFlag === 1) {
                // Chỉ cho phép add 1 lần đầu tiên đối với user đang đăng nhập
                checkViewListFlag = 0;
                elmShiftRegisters.push(
                    <div class="card-group-shiftRegister">

                        <div class="card-shiftRegister col-md-4-5">
                            <div class="card-body-shiftRegister">
                                {/* <div className="row">
                                    <div className="col-md-9-5">
                                        <p class="font-medium m-b-0" style={{ color: "black" }}>{getUsers.name}</p>
                                    </div>
                                    <div className="col-md-2">
                                        {user.roles !== "User" ? (
                                            <a class="btn btn-sm btn-info"
                                                data-toggle="modal" data-target="#responsive-modal-UpdateDeleteUser"
                                                onClick={() => onUpdateOrDeleteUser(ele.userId)} >
                                                <i class="far fa-edit"></i>
                                            </a>
                                        ) : ""}
                                    </div>
                                </div> */}
                                <div className="rowShiftRegisterForNameColumn">
                                    <div className="col-md-9-5">
                                        <p class="font-medium m-b-0" style={{ color: "black" }}>{getUsers.name}</p>
                                    </div>
                                    <div className="col-md-2-4">
                                        {user.roles !== "User" ? (
                                            <a class="btn btn-sm btn-info"
                                                data-toggle="modal" data-target="#responsive-modal-UpdateDeleteUser"
                                                onClick={() => onUpdateOrDeleteUser(ele.userId)} >
                                                <i class="far fa-edit"></i>
                                            </a>
                                        ) : ""}
                                    </div>
                                </div>

                            </div>
                            <div class="box b-t text-center"></div>
                        </div>

                        {classNameListMon}
                        {classNameListTue}
                        {classNameListWed}
                        {classNameListThu}
                        {classNameListFri}
                        {classNameListSat}
                        {classNameListSun}

                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegisterForSalaryColumn viewHeaderDay hiddenContent-1" data-label="Lương">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-right font-medium m-b-0" style={{ color: "black" }}>{totalAmount.toLocaleString()}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-right hiddenContent-2">
                                <p class="text-right font-medium m-b-0" style={{ color: "black" }}>{totalAmount.toLocaleString()}</p>
                            </div>
                        </div>

                    </div>
                );
            }

            if (checkViewListFlag === 2) {
                elmShiftRegisters.push(
                    <div class="card-group-shiftRegister">

                        <div class="card-shiftRegister col-md-4-5">
                            <div class="card-body-shiftRegister">
                                <div className="rowShiftRegisterForNameColumn">
                                    <div className="col-md-9-5">
                                        <p class="font-medium m-b-0" style={{ color: "black" }}>{getUsers.name}</p>
                                    </div>
                                    <div className="col-md-2-4">
                                        {user.roles !== "User" ? (
                                            <a class="btn btn-sm btn-info"
                                                data-toggle="modal" data-target="#responsive-modal-UpdateDeleteUser"
                                                onClick={() => onUpdateOrDeleteUser(ele.userId)} >
                                                <i class="far fa-edit"></i>
                                            </a>
                                        ) : ""}
                                    </div>
                                </div>
                                {/* <div className="row">
                                    <div className="col-salary-md-8">
                                        <p class="font-medium m-b-0" style={{ color: "black" }}>{getUsers.name}</p>
                                    </div>
                                    <div className="col-salary-md-4">
                                        {user.roles !== "User" ? (
                                            <a class="btn btn-sm btn-info"
                                                data-toggle="modal" data-target="#responsive-modal-UpdateDeleteUser"
                                                onClick={() => onUpdateOrDeleteUser(ele.userId)} >
                                                <i class="far fa-edit"></i>
                                            </a>
                                        ) : ""}
                                    </div>
                                </div> */}
                            </div>
                            <div class="box b-t text-center"></div>
                        </div>

                        {classNameListMon}
                        {classNameListTue}
                        {classNameListWed}
                        {classNameListThu}
                        {classNameListFri}
                        {classNameListSat}
                        {classNameListSun}

                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegisterForSalaryColumn viewHeaderDay hiddenContent-1" data-label="Lương">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-right font-medium m-b-0" style={{ color: "black" }}>{totalAmount.toLocaleString()}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-right hiddenContent-2">
                                <p class="text-right font-medium m-b-0" style={{ color: "black" }}>{totalAmount.toLocaleString()}</p>
                            </div>
                        </div>

                    </div>
                );
            }

            countGridRecord = countGridRecord + 1;
        });
    }

    // Tính toán ca thiếu
    totalShiftsNumRule.map((ele, idx) => {
        totalLackShiftsNum[idx] = ele - totalShiftsNum[idx];
    })

    classNameListMon = [];
    classNameListTue = [];
    classNameListWed = [];
    classNameListThu = [];
    classNameListFri = [];
    classNameListSat = [];
    classNameListSun = [];
    shifts.map((ele, idx) => {
        if (idx === 0) {
            classNameListMon.push(<span className="label label-success">{ele.shiftName} - {totalShiftsNum[0]} - {totalLackShiftsNum[0]}</span>);
            classNameListTue.push(<span className="label label-success">{ele.shiftName} - {totalShiftsNum[3]} - {totalLackShiftsNum[3]}</span>);
            classNameListWed.push(<span className="label label-success">{ele.shiftName} - {totalShiftsNum[6]} - {totalLackShiftsNum[6]}</span>);
            classNameListThu.push(<span className="label label-success">{ele.shiftName} - {totalShiftsNum[9]} - {totalLackShiftsNum[9]}</span>);
            classNameListFri.push(<span className="label label-success">{ele.shiftName} - {totalShiftsNum[12]} - {totalLackShiftsNum[12]}</span>);
            classNameListSat.push(<span className="label label-success">{ele.shiftName} - {totalShiftsNum[15]} - {totalLackShiftsNum[15]}</span>);
            classNameListSun.push(<span className="label label-success">{ele.shiftName} - {totalShiftsNum[18]} - {totalLackShiftsNum[18]}</span>);
        }
        if (idx === 1) {
            classNameListMon.push(<span className="label label-info">{ele.shiftName} - {totalShiftsNum[1]} - {totalLackShiftsNum[1]}</span>);
            classNameListTue.push(<span className="label label-info">{ele.shiftName} - {totalShiftsNum[4]} - {totalLackShiftsNum[4]}</span>);
            classNameListWed.push(<span className="label label-info">{ele.shiftName} - {totalShiftsNum[7]} - {totalLackShiftsNum[7]}</span>);
            classNameListThu.push(<span className="label label-info">{ele.shiftName} - {totalShiftsNum[10]} - {totalLackShiftsNum[10]}</span>);
            classNameListFri.push(<span className="label label-info">{ele.shiftName} - {totalShiftsNum[13]} - {totalLackShiftsNum[13]}</span>);
            classNameListSat.push(<span className="label label-info">{ele.shiftName} - {totalShiftsNum[16]} - {totalLackShiftsNum[16]}</span>);
            classNameListSun.push(<span className="label label-info">{ele.shiftName} - {totalShiftsNum[19]} - {totalLackShiftsNum[19]}</span>);
        }
        if (idx === 2) {
            classNameListMon.push(<span className="label label-warning">{ele.shiftName} - {totalShiftsNum[2]} - {totalLackShiftsNum[2]}</span>);
            classNameListTue.push(<span className="label label-warning">{ele.shiftName} - {totalShiftsNum[5]} - {totalLackShiftsNum[5]}</span>);
            classNameListWed.push(<span className="label label-warning">{ele.shiftName} - {totalShiftsNum[8]} - {totalLackShiftsNum[8]}</span>);
            classNameListThu.push(<span className="label label-warning">{ele.shiftName} - {totalShiftsNum[11]} - {totalLackShiftsNum[11]}</span>);
            classNameListFri.push(<span className="label label-warning">{ele.shiftName} - {totalShiftsNum[14]} - {totalLackShiftsNum[14]}</span>);
            classNameListSat.push(<span className="label label-warning">{ele.shiftName} - {totalShiftsNum[17]} - {totalLackShiftsNum[17]}</span>);
            classNameListSun.push(<span className="label label-warning">{ele.shiftName} - {totalShiftsNum[20]} - {totalLackShiftsNum[20]}</span>);
        }
    })

    const onAddUserShiftRegister = () => {
        const data = {
            userId: userLogin._id,
            branchId: branchs[activeTab]._id,
            dateFrom: moment(startDate).format('MM-DD-YYYY'),
            dateTo: moment(endDate).format('MM-DD-YYYY')
        }

        addUserShiftRegister(data);
        setDeleteButton(1);
        setAddButton(0);
    }

    const onDeleteUserShiftRegister = () => {
        let shiftId = null;
        shiftRegisters.filter((ele) => {
            if (ele.userId === userLogin._id && ele.branchId === branchs[activeTab]._id) {
                shiftId = ele._id;
            }
        })

        deleteUserShiftRegister(shiftId);
        setDeleteButton(0);
        setAddButton(1);
    }

    const onPutShiftRegister = (day, currentShifts, curUserId) => {
        // setShowShiftRegisterModal(1);
        setShowShiftRegistersModal(true);
        setCount(count + 1);
        setDayRegist(day);
        setCurrentUserId(curUserId);
        getPersonInShiftDate(branchs[activeTab]._id, moment(startDate).format('MM-DD-YYYY'), moment(endDate).format('MM-DD-YYYY'), moment(day).format('MM-DD-YYYY'));
        setValueLoader(true);
    }

    const onUpdateOrDeleteUser = (curUserId) => {
        // setShowUpdateOrDeleteModal(1);
        setShowShiftRegistersUserModal(true);
        setCountCallUpdateDeleteUserModal(countCallUpdateDeleteUserModal + 1);
        setCurrentUserId(curUserId);
        let id = shiftRegisters.find(x => x.userId === curUserId)._id;
        // Get _id của shiftRegisters
        setIdUpdate(id);
    }

    const onAddManager = (day, curUserId) => {
        // setShowAddManagerModal(1);
        setShowAddManagerModal(true);
        setCountCallAddManagerModal(countCallAddManagerModal + 1);
        setCurrentUserId(curUserId);
        setCurrentDay(day);
    }

    const onCopyPersonInShifts = () => {
        // changeValueLoading();

        var data = {
            branchId: branchs[activeTab]._id,
            startDate: moment(startDate).format('MM-DD-YYYY'),
            endDate: moment(endDate).format('MM-DD-YYYY'),
            currentDate: "",
            shiftId0: "",
            shiftId1: "",
            shiftId2: "",
            personNo0: "",
            personNo1: "",
            personNo2: "",
            flagCheckLastRecord: "",
        };

        let shiftIndex = "";
        if (personInShiftsPrevWeek.length > 0) {
            setValueLoader(false);
            personInShiftsPrevWeek.map((ele) => {
                // Thứ 2
                if (moment(ele.date).format('MM-DD-YYYY') === moment(startDate).subtract(7, "days").format('MM-DD-YYYY')) {
                    data.currentDate = moment(monday).format('MM-DD-YYYY');
                    ele.personShift.map((per) => {
                        shiftIndex = shifts.findIndex(x => x._id === per.shiftId);
                        if (shiftIndex === 0) {
                            data.shiftId0 = per.shiftId;
                            data.personNo0 = per.personNumber;
                        }
                        if (shiftIndex === 1) {
                            data.shiftId1 = per.shiftId;
                            data.personNo1 = per.personNumber;
                        }
                        if (shiftIndex === 2) {
                            data.shiftId2 = per.shiftId;
                            data.personNo2 = per.personNumber;
                        }
                    })
                    copyPersonInShifts(data);
                }
                setTimeout(() => {
                    // Thứ 3
                    if (moment(ele.date).format('MM-DD-YYYY') === moment(startDate).subtract(6, "days").format('MM-DD-YYYY')) {
                        data.currentDate = moment(tuesday).format('MM-DD-YYYY');
                        ele.personShift.map((per) => {
                            shiftIndex = shifts.findIndex(x => x._id === per.shiftId);
                            if (shiftIndex === 0) {
                                data.shiftId0 = per.shiftId;
                                data.personNo0 = per.personNumber;
                            }
                            if (shiftIndex === 1) {
                                data.shiftId1 = per.shiftId;
                                data.personNo1 = per.personNumber;
                            }
                            if (shiftIndex === 2) {
                                data.shiftId2 = per.shiftId;
                                data.personNo2 = per.personNumber;
                            }
                        })
                        copyPersonInShifts(data);
                    }
                }, 500);

                setTimeout(() => {
                    // Thứ 4
                    if (moment(ele.date).format('MM-DD-YYYY') === moment(startDate).subtract(5, "days").format('MM-DD-YYYY')) {
                        data.currentDate = moment(wednesday).format('MM-DD-YYYY');
                        ele.personShift.map((per) => {
                            shiftIndex = shifts.findIndex(x => x._id === per.shiftId);
                            if (shiftIndex === 0) {
                                data.shiftId0 = per.shiftId;
                                data.personNo0 = per.personNumber;
                            }
                            if (shiftIndex === 1) {
                                data.shiftId1 = per.shiftId;
                                data.personNo1 = per.personNumber;
                            }
                            if (shiftIndex === 2) {
                                data.shiftId2 = per.shiftId;
                                data.personNo2 = per.personNumber;
                            }
                        })
                        copyPersonInShifts(data);
                    }
                }, 1000);

                setTimeout(() => {
                    // Thứ 5
                    if (moment(ele.date).format('MM-DD-YYYY') === moment(startDate).subtract(4, "days").format('MM-DD-YYYY')) {
                        data.currentDate = moment(thursday).format('MM-DD-YYYY');
                        ele.personShift.map((per) => {
                            shiftIndex = shifts.findIndex(x => x._id === per.shiftId);
                            if (shiftIndex === 0) {
                                data.shiftId0 = per.shiftId;
                                data.personNo0 = per.personNumber;
                            }
                            if (shiftIndex === 1) {
                                data.shiftId1 = per.shiftId;
                                data.personNo1 = per.personNumber;
                            }
                            if (shiftIndex === 2) {
                                data.shiftId2 = per.shiftId;
                                data.personNo2 = per.personNumber;
                            }
                        })
                        copyPersonInShifts(data);
                    }
                }, 1500);

                setTimeout(() => {
                    // Thứ 6
                    if (moment(ele.date).format('MM-DD-YYYY') === moment(startDate).subtract(3, "days").format('MM-DD-YYYY')) {
                        data.currentDate = moment(friday).format('MM-DD-YYYY');
                        ele.personShift.map((per) => {
                            shiftIndex = shifts.findIndex(x => x._id === per.shiftId);
                            if (shiftIndex === 0) {
                                data.shiftId0 = per.shiftId;
                                data.personNo0 = per.personNumber;
                            }
                            if (shiftIndex === 1) {
                                data.shiftId1 = per.shiftId;
                                data.personNo1 = per.personNumber;
                            }
                            if (shiftIndex === 2) {
                                data.shiftId2 = per.shiftId;
                                data.personNo2 = per.personNumber;
                            }
                        })
                        copyPersonInShifts(data);
                    }
                }, 2000);

                setTimeout(() => {
                    // Thứ 7
                    if (moment(ele.date).format('MM-DD-YYYY') === moment(startDate).subtract(2, "days").format('MM-DD-YYYY')) {
                        data.currentDate = moment(saturday).format('MM-DD-YYYY');
                        ele.personShift.map((per) => {
                            shiftIndex = shifts.findIndex(x => x._id === per.shiftId);
                            if (shiftIndex === 0) {
                                data.shiftId0 = per.shiftId;
                                data.personNo0 = per.personNumber;
                            }
                            if (shiftIndex === 1) {
                                data.shiftId1 = per.shiftId;
                                data.personNo1 = per.personNumber;
                            }
                            if (shiftIndex === 2) {
                                data.shiftId2 = per.shiftId;
                                data.personNo2 = per.personNumber;
                            }
                        })
                        copyPersonInShifts(data);
                    }
                }, 2500);

                setTimeout(() => {
                    // Chủ nhật
                    if (moment(ele.date).format('MM-DD-YYYY') === moment(startDate).subtract(1, "days").format('MM-DD-YYYY')) {
                        data.currentDate = moment(sunday).format('MM-DD-YYYY');
                        ele.personShift.map((per) => {
                            shiftIndex = shifts.findIndex(x => x._id === per.shiftId);
                            if (shiftIndex === 0) {
                                data.shiftId0 = per.shiftId;
                                data.personNo0 = per.personNumber;
                            }
                            if (shiftIndex === 1) {
                                data.shiftId1 = per.shiftId;
                                data.personNo1 = per.personNumber;
                            }
                            if (shiftIndex === 2) {
                                data.shiftId2 = per.shiftId;
                                data.personNo2 = per.personNumber;
                            }
                        })
                        data.flagCheckLastRecord = "1";
                        copyPersonInShifts(data);
                    }
                }, 4000);
            })
            setTimeout(() => {
                setValueLoader(true);
            }, 5000);
            setShowButtonCopyPersonInShift("0");
        } else {
            viewPersonInShiftArlet();
        }

    }

    let listMon = [];
    let listTue = [];
    let listWed = [];
    let listThu = [];
    let listFri = [];
    let listSat = [];
    let listSun = [];

    eleMon = [];
    eleTue = [];
    eleWed = [];
    eleThu = [];
    eleFri = [];
    eleSat = [];
    eleSun = [];

    let saveUserIdMOn = "";
    let saveUserIdTue = "";
    let saveUserIdWed = "";
    let saveUserIdThu = "";
    let saveUserIdFri = "";
    let saveUserIdSat = "";
    let saveUserIdSun = "";

    let nameProcess = "";
    let indexOfFirst = 0;
    let indexOfSecond = 0;
    let indexOfThird = 0;
    let indexOfFourth = 0;

    if (shiftRegisterManagers.length > 0) {
        shiftRegisterManagers.map((ele) => {
            // Reset value
            indexOfFirst = 0;
            indexOfSecond = 0;
            indexOfThird = 0;
            indexOfFourth = 0;
            getUsers = users.find(({ _id }) => _id === ele.userId);
            // Xử lý cắt phần tên trong họ tên
            nameProcess = getUsers.name;
            indexOfFirst = nameProcess.indexOf(" ");
            indexOfSecond = nameProcess.indexOf(" ", (indexOfFirst + 1));
            if (indexOfSecond < 0) {
                indexOfThird = nameProcess.indexOf(" ", (indexOfSecond + 1));
            }
            if (indexOfThird < 0) {
                indexOfFourth = nameProcess.indexOf(" ", (indexOfThird + 1));
            }
            console.log("in " + indexOfFirst + " - " + indexOfSecond + " - " + indexOfThird + " - " + indexOfFourth);
            if (indexOfFourth > 0) {
                nameProcess = nameProcess.substr(indexOfFourth + 1, nameProcess.length - indexOfFourth);
            } else if (indexOfThird > 0) {
                nameProcess = nameProcess.substr(indexOfThird + 1, nameProcess.length - indexOfThird);
            } else if (indexOfSecond > 0) {
                nameProcess = nameProcess.substr(indexOfSecond + 1, nameProcess.length - indexOfSecond);
            } else if (indexOfFirst > 0) {
                nameProcess = nameProcess.substr(indexOfFirst + 1, nameProcess.length - indexOfFirst);
            }

            if (moment(ele.date).format('MM-DD-YYYY') === moment(monday).format('MM-DD-YYYY')) {
                eleMon.push(<span className="label-manager label-primary">{nameProcess}</span>);
                saveUserIdMOn = ele.userId;
            }
            if (moment(ele.date).format('MM-DD-YYYY') === moment(tuesday).format('MM-DD-YYYY')) {
                eleTue.push(<span className="label-manager label-primary">{nameProcess}</span>);
                saveUserIdTue = ele.userId;
            }
            if (moment(ele.date).format('MM-DD-YYYY') === moment(wednesday).format('MM-DD-YYYY')) {
                eleWed.push(<span className="label-manager label-primary">{nameProcess}</span>);
                saveUserIdWed = ele.userId;
            }
            if (moment(ele.date).format('MM-DD-YYYY') === moment(thursday).format('MM-DD-YYYY')) {
                eleThu.push(<span className="label-manager label-primary">{nameProcess}</span>);
                saveUserIdThu = ele.userId;
            }
            if (moment(ele.date).format('MM-DD-YYYY') === moment(friday).format('MM-DD-YYYY')) {
                eleFri.push(<span className="label-manager label-primary">{nameProcess}</span>);
                saveUserIdFri = ele.userId;
            }
            if (moment(ele.date).format('MM-DD-YYYY') === moment(saturday).format('MM-DD-YYYY')) {
                eleSat.push(<span className="label-manager label-primary">{nameProcess}</span>);
                saveUserIdSat = ele.userId;
            }
            if (moment(ele.date).format('MM-DD-YYYY') === moment(sunday).format('MM-DD-YYYY')) {
                eleSun.push(<span className="label-manager label-primary">{nameProcess}</span>);
                saveUserIdSun = ele.userId;
            }
        })
    }

    if (eleMon.length === 0) {
        eleMon.push(<span className="label-manager">AAA</span>);
    }
    if (eleTue.length === 0) {
        eleTue.push(<span className="label-manager">AAA</span>);
    }
    if (eleWed.length === 0) {
        eleWed.push(<span className="label-manager">AAA</span>);
    }
    if (eleThu.length === 0) {
        eleThu.push(<span className="label-manager">AAA</span>);
    }
    if (eleFri.length === 0) {
        eleFri.push(<span className="label-manager">AAA</span>);
    }
    if (eleSat.length === 0) {
        eleSat.push(<span className="label-manager">AAA</span>);
    }
    if (eleSun.length === 0) {
        eleSun.push(<span className="label-manager">AAA</span>);
    }

    if (userLogin && userLogin.roles === "Admin") {
        listMon.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 2">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <div class="el-element-overlay">
                            <div class="card-body-shiftRegister text-center">
                                <div class="el-card-item">
                                    <div class="el-card-avatar el-overlay-1">
                                        <p class="text-center font-medium m-b-0">{eleMon}</p>
                                        <div class="el-overlay">
                                            <ul class="el-info">
                                                <li>
                                                    <a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(monday, saveUserIdMOn)}><i class="ti-plus"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <div class="el-element-overlay">
                        <div class="card-body-shiftRegister text-center">
                            <div class="el-card-item">
                                <div class="el-card-avatar el-overlay-1">
                                    <p class="text-center font-medium m-b-0">{eleMon}</p>
                                    <div class="el-overlay">
                                        <ul class="el-info">
                                            <li>
                                                <a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(monday, saveUserIdMOn)}><i class="ti-plus"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        listTue.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 3">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <div class="el-element-overlay">
                            <div class="card-body-shiftRegister text-center">
                                <div class="el-card-item">
                                    <div class="el-card-avatar el-overlay-1">
                                        <p class="text-center font-medium m-b-0">{eleTue}</p>
                                        <div class="el-overlay">
                                            <ul class="el-info">
                                                <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(tuesday, saveUserIdTue)}><i class="ti-plus"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <div class="el-element-overlay">
                        <div class="card-body-shiftRegister text-center">
                            <div class="el-card-item">
                                <div class="el-card-avatar el-overlay-1">
                                    <p class="text-center font-medium m-b-0">{eleTue}</p>
                                    <div class="el-overlay">
                                        <ul class="el-info">
                                            <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(tuesday, saveUserIdTue)}><i class="ti-plus"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        listWed.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 4">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <div class="el-element-overlay">
                            <div class="card-body-shiftRegister text-center">
                                <div class="el-card-item">
                                    <div class="el-card-avatar el-overlay-1">
                                        <p class="text-center font-medium m-b-0">{eleWed}</p>
                                        <div class="el-overlay">
                                            <ul class="el-info">
                                                <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(wednesday, saveUserIdWed)}><i class="ti-plus"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <div class="el-element-overlay">
                        <div class="card-body-shiftRegister text-center">
                            <div class="el-card-item">
                                <div class="el-card-avatar el-overlay-1">
                                    <p class="text-center font-medium m-b-0">{eleWed}</p>
                                    <div class="el-overlay">
                                        <ul class="el-info">
                                            <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(wednesday, saveUserIdWed)}><i class="ti-plus"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        listThu.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 5">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <div class="el-element-overlay">
                            <div class="card-body-shiftRegister text-center">
                                <div class="el-card-item">
                                    <div class="el-card-avatar el-overlay-1">
                                        <p class="text-center font-medium m-b-0">{eleThu}</p>
                                        <div class="el-overlay">
                                            <ul class="el-info">
                                                <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(thursday, saveUserIdThu)}><i class="ti-plus"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <div class="el-element-overlay">
                        <div class="card-body-shiftRegister text-center">
                            <div class="el-card-item">
                                <div class="el-card-avatar el-overlay-1">
                                    <p class="text-center font-medium m-b-0">{eleThu}</p>
                                    <div class="el-overlay">
                                        <ul class="el-info">
                                            <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(thursday, saveUserIdThu)}><i class="ti-plus"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        listFri.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 6">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <div class="el-element-overlay">
                            <div class="card-body-shiftRegister text-center">
                                <div class="el-card-item">
                                    <div class="el-card-avatar el-overlay-1">
                                        <p class="text-center font-medium m-b-0">{eleFri}</p>
                                        <div class="el-overlay">
                                            <ul class="el-info">
                                                <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(friday, saveUserIdFri)}><i class="ti-plus"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <div class="el-element-overlay">
                        <div class="card-body-shiftRegister text-center">
                            <div class="el-card-item">
                                <div class="el-card-avatar el-overlay-1">
                                    <p class="text-center font-medium m-b-0">{eleFri}</p>
                                    <div class="el-overlay">
                                        <ul class="el-info">
                                            <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(friday, saveUserIdFri)}><i class="ti-plus"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        listSat.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 7">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <div class="el-element-overlay">
                            <div class="card-body-shiftRegister text-center">
                                <div class="el-card-item">
                                    <div class="el-card-avatar el-overlay-1">
                                        <p class="text-center font-medium m-b-0">{eleSat}</p>
                                        <div class="el-overlay">
                                            <ul class="el-info">
                                                <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(saturday, saveUserIdSat)}><i class="ti-plus"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <div class="el-element-overlay">
                        <div class="card-body-shiftRegister text-center">
                            <div class="el-card-item">
                                <div class="el-card-avatar el-overlay-1">
                                    <p class="text-center font-medium m-b-0">{eleSat}</p>
                                    <div class="el-overlay">
                                        <ul class="el-info">
                                            <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(saturday, saveUserIdSat)}><i class="ti-plus"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        listSun.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Chủ nhật">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <div class="el-element-overlay">
                            <div class="card-body-shiftRegister text-center">
                                <div class="el-card-item">
                                    <div class="el-card-avatar el-overlay-1">
                                        <p class="text-center font-medium m-b-0">{eleSun}</p>
                                        <div class="el-overlay">
                                            <ul class="el-info">
                                                <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(sunday, saveUserIdSun)}><i class="ti-plus"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <div class="el-element-overlay">
                        <div class="card-body-shiftRegister text-center">
                            <div class="el-card-item">
                                <div class="el-card-avatar el-overlay-1">
                                    <p class="text-center font-medium m-b-0">{eleSun}</p>
                                    <div class="el-overlay">
                                        <ul class="el-info">
                                            <li><a class="btn default btn-outline image-popup-vertical-fit model_img img-responsive" data-toggle="modal" data-target="#responsive-modal-AddManager" onClick={() => onAddManager(sunday, saveUserIdSun)}><i class="ti-plus"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        listMon.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 2">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <p class="text-center font-medium m-b-0">{eleMon}</p>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <p class="text-center font-medium m-b-0">{eleMon}</p>
                </div>
            </div>
        );
        listTue.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 3">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <p class="text-center font-medium m-b-0">{eleTue}</p>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <p class="text-center font-medium m-b-0">{eleTue}</p>
                </div>
            </div>
        );
        listWed.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 4">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <p class="text-center font-medium m-b-0">{eleWed}</p>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <p class="text-center font-medium m-b-0">{eleWed}</p>
                </div>
            </div>
        );
        listThu.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 5">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <p class="text-center font-medium m-b-0">{eleThu}</p>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <p class="text-center font-medium m-b-0">{eleThu}</p>
                </div>
            </div>
        );
        listFri.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 6">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <p class="text-center font-medium m-b-0">{eleFri}</p>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <p class="text-center font-medium m-b-0">{eleFri}</p>
                </div>
            </div>
        );
        listSat.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 7">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <p class="text-center font-medium m-b-0">{eleSat}</p>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <p class="text-center font-medium m-b-0">{eleSat}</p>
                </div>
            </div>
        );
        listSun.push(
            <div class="card-shiftRegister col-md-1-5">
                <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Chủ nhật">
                    <div class="col-salary-md-5"></div>
                    <div class="col-salary-md-7">
                        <p class="text-center font-medium m-b-0">{eleSun}</p>
                    </div>
                </div>
                <div class="card-body-shiftRegister text-center hiddenContent-2">
                    <p class="text-center font-medium m-b-0">{eleSun}</p>
                </div>
            </div>
        );
    }

    elmShiftRegisterManagers.push(
        <div class="card-group-shiftRegister">
            <div class="card-shiftRegister col-md-4-5" style={{ background: "#ab8ce4" }}>
                <div class="card-body-shiftRegister">
                    <p class="font-medium m-b-0">Quản lý</p>
                </div>
                <div class="box b-t text-center"></div>
            </div>
            {listMon}
            {listTue}
            {listWed}
            {listThu}
            {listFri}
            {listSat}
            {listSun}
            <div class="card-shiftRegister col-md-1-5">
                <div class="card-body-shiftRegister text-center">
                    <p class="text-center font-medium m-b-0"></p>
                </div>
            </div>
        </div>
    );

    return (
        <Fragment>
            {!loader || !shiftRegisterLoader ? (
                <Spinner />
            ) : (
                <Fragment>
                    {user && user.roles === "Admin" ?
                        <div className="row">
                            <Link to={`/modifer-personInShift/${moment(startDate).format('MM-DD-YYYY')}/${moment(endDate).format('MM-DD-YYYY')}/${createBranchId}`} className="btn btn-success"
                                style={{ marginLeft: "10px" }}>
                                <i className="fas fa-users"></i> Điều chỉnh số người trong ca
                            </Link>
                            {showButtonCopyPersonInShift === "1" ? (
                                <button
                                    type="button"
                                    class="btn btn-sm btn-info"
                                    onClick={() => onCopyPersonInShifts()}
                                >
                                    <i class="far fa-copy"></i>{"  "}Sao chép số người trong ca tuần trước
                                </button>
                            ) : ""}
                            {/* <button
                                type="button"
                                class="btn btn-sm btn-warning"
                                onClick={() => exportExcelFile()}
                            >
                                <i class="fas fa-trash-alt"></i>{"  "}Output Excel
                            </button> */}
                            {branchs && branchs.length > 0 ? (
                                <ExportExcel shiftRegisters={shiftRegisters}
                                    monday={monday}
                                    tuesday={tuesday}
                                    wednesday={wednesday}
                                    thursday={thursday}
                                    friday={friday}
                                    saturday={saturday}
                                    sunday={sunday}
                                    users={users}
                                    shifts={shifts}
                                    jobs={jobs}
                                    branchName={branchs[activeTab].branchAddress}
                                />
                            ) : ""}

                        </div>

                        : ""}

                    <div className="card-group">
                        {deleteButton === 1 ? (
                            <button
                                type="button"
                                class="btn btn-sm btn-warning"
                                onClick={() => onDeleteUserShiftRegister()}
                            >
                                <i class="fas fa-trash-alt"></i>{"  "}Xoá đăng ký ca
                            </button>
                        ) : " "}

                        {addButton === 1 ? (
                            <button
                                type="button"
                                class="btn btn-sm btn-info"
                                onClick={() => onAddUserShiftRegister()}
                            >
                                <i class="fas fa-plus"></i>{"  "}Đăng ký ca
                            </button>
                        ) : " "}
                    </div>
                    <div class="card-group-shiftRegister color-bordered-table-shiftRegister headerViewOrNotView" style={{ height: "40px" }}>
                        <div class="card-shiftRegister">
                            <p class="text-center font-medium m-b-0">Ca đăng kí</p>
                        </div>
                    </div>
                    <div class="card-group-shiftRegister color-bordered-table-shiftRegister hiddenDiv">
                        <div class="card-shiftRegister col-md-4-5">
                            <div class="card-body-shiftRegister">
                                <p class="font-medium m-b-0">Họ và tên</p>

                            </div>
                            <div class="box b-t text-center"></div>
                        </div>
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="card-body-shiftRegister text-center">
                                <p class="text-center font-medium m-b-0">Thứ 2</p>
                                <p>(<Moment format="DD/MM">{monday}</Moment>)</p>
                            </div>
                        </div>
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="card-body-shiftRegister text-center">
                                <p class="text-center font-medium m-b-0">Thứ 3</p>
                                <p>(<Moment format="DD/MM">{tuesday}</Moment>)</p>
                            </div>
                        </div>
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="card-body-shiftRegister text-center">
                                <p class="text-center font-medium m-b-0">Thứ 4</p>
                                <p>(<Moment format="DD/MM">{wednesday}</Moment>)</p>
                            </div>
                        </div>
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="card-body-shiftRegister text-center">
                                <p class="text-center font-medium m-b-0">Thứ 5</p>
                                <p>(<Moment format="DD/MM">{thursday}</Moment>)</p>
                            </div>
                        </div>
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="card-body-shiftRegister text-center">
                                <p class="text-center font-medium m-b-0">Thứ 6</p>
                                <p>(<Moment format="DD/MM">{friday}</Moment>)</p>
                            </div>
                        </div>
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="card-body-shiftRegister text-center">
                                <p class="text-center font-medium m-b-0">Thứ 7</p>
                                <p>(<Moment format="DD/MM">{saturday}</Moment>)</p>
                            </div>
                        </div>
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="card-body-shiftRegister text-center">
                                <p class="text-center font-medium m-b-0">Chủ nhật</p>
                                <p>(<Moment format="DD/MM">{sunday}</Moment>)</p>
                            </div>
                        </div>
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="card-body-shiftRegister text-center">
                                <p class="text-center font-medium m-b-0">Lương</p>
                            </div>
                        </div>
                    </div>

                    {elmPersonInShifts}

                    {elmShiftRegisters}

                    {user && user.roles === "Admin" ?
                        <AddUserForm users={users}
                            branchIdForm={activeTab >= 0 && branchs[activeTab] ? branchs[activeTab]._id : ""}
                            startDate={moment(startDate).format('MM-DD-YYYY')}
                            endDate={moment(endDate).format('MM-DD-YYYY')}
                            saveUserId={saveUserId}
                        />

                        : ""}

                    <div class="card-group-shiftRegister">

                        <div class="card-shiftRegister col-md-4-5" style={{ background: "#ab8ce4" }}>
                            <div class="card-body-shiftRegister">
                                <p class="font-medium m-b-0">Số ca (đã đăng kí - thiếu)</p>

                            </div>
                            <div class="box b-t text-center"></div>
                        </div>


                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 2">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{classNameListMon}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{classNameListMon}</p>
                            </div>
                        </div>


                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 3">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{classNameListTue}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{classNameListTue}</p>
                            </div>
                        </div>


                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 4">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{classNameListWed}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{classNameListWed}</p>
                            </div>
                        </div>
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 5">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{classNameListThu}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{classNameListThu}</p>
                            </div>
                        </div>
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 6">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{classNameListFri}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{classNameListFri}</p>
                            </div>
                        </div>
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Thứ 7">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{classNameListSat}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{classNameListSat}</p>
                            </div>
                        </div>
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="rowShiftRegister viewHeaderDay hiddenContent-1" data-label="Chủ nhật">
                                <div class="col-salary-md-5"></div>
                                <div class="col-salary-md-7">
                                    <p class="text-center font-medium m-b-0">{classNameListSun}</p>
                                </div>
                            </div>
                            <div class="card-body-shiftRegister text-center hiddenContent-2">
                                <p class="text-center font-medium m-b-0">{classNameListSun}</p>
                            </div>
                        </div>
                        <div class="card-shiftRegister col-md-1-5">
                            <div class="card-body-shiftRegister text-center">
                                <p class="text-center font-medium m-b-0"></p>
                            </div>
                        </div>

                    </div>
                    {elmShiftRegisterManagers}

                    {showShiftRegistersModal === true ? (
                        <ShiftRegisterModal
                            currentDay={dayRegist}
                            dateFrom={startDate}
                            dateTo={endDate}
                            branchId={branchs[activeTab]._id}
                            userLogin={userLogin._id}
                            currentUserLineId={currentUserId}
                            shifts={shifts}
                            jobs={jobs}
                            users={users}
                            typeUsers={typeUsers}
                            shiftRegisters={shiftRegisters}
                            showShiftRegistersModal={showShiftRegistersModal}
                            // setShowShiftRegisterModal={setShowShiftRegisterModal}
                            count={count}
                            personInShift={personInShift}
                            permitShiftRegists={permitShiftRegists}
                        />
                    ) : ""
                    }

                    {/* {showShiftRegisterModal === 1 ? (
                        <ShiftRegisterModal
                            currentDay={dayRegist}
                            dateFrom={startDate}
                            dateTo={endDate}
                            branchId={branchs[activeTab]._id}
                            userLogin={userLogin._id}
                            currentUserLineId={currentUserId}
                            shifts={shifts}
                            jobs={jobs}
                            users={users}
                            typeUsers={typeUsers}
                            shiftRegisters={shiftRegisters}
                            showShiftRegisterModal={showShiftRegisterModal}
                            setShowShiftRegisterModal={setShowShiftRegisterModal}
                            count={count}
                            personInShift={personInShift}
                            permitShiftRegists={permitShiftRegists}
                        />
                    ) : ""} */}

                    {/* {showUpdateOrDeleteModal === 1 ? (
                        <UpdateDeleteUserModal
                            idUpdate={idUpdate}
                            currentUserLineId={currentUserId}
                            users={users}
                            countCallUpdateDeleteUserModal={countCallUpdateDeleteUserModal}
                            listUserId={saveUserId}
                        />
                    ) : ""} */}

                    {showUpdateOrDeleteUserModal === true ? (
                        <UpdateDeleteUserModal
                            idUpdate={idUpdate}
                            currentUserLineId={currentUserId}
                            users={users}
                            countCallUpdateDeleteUserModal={countCallUpdateDeleteUserModal}
                            listUserId={saveUserId}
                            showUpdateOrDeleteUserModal={showUpdateOrDeleteUserModal}
                        />
                    ) : ""}

                    {showAddManagerModal === true ? (
                        <AddManagerModal
                            currentUserId={currentUserId}
                            users={users}
                            countCallAddManagerModal={countCallAddManagerModal}
                            currentDay={currentDay}
                            branchId={branchs[activeTab]._id}
                            dateFrom={startDate}
                            dateTo={endDate}
                            showAddManagerModal={showAddManagerModal}
                        />
                    ) : ""}

                </Fragment>
            )}
        </Fragment>
    );
};

TabContent.propTypes = {
    activeTab: PropTypes.object.isRequired,
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    monday: PropTypes.object.isRequired,
    tuesday: PropTypes.object.isRequired,
    wednesday: PropTypes.object.isRequired,
    thursday: PropTypes.object.isRequired,
    friday: PropTypes.object.isRequired,
    saturday: PropTypes.object.isRequired,
    sunday: PropTypes.object.isRequired,
    shifts: PropTypes.object.isRequired,
    personInShifts: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    userLogin: PropTypes.object.isRequired,
    jobs: PropTypes.object.isRequired,
    typeUsers: PropTypes.object.isRequired,
    branchs: PropTypes.object.isRequired,
    changeValueLoading: PropTypes.func.isRequired,
    getShiftRegisters: PropTypes.func.isRequired,
    addUserShiftRegister: PropTypes.func.isRequired,
    deleteUserShiftRegister: PropTypes.func.isRequired,
    getAllPermitShifts: PropTypes.func.isRequired,
    getPersonInShift: PropTypes.func.isRequired,
    copyPersonInShifts: PropTypes.func.isRequired,
    getShiftRegisterManagers: PropTypes.func.isRequired,
    setValueLoader: PropTypes.func.isRequired,
    viewPersonInShiftArlet: PropTypes.func.isRequired,
    setShowShiftRegistersModal: PropTypes.func.isRequired,
    setShowShiftRegistersUserModal: PropTypes.func.isRequired,
    setShowAddManagerModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    shiftRegister: state.shiftRegister,
    shiftRegisterManager: state.shiftRegisterManager,
    personInShift: state.personInShift,
    auth: state.auth,
    permitShiftRegist: state.permitShiftRegist,
});

export default connect(mapStateToProps,
    {
        getShiftRegisters,
        getPreWeekPersonInShift,
        getPersonInShiftDate,
        addUserShiftRegister,
        deleteUserShiftRegister,
        getPersonInShift,
        copyPersonInShifts,
        getAllPermitShifts,
        getShiftRegisterManagers,
        setValueLoader,
        viewPersonInShiftArlet,
        setShowShiftRegistersModal,
        setShowShiftRegistersUserModal,
        setShowAddManagerModal,
    })(
        TabContent
    );
