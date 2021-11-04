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
        registerId3: "",
        registerId4: "",
        registerId5: "",
        registerId6: "",
        registerId7: "",
        registerId8: "",
        registerId9: "",
        shiftId0: "",
        shiftId1: "",
        shiftId2: "",
        shiftId3: "",
        shiftId4: "",
        shiftId5: "",
        shiftId6: "",
        shiftId7: "",
        shiftId8: "",
        shiftId9: "",
        jobId0: "",
        jobId1: "",
        jobId2: "",
        jobId3: "",
        jobId4: "",
        jobId5: "",
        jobId6: "",
        jobId7: "",
        jobId8: "",
        jobId9: "",
        cost0: 0,
        cost1: 0,
        cost2: 0,
        cost3: 0,
        cost4: 0,
        cost5: 0,
        cost6: 0,
        cost7: 0,
        cost8: 0,
        cost9: 0,
        personInShift0: 0,
        personInShift1: 0,
        personInShift2: 0,
        personInShift3: 0,
        personInShift4: 0,
        personInShift5: 0,
        personInShift6: 0,
        personInShift7: 0,
        personInShift8: 0,
        personInShift9: 0,
        shiftFlag0: "0",
        shiftFlag1: "0",
        shiftFlag2: "0",
        shiftFlag3: "0",
        shiftFlag4: "0",
        shiftFlag5: "0",
        shiftFlag6: "0",
        shiftFlag7: "0",
        shiftFlag8: "0",
        shiftFlag9: "0",
        permitShiftRegistFlag: true,
    });

    // const [value, setValue] = useState({
    //     item: [],
    // });

    // if(shifts.length >= 0){
    //     shifts.map((ele, idx) => {
    //         setValue
    //     })
    // }
    const [value0, setValue0] = useState(false);
    const [value1, setValue1] = useState(false);
    const [value2, setValue2] = useState(false);
    const [value3, setValue3] = useState(false);
    const [value4, setValue4] = useState(false);
    const [value5, setValue5] = useState(false);
    const [value6, setValue6] = useState(false);
    const [value7, setValue7] = useState(false);
    const [value8, setValue8] = useState(false);
    const [value9, setValue9] = useState(false);

    // const { date, shiftId0, shiftId1, shiftId2, jobId0, jobId1, jobId2, cost0, cost1, cost2 } = formData;
    const { date,
        shiftId0,
        shiftId1,
        shiftId2,
        shiftId3,
        shiftId4,
        shiftId5,
        shiftId6,
        shiftId7,
        shiftId8,
        shiftId9,
        jobId0,
        jobId1,
        jobId2,
        jobId3,
        jobId4,
        jobId5,
        jobId6,
        jobId7,
        jobId8,
        jobId9,
        cost0,
        cost1,
        cost2,
        cost3,
        cost4,
        cost5,
        cost6,
        cost7,
        cost8,
        cost9,
    } = formData;

    let shiftCurrentList = [];
    let jobCurrentList = [];
    let getId = null;
    // let oldData = [];

    // console.log("currentUserLineId1 "+currentUserLineId);
    // let idx = null;
    let getRegisterId0 = null;
    let getRegisterId1 = null;
    let getRegisterId2 = null;
    let getRegisterId3 = null;
    let getRegisterId4 = null;
    let getRegisterId5 = null;
    let getRegisterId6 = null;
    let getRegisterId7 = null;
    let getRegisterId8 = null;
    let getRegisterId9 = null;
    let countShiftRegistedNo = 0;
    shiftRegisters.map((ele) => {
        if (ele.userId === currentUserLineId && ele.branchId === branchId) {
            ele.register.map((reg) => {
                countShiftRegistedNo = countShiftRegistedNo + 1;
                if (moment(reg.date).format('YYYY-MM-DD') === moment(currentDay).format('YYYY-MM-DD')) {
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
                            if (idx === 3) {
                                return getRegisterId3 = reg._id;
                            }
                            if (idx === 4) {
                                return getRegisterId4 = reg._id;
                            }
                            if (idx === 5) {
                                return getRegisterId5 = reg._id;
                            }
                            if (idx === 6) {
                                return getRegisterId6 = reg._id;
                            }
                            if (idx === 7) {
                                return getRegisterId7 = reg._id;
                            }
                            if (idx === 8) {
                                return getRegisterId8 = reg._id;
                            }
                            if (idx === 9) {
                                return getRegisterId9 = reg._id;
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
    let getShiftId3 = null;
    let getShiftId4 = null;
    let getShiftId5 = null;
    let getShiftId6 = null;
    let getShiftId7 = null;
    let getShiftId8 = null;
    let getShiftId9 = null;
    let getJobIdOld0 = null;
    let getJobIdOld1 = null;
    let getJobIdOld2 = null;
    let getJobIdOld3 = null;
    let getJobIdOld4 = null;
    let getJobIdOld5 = null;
    let getJobIdOld6 = null;
    let getJobIdOld7 = null;
    let getJobIdOld8 = null;
    let getJobIdOld9 = null;
    let getJobId0 = null;
    let getJobId1 = null;
    let getJobId2 = null;
    let getJobId3 = null;
    let getJobId4 = null;
    let getJobId5 = null;
    let getJobId6 = null;
    let getJobId7 = null;
    let getJobId8 = null;
    let getJobId9 = null;
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
            if (idx === 3) {
                if (getIndex >= 0) {
                    setValue3(true);
                    getShiftId3 = shiftCurrentList[getIndex];
                    getJobId3 = jobCurrentList[getIndex];
                    getJobIdOld3 = getJobId3;
                } else {
                    setValue3(false);
                    getShiftId3 = ele._id;
                    getJobId3 = jobs[0]._id;
                }
            }
            if (idx === 4) {
                if (getIndex >= 0) {
                    setValue4(true);
                    getShiftId4 = shiftCurrentList[getIndex];
                    getJobId4 = jobCurrentList[getIndex];
                    getJobIdOld4 = getJobId4;
                } else {
                    setValue4(false);
                    getShiftId4 = ele._id;
                    getJobId4 = jobs[0]._id;
                }
            }
            if (idx === 5) {
                if (getIndex >= 0) {
                    setValue5(true);
                    getShiftId5 = shiftCurrentList[getIndex];
                    getJobId5 = jobCurrentList[getIndex];
                    getJobIdOld5 = getJobId5;
                } else {
                    setValue5(false);
                    getShiftId5 = ele._id;
                    getJobId5 = jobs[0]._id;
                }
            }
            if (idx === 6) {
                if (getIndex >= 0) {
                    setValue6(true);
                    getShiftId6 = shiftCurrentList[getIndex];
                    getJobId6 = jobCurrentList[getIndex];
                    getJobIdOld6 = getJobId6;
                } else {
                    setValue6(false);
                    getShiftId6 = ele._id;
                    getJobId6 = jobs[0]._id;
                }
            }
            if (idx === 7) {
                if (getIndex >= 0) {
                    setValue7(true);
                    getShiftId7 = shiftCurrentList[getIndex];
                    getJobId7 = jobCurrentList[getIndex];
                    getJobIdOld7 = getJobId7;
                } else {
                    setValue7(false);
                    getShiftId7 = ele._id;
                    getJobId7 = jobs[0]._id;
                }
            }
            if (idx === 8) {
                if (getIndex >= 0) {
                    setValue8(true);
                    getShiftId8 = shiftCurrentList[getIndex];
                    getJobId8 = jobCurrentList[getIndex];
                    getJobIdOld8 = getJobId8;
                } else {
                    setValue8(false);
                    getShiftId8 = ele._id;
                    getJobId8 = jobs[0]._id;
                }
            }
            if (idx === 9) {
                if (getIndex >= 0) {
                    setValue9(true);
                    getShiftId9 = shiftCurrentList[getIndex];
                    getJobId9 = jobCurrentList[getIndex];
                    getJobIdOld9 = getJobId9;
                } else {
                    setValue9(false);
                    getShiftId9 = ele._id;
                    getJobId9 = jobs[0]._id;
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
            dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
            dateTo: moment(dateTo).format('YYYY-MM-DD'),
            // date: moment(currentDay).toDate().toString(),
            date: moment(currentDay).format('YYYY-MM-DD'),
            registerId0: getRegisterId0,
            registerId1: getRegisterId1,
            registerId2: getRegisterId2,
            registerId3: getRegisterId3,
            registerId4: getRegisterId4,
            registerId5: getRegisterId5,
            registerId6: getRegisterId6,
            registerId7: getRegisterId7,
            registerId8: getRegisterId8,
            registerId9: getRegisterId9,
            shiftId0: getShiftId0,
            shiftId1: getShiftId1,
            shiftId2: getShiftId2,
            shiftId3: getShiftId3,
            shiftId4: getShiftId4,
            shiftId5: getShiftId5,
            shiftId6: getShiftId6,
            shiftId7: getShiftId7,
            shiftId8: getShiftId8,
            shiftId9: getShiftId9,
            jobIdOld0: getJobIdOld0,
            jobIdOld1: getJobIdOld1,
            jobIdOld2: getJobIdOld2,
            jobIdOld3: getJobIdOld3,
            jobIdOld4: getJobIdOld4,
            jobIdOld5: getJobIdOld5,
            jobIdOld6: getJobIdOld6,
            jobIdOld7: getJobIdOld7,
            jobIdOld8: getJobIdOld8,
            jobIdOld9: getJobIdOld9,
            jobId0: getJobId0,
            jobId1: getJobId1,
            jobId2: getJobId2,
            jobId3: getJobId3,
            jobId4: getJobId4,
            jobId5: getJobId5,
            jobId6: getJobId6,
            jobId7: getJobId7,
            jobId8: getJobId8,
            jobId9: getJobId9,
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
        if (value3 === true) {

            jobs.map((ele) => {
                if (ele._id === formData.jobId3) {
                    return getJobCost = ele.jobCost
                }
            });
            getShiftTime = shifts[3].shiftTime;

            formData.cost3 = getJobCost * getShiftTime * getTypeUserPercentCost / 100;
        } else {
            formData.shiftId3 = null;
        }
        if (value4 === true) {

            jobs.map((ele) => {
                if (ele._id === formData.jobId4) {
                    return getJobCost = ele.jobCost
                }
            });
            getShiftTime = shifts[4].shiftTime;

            formData.cost4 = getJobCost * getShiftTime * getTypeUserPercentCost / 100;
        } else {
            formData.shiftId4 = null;
        }
        if (value5 === true) {

            jobs.map((ele) => {
                if (ele._id === formData.jobId5) {
                    return getJobCost = ele.jobCost
                }
            });
            getShiftTime = shifts[5].shiftTime;

            formData.cost5 = getJobCost * getShiftTime * getTypeUserPercentCost / 100;
        } else {
            formData.shiftId5 = null;
        }
        if (value6 === true) {

            jobs.map((ele) => {
                if (ele._id === formData.jobId6) {
                    return getJobCost = ele.jobCost
                }
            });
            getShiftTime = shifts[6].shiftTime;

            formData.cost6 = getJobCost * getShiftTime * getTypeUserPercentCost / 100;
        } else {
            formData.shiftId6 = null;
        }
        if (value7 === true) {

            jobs.map((ele) => {
                if (ele._id === formData.jobId7) {
                    return getJobCost = ele.jobCost
                }
            });
            getShiftTime = shifts[7].shiftTime;

            formData.cost7 = getJobCost * getShiftTime * getTypeUserPercentCost / 100;
        } else {
            formData.shiftId7 = null;
        }
        if (value8 === true) {

            jobs.map((ele) => {
                if (ele._id === formData.jobId8) {
                    return getJobCost = ele.jobCost
                }
            });
            getShiftTime = shifts[8].shiftTime;

            formData.cost8 = getJobCost * getShiftTime * getTypeUserPercentCost / 100;
        } else {
            formData.shiftId8 = null;
        }
        if (value9 === true) {

            jobs.map((ele) => {
                if (ele._id === formData.jobId9) {
                    return getJobCost = ele.jobCost
                }
            });
            getShiftTime = shifts[9].shiftTime;

            formData.cost9 = getJobCost * getShiftTime * getTypeUserPercentCost / 100;
        } else {
            formData.shiftId9 = null;
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
            if (idx === 3) {
                getIndex = shiftCurrentList.indexOf(ele._id);
                if (getIndex >= 0) {
                    if (shiftCurrentList[getIndex] === formData.shiftId3) {
                        if (jobCurrentList[getIndex] === formData.jobId3) {
                            // Không thay đổi
                            formData.shiftFlag3 = "0";
                        } else {
                            // Update
                            formData.shiftFlag3 = "1";
                        }
                    } else {
                        // Delete
                        formData.shiftFlag3 = "3";
                        formData.shiftId3 = shifts[3]._id;
                    }
                } else {
                    if (value3 === true) {
                        // Add
                        formData.shiftFlag3 = "2";
                    } else {
                        // Không đăng kí
                        formData.shiftFlag3 = "0";
                    }
                }
            }
            if (idx === 4) {
                getIndex = shiftCurrentList.indexOf(ele._id);
                if (getIndex >= 0) {
                    if (shiftCurrentList[getIndex] === formData.shiftId4) {
                        if (jobCurrentList[getIndex] === formData.jobId4) {
                            // Không thay đổi
                            formData.shiftFlag4 = "0";
                        } else {
                            // Update
                            formData.shiftFlag4 = "1";
                        }
                    } else {
                        // Delete
                        formData.shiftFlag4 = "3";
                        formData.shiftId4 = shifts[4]._id;
                    }
                } else {
                    if (value4 === true) {
                        // Add
                        formData.shiftFlag4 = "2";
                    } else {
                        // Không đăng kí
                        formData.shiftFlag4 = "0";
                    }
                }
            }
            if (idx === 5) {
                getIndex = shiftCurrentList.indexOf(ele._id);
                if (getIndex >= 0) {
                    if (shiftCurrentList[getIndex] === formData.shiftId5) {
                        if (jobCurrentList[getIndex] === formData.jobId5) {
                            // Không thay đổi
                            formData.shiftFlag5 = "0";
                        } else {
                            // Update
                            formData.shiftFlag5 = "1";
                        }
                    } else {
                        // Delete
                        formData.shiftFlag5 = "3";
                        formData.shiftId5 = shifts[5]._id;
                    }
                } else {
                    if (value5 === true) {
                        // Add
                        formData.shiftFlag5 = "2";
                    } else {
                        // Không đăng kí
                        formData.shiftFlag5 = "0";
                    }
                }
            }
            if (idx === 6) {
                getIndex = shiftCurrentList.indexOf(ele._id);
                if (getIndex >= 0) {
                    if (shiftCurrentList[getIndex] === formData.shiftId6) {
                        if (jobCurrentList[getIndex] === formData.jobId6) {
                            // Không thay đổi
                            formData.shiftFlag6 = "0";
                        } else {
                            // Update
                            formData.shiftFlag6 = "1";
                        }
                    } else {
                        // Delete
                        formData.shiftFlag6 = "3";
                        formData.shiftId6 = shifts[6]._id;
                    }
                } else {
                    if (value6 === true) {
                        // Add
                        formData.shiftFlag6 = "2";
                    } else {
                        // Không đăng kí
                        formData.shiftFlag6 = "0";
                    }
                }
            }
            if (idx === 7) {
                getIndex = shiftCurrentList.indexOf(ele._id);
                if (getIndex >= 0) {
                    if (shiftCurrentList[getIndex] === formData.shiftId7) {
                        if (jobCurrentList[getIndex] === formData.jobId7) {
                            // Không thay đổi
                            formData.shiftFlag7 = "0";
                        } else {
                            // Update
                            formData.shiftFlag7 = "1";
                        }
                    } else {
                        // Delete
                        formData.shiftFlag7 = "3";
                        formData.shiftId7 = shifts[7]._id;
                    }
                } else {
                    if (value7 === true) {
                        // Add
                        formData.shiftFlag7 = "2";
                    } else {
                        // Không đăng kí
                        formData.shiftFlag7 = "0";
                    }
                }
            }
            if (idx === 8) {
                getIndex = shiftCurrentList.indexOf(ele._id);
                if (getIndex >= 0) {
                    if (shiftCurrentList[getIndex] === formData.shiftId8) {
                        if (jobCurrentList[getIndex] === formData.jobId8) {
                            // Không thay đổi
                            formData.shiftFlag8 = "0";
                        } else {
                            // Update
                            formData.shiftFlag8 = "1";
                        }
                    } else {
                        // Delete
                        formData.shiftFlag8 = "3";
                        formData.shiftId8 = shifts[8]._id;
                    }
                } else {
                    if (value8 === true) {
                        // Add
                        formData.shiftFlag8 = "2";
                    } else {
                        // Không đăng kí
                        formData.shiftFlag8 = "0";
                    }
                }
            }
            if (idx === 9) {
                getIndex = shiftCurrentList.indexOf(ele._id);
                if (getIndex >= 0) {
                    if (shiftCurrentList[getIndex] === formData.shiftId9) {
                        if (jobCurrentList[getIndex] === formData.jobId9) {
                            // Không thay đổi
                            formData.shiftFlag9 = "0";
                        } else {
                            // Update
                            formData.shiftFlag9 = "1";
                        }
                    } else {
                        // Delete
                        formData.shiftFlag9 = "3";
                        formData.shiftId9 = shifts[9]._id;
                    }
                } else {
                    if (value9 === true) {
                        // Add
                        formData.shiftFlag9 = "2";
                    } else {
                        // Không đăng kí
                        formData.shiftFlag9 = "0";
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
                if (getIndex === 3) formData.personInShift3 = reg.personNumber;
                if (getIndex === 4) formData.personInShift4 = reg.personNumber;
                if (getIndex === 5) formData.personInShift5 = reg.personNumber;
                if (getIndex === 6) formData.personInShift6 = reg.personNumber;
                if (getIndex === 7) formData.personInShift7 = reg.personNumber;
                if (getIndex === 8) formData.personInShift8 = reg.personNumber;
                if (getIndex === 9) formData.personInShift9 = reg.personNumber;
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
            if (formData.shiftFlag3 === "2") {
                countNo = countNo + 1;
            }
            if (formData.shiftFlag4 === "2") {
                countNo = countNo + 1;
            }
            if (formData.shiftFlag5 === "2") {
                countNo = countNo + 1;
            }
            if (formData.shiftFlag6 === "2") {
                countNo = countNo + 1;
            }
            if (formData.shiftFlag7 === "2") {
                countNo = countNo + 1;
            }
            if (formData.shiftFlag8 === "2") {
                countNo = countNo + 1;
            }
            if (formData.shiftFlag9 === "2") {
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

                            <div className="modal-body-shiftRegister">

                                <div>
                                    <div className="row">
                                        <Switch
                                            isOn={value0}
                                            onColor="#00c292"
                                            handleToggle={() => setValue0(!value0)}
                                            itemClass={""} />
                                        <div className="col-md-7">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text label-success" style={{ color: "white"}}>{shifts[0].shiftName}</span>
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
                                <div>
                                    <div className="row">
                                        <Switch
                                            isOn={value1}
                                            onColor="#03a9f3"
                                            handleToggle={() => setValue1(!value1)}
                                            itemClass={"-1"} />
                                        <div className="col-md-7">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text label-info" style={{ color: "white"}}>{shifts[1].shiftName}</span>
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
                                <div>
                                    <div className="row">
                                        <Switch
                                            isOn={value2}
                                            onColor="#fec107"
                                            handleToggle={() => setValue2(!value2)}
                                            itemClass={"-2"} />
                                        <div className="col-md-7">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text label-warning" style={{ color: "white"}}>{shifts[2].shiftName}</span>
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
                                {shifts.length >= 4 ? (
                                    <div>
                                        <div className="row">
                                            <Switch
                                                isOn={value3}
                                                onColor="#cc9900"
                                                handleToggle={() => setValue3(!value3)}
                                                itemClass={"-3"} />
                                            <div className="col-md-7">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" style={{ backgroundColor: "#cc9900", color: "white"}}>{shifts[3].shiftName}</span>
                                                    </div>
                                                    <select
                                                        disabled={value3 ? "" : "disabled"}
                                                        name="jobId3"
                                                        value={jobId3}
                                                        onChange={(e) => onChange(e)}
                                                        class="form-control custom-select"
                                                    >
                                                        {elmShifts}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ""}
                                {shifts.length >= 5 ? (
                                    <div>
                                        <div className="row">
                                            <Switch
                                                isOn={value4}
                                                onColor="#ff33cc"
                                                handleToggle={() => setValue4(!value4)}
                                                itemClass={"-4"} />
                                            <div className="col-md-7">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" style={{ backgroundColor: "#ff33cc", color: "white"}}>{shifts[4].shiftName}</span>
                                                    </div>
                                                    <select
                                                        disabled={value4 ? "" : "disabled"}
                                                        name="jobId4"
                                                        value={jobId4}
                                                        onChange={(e) => onChange(e)}
                                                        class="form-control custom-select"
                                                    >
                                                        {elmShifts}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ""}
                                {shifts.length >= 6 ? (
                                    <div>
                                        <div className="row">
                                            <Switch
                                                isOn={value5}
                                                onColor="#00cc00"
                                                handleToggle={() => setValue5(!value5)}
                                                itemClass={"-5"} />
                                            <div className="col-md-7">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"  style={{ backgroundColor: "#00cc00", color: "white"}}>{shifts[5].shiftName}</span>
                                                    </div>
                                                    <select
                                                        disabled={value5 ? "" : "disabled"}
                                                        name="jobId5"
                                                        value={jobId5}
                                                        onChange={(e) => onChange(e)}
                                                        class="form-control custom-select"
                                                    >
                                                        {elmShifts}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ""}
                                {shifts.length >= 7 ? (
                                    <div>
                                        <div className="row">
                                            <Switch
                                                isOn={value6}
                                                onColor="#00ccff"
                                                handleToggle={() => setValue6(!value6)}
                                                itemClass={"-6"} />
                                            <div className="col-md-7">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" style={{ backgroundColor: "#00ccff", color: "white"}}>{shifts[6].shiftName}</span>
                                                    </div>
                                                    <select
                                                        disabled={value6 ? "" : "disabled"}
                                                        name="jobId6"
                                                        value={jobId6}
                                                        onChange={(e) => onChange(e)}
                                                        class="form-control custom-select"
                                                    >
                                                        {elmShifts}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ""}
                                {shifts.length >= 8 ? (
                                    <div>
                                        <div className="row">
                                            <Switch
                                                isOn={value7}
                                                onColor="#9933ff"
                                                handleToggle={() => setValue7(!value7)}
                                                itemClass={"-7"} />
                                            <div className="col-md-7">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" style={{ backgroundColor: "#9933ff", color: "white"}}>{shifts[7].shiftName}</span>
                                                    </div>
                                                    <select
                                                        disabled={value7 ? "" : "disabled"}
                                                        name="jobId7"
                                                        value={jobId7}
                                                        onChange={(e) => onChange(e)}
                                                        class="form-control custom-select"
                                                    >
                                                        {elmShifts}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ""}
                                {shifts.length >= 9 ? (
                                    <div>
                                        <div className="row">
                                            <Switch
                                                isOn={value8}
                                                onColor="#ff6600"
                                                handleToggle={() => setValue8(!value8)}
                                                itemClass={"-8"} />
                                            <div className="col-md-7">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"  style={{ backgroundColor: "#ff6600", color: "white"}}>{shifts[8].shiftName}</span>
                                                    </div>
                                                    <select
                                                        disabled={value8 ? "" : "disabled"}
                                                        name="jobId8"
                                                        value={jobId8}
                                                        onChange={(e) => onChange(e)}
                                                        class="form-control custom-select"
                                                    >
                                                        {elmShifts}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ""}
                                {shifts.length >= 10 ? (
                                    <div>
                                        <div className="row">
                                            <Switch
                                                isOn={value9}
                                                onColor="#006600"
                                                handleToggle={() => setValue9(!value9)}
                                                itemClass={"-9"} />
                                            <div className="col-md-7">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" style={{ backgroundColor: "#006600", color: "white"}}>{shifts[9].shiftName}</span>
                                                    </div>
                                                    <select
                                                        disabled={value9 ? "" : "disabled"}
                                                        name="jobId9"
                                                        value={jobId9}
                                                        onChange={(e) => onChange(e)}
                                                        class="form-control custom-select"
                                                    >
                                                        {elmShifts}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ""}
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
