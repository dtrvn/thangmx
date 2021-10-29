import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter, Redirect } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import { getShiftRegisters } from "../../actions/shiftRegister";
import { getAllShifts } from "../../actions/shift";
import { getAllJobs } from "../../actions/job";
import { getAllUsers } from "../../actions/user";
import { getShiftRegisterViewSalary } from "../../actions/shiftRegister";
import Spinner from "../layout/Spinner";

const SalaryPersonal = ({
    userId,
    dateFrom,
    dateTo,
    currentDay,
    getAllShifts,
    getAllJobs,
    getAllUsers,
    getShiftRegisterViewSalary,
    // shiftRegister: { shiftRegister, currentDay },
    shiftRegister: { shiftRegister },
    auth: { user },
    user: { users },
    job: { jobs },
    shift: { shifts },
    // match,
    setViewSalaryAllMemberScreen,
    setViewSalaryPersonalScreen,
}) => {

    let getLastDayOfThisWeek = null;

    const [createDate, setCreateDate] = useState({
        firstDayOfFirstWeekInMonth: "",
        lastDayOfLastWeekInMonth: "",
        firstDayRow1: "",
        lastDayRow1: "",
        firstDayRow2: "",
        lastDayRow2: "",
        firstDayRow3: "",
        lastDayRow3: "",
        firstDayRow4: "",
        lastDayRow4: "",
        firstDayRow5: "",
        lastDayRow5: "",
        firstDayRow6: "",
        lastDayRow6: "",
        currentUser: "",
        currentMonth: "",
        currentDay: "",
        // 2 đối số kẹp nhau: 1 là ngày, 2 là màu sắc của ngày (nếu ngày của tháng trước hoặc tháng sau sẽ là màu khác)
        listDay: [],
    });

    useEffect(() => {
        getAllUsers();
        getAllShifts();
        getAllJobs();
    }, [getAllUsers, getAllShifts, getAllJobs]);

    useEffect(() => {
        // console.log("user 2");
        // if (!currentDay) {
        if (user && user.roles === "User") {
            // console.log("user " + user.roles);
            getLastDayOfThisWeek = moment().startOf("isoWeek").add(6, "days").format('MM-DD-YYYY');
            getShiftRegisterViewSalary(userId, dateFrom, getLastDayOfThisWeek, currentDay);
        } else {
            // console.log("user 1");
            // getShiftRegisterViewSalary(match.params.id, match.params.firstDayOfFirstWeekInMonth, match.params.lastDayOfLastWeekInMonth, match.params.currentDay);
            getShiftRegisterViewSalary(userId, dateFrom, dateTo, currentDay);
        }
        // }
    }, [user]);

    useEffect(() => {
        let getUserName = null;
        if (users.length > 0) {
            // getUserName = users.find(({ _id }) => _id === match.params.id).name;
            getUserName = users.find(({ _id }) => _id === userId).name;
        }
        setCreateDate({
            ...createDate,
            firstDayOfFirstWeekInMonth: moment(currentDay).startOf('month').startOf("isoWeek").format('MM-DD-YYYY'),
            lastDayOfLastWeekInMonth: moment(currentDay).endOf('month').startOf("isoWeek").add(6, "days").format('MM-DD-YYYY'),
            firstDayRow1: moment(currentDay).startOf('month').startOf("isoWeek"),
            lastDayRow1: moment(currentDay).startOf('month').startOf("isoWeek").add(6, "days"),
            firstDayRow2: moment(currentDay).startOf('month').startOf("isoWeek").add(7, "days"),
            lastDayRow2: moment(currentDay).startOf('month').startOf("isoWeek").add(13, "days"),
            firstDayRow3: moment(currentDay).startOf('month').startOf("isoWeek").add(14, "days"),
            lastDayRow3: moment(currentDay).startOf('month').startOf("isoWeek").add(20, "days"),
            firstDayRow4: moment(currentDay).startOf('month').startOf("isoWeek").add(21, "days"),
            lastDayRow4: moment(currentDay).startOf('month').startOf("isoWeek").add(27, "days"),
            firstDayRow5: moment(currentDay).startOf('month').startOf("isoWeek").add(28, "days"),
            lastDayRow5: moment(currentDay).startOf('month').startOf("isoWeek").add(34, "days"),
            firstDayRow6: moment(currentDay).startOf('month').startOf("isoWeek").add(35, "days"),
            lastDayRow6: moment(currentDay).startOf('month').startOf("isoWeek").add(41, "days"),
            currentUser: getUserName,
            currentMonth: moment(currentDay).format('M'),
            currentDay: currentDay,
        });
        if (shiftRegister.length > 0) {
            // Row 1
            let nextDay = moment(createDate.firstDayRow1).format('D');
            createDate.listDay.push(nextDay);
            let getMonth = moment(createDate.firstDayRow1).format('M');
            if (getMonth === createDate.currentMonth) {
                createDate.listDay.push(" ");
            } else {
                createDate.listDay.push("#b2cae2");
            }
            for (let i = 1; i < 7; i++) {
                nextDay = moment(createDate.firstDayRow1).add(i, "days").format('D');
                createDate.listDay.push(nextDay);
                getMonth = moment(createDate.firstDayRow1).add(i, "days").format('M');
                if (getMonth === createDate.currentMonth) {
                    createDate.listDay.push("black");
                } else {
                    createDate.listDay.push("#b2cae2");
                }
            }
            // Row 2
            nextDay = moment(createDate.firstDayRow2).format('D');
            createDate.listDay.push(nextDay);
            getMonth = moment(createDate.firstDayRow2).format('M');
            if (getMonth === createDate.currentMonth) {
                createDate.listDay.push("black");
            } else {
                createDate.listDay.push("#b2cae2");
            }
            for (let i = 1; i < 7; i++) {
                nextDay = moment(createDate.firstDayRow2).add(i, "days").format('D');
                createDate.listDay.push(nextDay);
                getMonth = moment(createDate.firstDayRow2).add(i, "days").format('M');
                if (getMonth === createDate.currentMonth) {
                    createDate.listDay.push("black");
                } else {
                    createDate.listDay.push("#b2cae2");
                }
            }
            // Row 3
            nextDay = moment(createDate.firstDayRow3).format('D');
            createDate.listDay.push(nextDay);
            getMonth = moment(createDate.firstDayRow3).format('M');
            if (getMonth === createDate.currentMonth) {
                createDate.listDay.push("black");
            } else {
                createDate.listDay.push("#b2cae2");
            }
            for (let i = 1; i < 7; i++) {
                nextDay = moment(createDate.firstDayRow3).add(i, "days").format('D');
                createDate.listDay.push(nextDay);
                getMonth = moment(createDate.firstDayRow3).add(i, "days").format('M');
                if (getMonth === createDate.currentMonth) {
                    createDate.listDay.push("black");
                } else {
                    createDate.listDay.push("#b2cae2");
                }
            }
            // Row 4
            nextDay = moment(createDate.firstDayRow4).format('D');
            createDate.listDay.push(nextDay);
            getMonth = moment(createDate.firstDayRow4).format('M');
            if (getMonth === createDate.currentMonth) {
                createDate.listDay.push("black");
            } else {
                createDate.listDay.push("#b2cae2");
            }
            for (let i = 1; i < 7; i++) {
                nextDay = moment(createDate.firstDayRow4).add(i, "days").format('D');
                createDate.listDay.push(nextDay);
                getMonth = moment(createDate.firstDayRow4).add(i, "days").format('M');
                if (getMonth === createDate.currentMonth) {
                    createDate.listDay.push("black");
                } else {
                    createDate.listDay.push("#b2cae2");
                }
            }
            // Row 5
            nextDay = moment(createDate.firstDayRow5).format('D');
            createDate.listDay.push(nextDay);
            getMonth = moment(createDate.firstDayRow5).format('M');
            if (getMonth === createDate.currentMonth) {
                createDate.listDay.push("black");
            } else {
                createDate.listDay.push("#b2cae2");
            }
            for (let i = 1; i < 7; i++) {
                nextDay = moment(createDate.firstDayRow5).add(i, "days").format('D');
                createDate.listDay.push(nextDay);
                getMonth = moment(createDate.firstDayRow5).add(i, "days").format('M');
                if (getMonth === createDate.currentMonth) {
                    createDate.listDay.push("black");
                } else {
                    createDate.listDay.push("#b2cae2");
                }
            }
            // Row 6
            nextDay = moment(createDate.firstDayRow6).format('D');
            createDate.listDay.push(nextDay);
            getMonth = moment(createDate.firstDayRow6).format('M');
            if (getMonth === createDate.currentMonth) {
                createDate.listDay.push("black");
            } else {
                createDate.listDay.push("#b2cae2");
            }
            for (let i = 1; i < 7; i++) {
                nextDay = moment(createDate.firstDayRow6).add(i, "days").format('D');
                createDate.listDay.push(nextDay);
                getMonth = moment(createDate.firstDayRow6).add(i, "days").format('M');
                if (getMonth === createDate.currentMonth) {
                    createDate.listDay.push("black");
                } else {
                    createDate.listDay.push("#b2cae2");
                }
            }
        }

    }, [shiftRegister]);

    // useEffect(() => {
    //     if (users.length > 0) {
    //         let getName = users.map((ele) => ele._id === match.params.id).name;
    //         setCreateDate({
    //             currentUser: getName,
    //         });
    //     }
    // }, [users]);

    // useEffect(() => {
    //     console.log("firstDayRow1 " + moment(createDate.firstDayRow1).format('MM-DD-YYYY'));
    //     console.log("lastDayRow1 " + moment(createDate.lastDayRow1).format('MM-DD-YYYY'));
    //     console.log("firstDayRow2 " + moment(createDate.firstDayRow2).format('MM-DD-YYYY'));
    //     console.log("lastDayRow2 " + moment(createDate.lastDayRow2).format('MM-DD-YYYY'));
    //     console.log("firstDayRow3 " + moment(createDate.firstDayRow3).format('MM-DD-YYYY'));
    //     console.log("lastDayRow3 " + moment(createDate.lastDayRow3).format('MM-DD-YYYY'));
    //     console.log("firstDayRow4 " + moment(createDate.firstDayRow4).format('MM-DD-YYYY'));
    //     console.log("lastDayRow4 " + moment(createDate.lastDayRow4).format('MM-DD-YYYY'));
    //     console.log("firstDayRow5 " + moment(createDate.firstDayRow5).format('MM-DD-YYYY'));
    //     console.log("lastDayRow5 " + moment(createDate.lastDayRow5).format('MM-DD-YYYY'));
    //     console.log("firstDayRow6 " + moment(createDate.firstDayRow6).format('MM-DD-YYYY'));
    //     console.log("lastDayRow6 " + moment(createDate.lastDayRow6).format('MM-DD-YYYY'));
    // }, []);

    let row1 = [];
    let row2 = [];
    let row3 = [];
    let row4 = [];
    let row5 = [];
    let row6 = [];

    let eleMon = [];
    let eleTue = [];
    let eleWed = [];
    let eleThu = [];
    let eleFri = [];
    let eleSat = [];
    let eleSun = [];
    let amountWeek = 0;
    let totalAmount = 0;
    let index = null;
    let jobIndex = null;
    let className = null;

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
        eleMon = [];
        eleTue = [];
        eleWed = [];
        eleThu = [];
        eleFri = [];
        eleSat = [];
        eleSun = [];
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

    if (shiftRegister.length > 0 && jobs.length > 0 && shifts.length > 0) {
        shiftRegister.map((ele) => {
            amountWeek = 0;
            resetData();
            if (moment(ele.dateFrom).format('MM-DD-YYYY') === moment(createDate.firstDayRow1).format('MM-DD-YYYY')) {
                ele.register.map((reg) => {
                    amountWeek = amountWeek + reg.cost;
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
                    // Mon
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow1).format('MM-DD-YYYY')) {
                        classNameListMon[index] = className;
                        valueListMon[index] = jobs[jobIndex].jobName;
                    }
                    // Tue
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow1).add(1, "days").format('MM-DD-YYYY')) {
                        classNameListTue[index] = className;
                        valueListTue[index] = jobs[jobIndex].jobName;
                    }
                    // Wed
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow1).add(2, "days").format('MM-DD-YYYY')) {
                        classNameListWed[index] = className;
                        valueListWed[index] = jobs[jobIndex].jobName;
                    }
                    // Thu
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow1).add(3, "days").format('MM-DD-YYYY')) {
                        classNameListThu[index] = className;
                        valueListThu[index] = jobs[jobIndex].jobName;
                    }
                    // Fri
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow1).add(4, "days").format('MM-DD-YYYY')) {
                        classNameListFri[index] = className;
                        valueListFri[index] = jobs[jobIndex].jobName;
                    }
                    // Sat
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow1).add(5, "days").format('MM-DD-YYYY')) {
                        classNameListSat[index] = className;
                        valueListSat[index] = jobs[jobIndex].jobName;
                    }
                    // Sun
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow1).add(6, "days").format('MM-DD-YYYY')) {
                        classNameListSun[index] = className;
                        valueListSun[index] = jobs[jobIndex].jobName;
                    }
                })
                totalAmount = totalAmount + amountWeek;

                classNameListMon.map((ele, idx) => {
                    if (ele !== " ") {
                        eleMon.push(<span className={ele}>{valueListMon[idx]}</span>)
                    } else {
                        eleMon.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListTue.map((ele, idx) => {
                    if (ele !== " ") {
                        eleTue.push(<span className={ele}>{valueListTue[idx]}</span>)
                    } else {
                        eleTue.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListWed.map((ele, idx) => {
                    if (ele !== " ") {
                        eleWed.push(<span className={ele}>{valueListWed[idx]}</span>)
                    } else {
                        eleWed.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListThu.map((ele, idx) => {
                    if (ele !== " ") {
                        eleThu.push(<span className={ele}>{valueListThu[idx]}</span>)
                    } else {
                        eleThu.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListFri.map((ele, idx) => {
                    if (ele !== " ") {
                        eleFri.push(<span className={ele}>{valueListFri[idx]}</span>)
                    } else {
                        eleFri.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListSat.map((ele, idx) => {
                    if (ele !== " ") {
                        eleSat.push(<span className={ele}>{valueListSat[idx]}</span>)
                    } else {
                        eleSat.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListSun.map((ele, idx) => {
                    if (ele !== " ") {
                        eleSun.push(<span className={ele}>{valueListSun[idx]}</span>)
                    } else {
                        eleSun.push(<span className="label label-salary"></span>)
                    }
                });

                if (classNameListMon.length > 0) {
                    row1.push(eleMon);
                } else {
                    row1.push(" ");
                }
                if (classNameListTue.length > 0) {
                    row1.push(eleTue);
                } else {
                    row1.push(" ");
                }
                if (classNameListWed.length > 0) {
                    row1.push(eleWed);
                } else {
                    row1.push(" ");
                }
                if (classNameListThu.length > 0) {
                    row1.push(eleThu);
                } else {
                    row1.push(" ");
                }
                if (classNameListFri.length > 0) {
                    row1.push(eleFri);
                } else {
                    row1.push(" ");
                }
                if (classNameListSat.length > 0) {
                    row1.push(eleSat);
                } else {
                    row1.push(" ");
                }
                if (classNameListSun.length > 0) {
                    row1.push(eleSun);
                } else {
                    row1.push(" ");
                }
                row1.push(amountWeek);
            }
            if (moment(ele.dateFrom).format('MM-DD-YYYY') === moment(createDate.firstDayRow2).format('MM-DD-YYYY')) {
                ele.register.map((reg) => {
                    amountWeek = amountWeek + reg.cost;
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
                    // Mon
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow2).format('MM-DD-YYYY')) {
                        classNameListMon[index] = className;
                        valueListMon[index] = jobs[jobIndex].jobName;
                    }
                    // Tue
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow2).add(1, "days").format('MM-DD-YYYY')) {
                        classNameListTue[index] = className;
                        valueListTue[index] = jobs[jobIndex].jobName;
                    }
                    // Wed
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow2).add(2, "days").format('MM-DD-YYYY')) {
                        classNameListWed[index] = className;
                        valueListWed[index] = jobs[jobIndex].jobName;
                    }
                    // Thu
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow2).add(3, "days").format('MM-DD-YYYY')) {
                        classNameListThu[index] = className;
                        valueListThu[index] = jobs[jobIndex].jobName;
                    }
                    // Fri
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow2).add(4, "days").format('MM-DD-YYYY')) {
                        classNameListFri[index] = className;
                        valueListFri[index] = jobs[jobIndex].jobName;
                    }
                    // Sat
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow2).add(5, "days").format('MM-DD-YYYY')) {
                        classNameListSat[index] = className;
                        valueListSat[index] = jobs[jobIndex].jobName;
                    }
                    // Sun
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow2).add(6, "days").format('MM-DD-YYYY')) {
                        classNameListSun[index] = className;
                        valueListSun[index] = jobs[jobIndex].jobName;
                    }
                })
                totalAmount = totalAmount + amountWeek;

                classNameListMon.map((ele, idx) => {
                    if (ele !== " ") {
                        eleMon.push(<span className={ele}>{valueListMon[idx]}</span>)
                    } else {
                        eleMon.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListTue.map((ele, idx) => {
                    if (ele !== " ") {
                        eleTue.push(<span className={ele}>{valueListTue[idx]}</span>)
                    } else {
                        eleTue.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListWed.map((ele, idx) => {
                    if (ele !== " ") {
                        eleWed.push(<span className={ele}>{valueListWed[idx]}</span>)
                    } else {
                        eleWed.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListThu.map((ele, idx) => {
                    if (ele !== " ") {
                        eleThu.push(<span className={ele}>{valueListThu[idx]}</span>)
                    } else {
                        eleThu.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListFri.map((ele, idx) => {
                    if (ele !== " ") {
                        eleFri.push(<span className={ele}>{valueListFri[idx]}</span>)
                    } else {
                        eleFri.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListSat.map((ele, idx) => {
                    if (ele !== " ") {
                        eleSat.push(<span className={ele}>{valueListSat[idx]}</span>)
                    } else {
                        eleSat.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListSun.map((ele, idx) => {
                    if (ele !== " ") {
                        eleSun.push(<span className={ele}>{valueListSun[idx]}</span>)
                    } else {
                        eleSun.push(<span className="label label-salary"></span>)
                    }
                });

                if (classNameListMon.length > 0) {
                    row2.push(eleMon);
                } else {
                    row2.push(" ");
                }
                if (classNameListTue.length > 0) {
                    row2.push(eleTue);
                } else {
                    row2.push(" ");
                }
                if (classNameListWed.length > 0) {
                    row2.push(eleWed);
                } else {
                    row2.push(" ");
                }
                if (classNameListThu.length > 0) {
                    row2.push(eleThu);
                } else {
                    row2.push(" ");
                }
                if (classNameListFri.length > 0) {
                    row2.push(eleFri);
                } else {
                    row2.push(" ");
                }
                if (classNameListSat.length > 0) {
                    row2.push(eleSat);
                } else {
                    row2.push(" ");
                }
                if (classNameListSun.length > 0) {
                    row2.push(eleSun);
                } else {
                    row2.push(" ");
                }
                row2.push(amountWeek);
            }
            if (moment(ele.dateFrom).format('MM-DD-YYYY') === moment(createDate.firstDayRow3).format('MM-DD-YYYY')) {
                ele.register.map((reg) => {
                    amountWeek = amountWeek + reg.cost;
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
                    // Mon
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow3).format('MM-DD-YYYY')) {
                        classNameListMon[index] = className;
                        valueListMon[index] = jobs[jobIndex].jobName;
                    }
                    // Tue
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow3).add(1, "days").format('MM-DD-YYYY')) {
                        classNameListTue[index] = className;
                        valueListTue[index] = jobs[jobIndex].jobName;
                    }
                    // Wed
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow3).add(2, "days").format('MM-DD-YYYY')) {
                        classNameListWed[index] = className;
                        valueListWed[index] = jobs[jobIndex].jobName;
                    }
                    // Thu
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow3).add(3, "days").format('MM-DD-YYYY')) {
                        classNameListThu[index] = className;
                        valueListThu[index] = jobs[jobIndex].jobName;
                    }
                    // Fri
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow3).add(4, "days").format('MM-DD-YYYY')) {
                        classNameListFri[index] = className;
                        valueListFri[index] = jobs[jobIndex].jobName;
                    }
                    // Sat
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow3).add(5, "days").format('MM-DD-YYYY')) {
                        classNameListSat[index] = className;
                        valueListSat[index] = jobs[jobIndex].jobName;
                    }
                    // Sun
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow3).add(6, "days").format('MM-DD-YYYY')) {
                        classNameListSun[index] = className;
                        valueListSun[index] = jobs[jobIndex].jobName;
                    }
                })
                totalAmount = totalAmount + amountWeek;
                classNameListMon.map((ele, idx) => {
                    if (ele !== " ") {
                        eleMon.push(<span className={ele}>{valueListMon[idx]}</span>)
                    } else {
                        eleMon.push(<span className="label"></span>)
                    }
                });
                classNameListTue.map((ele, idx) => {
                    if (ele !== " ") {
                        eleTue.push(<span className={ele}>{valueListTue[idx]}</span>)
                    } else {
                        eleTue.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListWed.map((ele, idx) => {
                    if (ele !== " ") {
                        eleWed.push(<span className={ele}>{valueListWed[idx]}</span>)
                    } else {
                        eleWed.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListThu.map((ele, idx) => {
                    if (ele !== " ") {
                        eleThu.push(<span className={ele}>{valueListThu[idx]}</span>)
                    } else {
                        eleThu.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListFri.map((ele, idx) => {
                    if (ele !== " ") {
                        eleFri.push(<span className={ele}>{valueListFri[idx]}</span>)
                    } else {
                        eleFri.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListSat.map((ele, idx) => {
                    if (ele !== " ") {
                        eleSat.push(<span className={ele}>{valueListSat[idx]}</span>)
                    } else {
                        eleSat.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListSun.map((ele, idx) => {
                    if (ele !== " ") {
                        eleSun.push(<span className={ele}>{valueListSun[idx]}</span>)
                    } else {
                        eleSun.push(<span className="label label-salary"></span>)
                    }
                });

                if (classNameListMon.length > 0) {
                    row3.push(eleMon);
                } else {
                    row3.push(" ");
                }
                if (classNameListTue.length > 0) {
                    row3.push(eleTue);
                } else {
                    row3.push(" ");
                }
                if (classNameListWed.length > 0) {
                    row3.push(eleWed);
                } else {
                    row3.push(" ");
                }
                if (classNameListThu.length > 0) {
                    row3.push(eleThu);
                } else {
                    row3.push(" ");
                }
                if (classNameListFri.length > 0) {
                    row3.push(eleFri);
                } else {
                    row3.push(" ");
                }
                if (classNameListSat.length > 0) {
                    row3.push(eleSat);
                } else {
                    row3.push(" ");
                }
                if (classNameListSun.length > 0) {
                    row3.push(eleSun);
                } else {
                    row3.push(" ");
                }
                row3.push(amountWeek);
            }
            if (moment(ele.dateFrom).format('MM-DD-YYYY') === moment(createDate.firstDayRow4).format('MM-DD-YYYY')) {
                ele.register.map((reg) => {
                    amountWeek = amountWeek + reg.cost;
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
                    // Mon
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow4).format('MM-DD-YYYY')) {
                        classNameListMon[index] = className;
                        valueListMon[index] = jobs[jobIndex].jobName;
                    }
                    // Tue
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow4).add(1, "days").format('MM-DD-YYYY')) {
                        classNameListTue[index] = className;
                        valueListTue[index] = jobs[jobIndex].jobName;
                    }
                    // Wed
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow4).add(2, "days").format('MM-DD-YYYY')) {
                        classNameListWed[index] = className;
                        valueListWed[index] = jobs[jobIndex].jobName;
                    }
                    // Thu
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow4).add(3, "days").format('MM-DD-YYYY')) {
                        classNameListThu[index] = className;
                        valueListThu[index] = jobs[jobIndex].jobName;
                    }
                    // Fri
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow4).add(4, "days").format('MM-DD-YYYY')) {
                        classNameListFri[index] = className;
                        valueListFri[index] = jobs[jobIndex].jobName;
                    }
                    // Sat
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow4).add(5, "days").format('MM-DD-YYYY')) {
                        classNameListSat[index] = className;
                        valueListSat[index] = jobs[jobIndex].jobName;
                    }
                    // Sun
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow4).add(6, "days").format('MM-DD-YYYY')) {
                        classNameListSun[index] = className;
                        valueListSun[index] = jobs[jobIndex].jobName;
                    }
                })
                totalAmount = totalAmount + amountWeek;
                classNameListMon.map((ele, idx) => {
                    if (ele !== " ") {
                        eleMon.push(<span className={ele}>{valueListMon[idx]}</span>)
                    } else {
                        eleMon.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListTue.map((ele, idx) => {
                    if (ele !== " ") {
                        eleTue.push(<span className={ele}>{valueListTue[idx]}</span>)
                    } else {
                        eleTue.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListWed.map((ele, idx) => {
                    if (ele !== " ") {
                        eleWed.push(<span className={ele}>{valueListWed[idx]}</span>)
                    } else {
                        eleWed.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListThu.map((ele, idx) => {
                    if (ele !== " ") {
                        eleThu.push(<span className={ele}>{valueListThu[idx]}</span>)
                    } else {
                        eleThu.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListFri.map((ele, idx) => {
                    if (ele !== " ") {
                        eleFri.push(<span className={ele}>{valueListFri[idx]}</span>)
                    } else {
                        eleFri.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListSat.map((ele, idx) => {
                    if (ele !== " ") {
                        eleSat.push(<span className={ele}>{valueListSat[idx]}</span>)
                    } else {
                        eleSat.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListSun.map((ele, idx) => {
                    if (ele !== " ") {
                        eleSun.push(<span className={ele}>{valueListSun[idx]}</span>)
                    } else {
                        eleSun.push(<span className="label label-salary"></span>)
                    }
                });

                if (classNameListMon.length > 0) {
                    row4.push(eleMon);
                } else {
                    row4.push(" ");
                }
                if (classNameListTue.length > 0) {
                    row4.push(eleTue);
                } else {
                    row4.push(" ");
                }
                if (classNameListWed.length > 0) {
                    row4.push(eleWed);
                } else {
                    row4.push(" ");
                }
                if (classNameListThu.length > 0) {
                    row4.push(eleThu);
                } else {
                    row4.push(" ");
                }
                if (classNameListFri.length > 0) {
                    row4.push(eleFri);
                } else {
                    row4.push(" ");
                }
                if (classNameListSat.length > 0) {
                    row4.push(eleSat);
                } else {
                    row4.push(" ");
                }
                if (classNameListSun.length > 0) {
                    row4.push(eleSun);
                } else {
                    row4.push(" ");
                }
                row4.push(amountWeek);
            }
            if (moment(ele.dateFrom).format('MM-DD-YYYY') === moment(createDate.firstDayRow5).format('MM-DD-YYYY')) {
                ele.register.map((reg) => {
                    amountWeek = amountWeek + reg.cost;
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
                    // Mon
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow5).format('MM-DD-YYYY')) {
                        classNameListMon[index] = className;
                        valueListMon[index] = jobs[jobIndex].jobName;
                    }
                    // Tue
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow5).add(1, "days").format('MM-DD-YYYY')) {
                        classNameListTue[index] = className;
                        valueListTue[index] = jobs[jobIndex].jobName;
                    }
                    // Wed
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow5).add(2, "days").format('MM-DD-YYYY')) {
                        classNameListWed[index] = className;
                        valueListWed[index] = jobs[jobIndex].jobName;
                    }
                    // Thu
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow5).add(3, "days").format('MM-DD-YYYY')) {
                        classNameListThu[index] = className;
                        valueListThu[index] = jobs[jobIndex].jobName;
                    }
                    // Fri
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow5).add(4, "days").format('MM-DD-YYYY')) {
                        classNameListFri[index] = className;
                        valueListFri[index] = jobs[jobIndex].jobName;
                    }
                    // Sat
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow5).add(5, "days").format('MM-DD-YYYY')) {
                        classNameListSat[index] = className;
                        valueListSat[index] = jobs[jobIndex].jobName;
                    }
                    // Sun
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow5).add(6, "days").format('MM-DD-YYYY')) {
                        classNameListSun[index] = className;
                        valueListSun[index] = jobs[jobIndex].jobName;
                    }
                })
                totalAmount = totalAmount + amountWeek;
                classNameListMon.map((ele, idx) => {
                    if (ele !== " ") {
                        eleMon.push(<span className={ele}>{valueListMon[idx]}</span>)
                    } else {
                        eleMon.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListTue.map((ele, idx) => {
                    if (ele !== " ") {
                        eleTue.push(<span className={ele}>{valueListTue[idx]}</span>)
                    } else {
                        eleTue.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListWed.map((ele, idx) => {
                    if (ele !== " ") {
                        eleWed.push(<span className={ele}>{valueListWed[idx]}</span>)
                    } else {
                        eleWed.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListThu.map((ele, idx) => {
                    if (ele !== " ") {
                        eleThu.push(<span className={ele}>{valueListThu[idx]}</span>)
                    } else {
                        eleThu.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListFri.map((ele, idx) => {
                    if (ele !== " ") {
                        eleFri.push(<span className={ele}>{valueListFri[idx]}</span>)
                    } else {
                        eleFri.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListSat.map((ele, idx) => {
                    if (ele !== " ") {
                        eleSat.push(<span className={ele}>{valueListSat[idx]}</span>)
                    } else {
                        eleSat.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListSun.map((ele, idx) => {
                    if (ele !== " ") {
                        eleSun.push(<span className={ele}>{valueListSun[idx]}</span>)
                    } else {
                        eleSun.push(<span className="label label-salary"></span>)
                    }
                });

                if (classNameListMon.length > 0) {
                    row5.push(eleMon);
                } else {
                    row5.push(" ");
                }
                if (classNameListTue.length > 0) {
                    row5.push(eleTue);
                } else {
                    row5.push(" ");
                }
                if (classNameListWed.length > 0) {
                    row5.push(eleWed);
                } else {
                    row5.push(" ");
                }
                if (classNameListThu.length > 0) {
                    row5.push(eleThu);
                } else {
                    row5.push(" ");
                }
                if (classNameListFri.length > 0) {
                    row5.push(eleFri);
                } else {
                    row5.push(" ");
                }
                if (classNameListSat.length > 0) {
                    row5.push(eleSat);
                } else {
                    row5.push(" ");
                }
                if (classNameListSun.length > 0) {
                    row5.push(eleSun);
                } else {
                    row5.push(" ");
                }
                row5.push(amountWeek);
            }
            if (moment(ele.dateFrom).format('MM-DD-YYYY') === moment(createDate.firstDayRow6).format('MM-DD-YYYY')) {
                ele.register.map((reg) => {
                    amountWeek = amountWeek + reg.cost;
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
                    // Mon
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow6).format('MM-DD-YYYY')) {
                        classNameListMon[index] = className;
                        valueListMon[index] = jobs[jobIndex].jobName;
                    }
                    // Tue
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow6).add(1, "days").format('MM-DD-YYYY')) {
                        classNameListTue[index] = className;
                        valueListTue[index] = jobs[jobIndex].jobName;
                    }
                    // Wed
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow6).add(2, "days").format('MM-DD-YYYY')) {
                        classNameListWed[index] = className;
                        valueListWed[index] = jobs[jobIndex].jobName;
                    }
                    // Thu
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow6).add(3, "days").format('MM-DD-YYYY')) {
                        classNameListThu[index] = className;
                        valueListThu[index] = jobs[jobIndex].jobName;
                    }
                    // Fri
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow6).add(4, "days").format('MM-DD-YYYY')) {
                        classNameListFri[index] = className;
                        valueListFri[index] = jobs[jobIndex].jobName;
                    }
                    // Sat
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow6).add(5, "days").format('MM-DD-YYYY')) {
                        classNameListSat[index] = className;
                        valueListSat[index] = jobs[jobIndex].jobName;
                    }
                    // Sun
                    if (moment(reg.date).format('MM-DD-YYYY') === moment(createDate.firstDayRow6).add(6, "days").format('MM-DD-YYYY')) {
                        classNameListSun[index] = className;
                        valueListSun[index] = jobs[jobIndex].jobName;
                    }
                })
                totalAmount = totalAmount + amountWeek;
                classNameListMon.map((ele, idx) => {
                    if (ele !== " ") {
                        eleMon.push(<span className={ele}>{valueListMon[idx]}</span>)
                    } else {
                        eleMon.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListTue.map((ele, idx) => {
                    if (ele !== " ") {
                        eleTue.push(<span className={ele}>{valueListTue[idx]}</span>)
                    } else {
                        eleTue.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListWed.map((ele, idx) => {
                    if (ele !== " ") {
                        eleWed.push(<span className={ele}>{valueListWed[idx]}</span>)
                    } else {
                        eleWed.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListThu.map((ele, idx) => {
                    if (ele !== " ") {
                        eleThu.push(<span className={ele}>{valueListThu[idx]}</span>)
                    } else {
                        eleThu.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListFri.map((ele, idx) => {
                    if (ele !== " ") {
                        eleFri.push(<span className={ele}>{valueListFri[idx]}</span>)
                    } else {
                        eleFri.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListSat.map((ele, idx) => {
                    if (ele !== " ") {
                        eleSat.push(<span className={ele}>{valueListSat[idx]}</span>)
                    } else {
                        eleSat.push(<span className="label label-salary"></span>)
                    }
                });
                classNameListSun.map((ele, idx) => {
                    if (ele !== " ") {
                        eleSun.push(<span className={ele}>{valueListSun[idx]}</span>)
                    } else {
                        eleSun.push(<span className="label label-salary"></span>)
                    }
                });

                if (classNameListMon.length > 0) {
                    row6.push(eleMon);
                } else {
                    row6.push(" ");
                }
                if (classNameListTue.length > 0) {
                    row6.push(eleTue);
                } else {
                    row6.push(" ");
                }
                if (classNameListWed.length > 0) {
                    row6.push(eleWed);
                } else {
                    row6.push(" ");
                }
                if (classNameListThu.length > 0) {
                    row6.push(eleThu);
                } else {
                    row6.push(" ");
                }
                if (classNameListFri.length > 0) {
                    row6.push(eleFri);
                } else {
                    row6.push(" ");
                }
                if (classNameListSat.length > 0) {
                    row6.push(eleSat);
                } else {
                    row6.push(" ");
                }
                if (classNameListSun.length > 0) {
                    row6.push(eleSun);
                } else {
                    row6.push(" ");
                }
                row6.push(amountWeek);
            }

        })

    }

    const onReturnSalaryAllMemberScreen = () => {
        setViewSalaryPersonalScreen(0);
        setViewSalaryAllMemberScreen(1);
    }

    return (
        <Fragment>
            {shiftRegister.length === 0 ? (
                <Spinner />
            ) : (
                <Fragment>
                    <div className="row">
                        <div className="col-12 m-t-30">
                            <div className="card">
                                <div className="card-header bg-info">
                                    <h4 class="m-b-0 text-white">Thông tin lương</h4>
                                    {/* <p>{createDate.firstDayOfFirstWeekInMonth} - {createDate.lastDayOfLastWeekInMonth}</p> */}
                                    {/* <p>{createDate.currentUser}</p> */}
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h3>Tháng <Moment format="MM">{createDate.currentDay}</Moment></h3> Năm <Moment format="YYYY">{createDate.currentDay}</Moment>
                                        </div>
                                        <div className="col-md-8">
                                            <h3 className="text-right">{createDate.currentUser}</h3>
                                            {/* <Link className="btn btn-sm btn-success" to="/salarys" style={{ float: 'right' }}>
                                                <i className="ti-arrow-left"></i>{"  "}<span className="hide-sm">Trở về</span>
                                            </Link> */}
                                            <button types="button" class="btn btn-sm btn-success" style={{ float: 'right' }}
                                                onClick={() => onReturnSalaryAllMemberScreen()}>
                                                <i className="ti-arrow-left"></i>{"  "}<span className="hide-sm">Trở về</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="card-group-shiftRegister color-bordered-table-shiftRegister headerViewOrNotView" style={{ height: "40px" }}>
                                    </div>
                                    <div class="card-group-shiftRegister color-bordered-table-shiftRegister hiddenDiv">
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
                                    {/* Row 1 */}
                                    <div class="card-group-shiftRegister">
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 2">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row1[0]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[1] }}>{createDate.listDay[0]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 2">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row1[0]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[1] }}>{createDate.listDay[0]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 3">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row1[1]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[3] }}>{createDate.listDay[2]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 3">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row1[1]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[3] }}>{createDate.listDay[2]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 4">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row1[2]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[5] }}>{createDate.listDay[4]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 4">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row1[2]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[5] }}>{createDate.listDay[4]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 5">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row1[3]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[7] }}>{createDate.listDay[6]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 5">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row1[3]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[7] }}>{createDate.listDay[6]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 6">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row1[4]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[9] }}>{createDate.listDay[8]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 6">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row1[4]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[9] }}>{createDate.listDay[8]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 7">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row1[5]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[11] }}>{createDate.listDay[10]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 7">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row1[5]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[11] }}>{createDate.listDay[10]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Chủ nhật">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row1[6]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[13] }}>{createDate.listDay[12]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Chủ nhật">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row1[6]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[13] }}>{createDate.listDay[12]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7" style={{ background: "#ab8ce4" }}>
                                            <div class="card-body-shiftRegister text-right">
                                                <p class="text-right font-medium m-b-0" style={{ color: "black" }}>{row1.length > 0 && row1[7] !== "0" ? row1[7].toLocaleString() : " "}</p>
                                            </div>
                                        </div>

                                    </div>
                                    {/* Row 2 */}
                                    <div class="card-group-shiftRegister">
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 2">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row2[0]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[15] }}>{createDate.listDay[14]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 2">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row2[0]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[15] }}>{createDate.listDay[14]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 3">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row2[1]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[17] }}>{createDate.listDay[16]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 3">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row2[1]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[17] }}>{createDate.listDay[16]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 4">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row2[2]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[19] }}>{createDate.listDay[18]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 4">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row2[2]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[19] }}>{createDate.listDay[18]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 5">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row2[3]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[21] }}>{createDate.listDay[20]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 5">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row2[3]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[21] }}>{createDate.listDay[20]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 6">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row2[4]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[23] }}>{createDate.listDay[22]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 6">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row2[4]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[23] }}>{createDate.listDay[22]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 7">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row2[5]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[25] }}>{createDate.listDay[24]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 7">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row2[5]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[25] }}>{createDate.listDay[24]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Chủ nhật">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row2[6]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[27] }}>{createDate.listDay[26]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Chủ nhật">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row2[6]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[27] }}>{createDate.listDay[26]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7" style={{ background: "#ab8ce4" }}>
                                            <div class="card-body-shiftRegister text-right">
                                                <p class="text-right font-medium m-b-0" style={{ color: "black" }}>{row2.length > 0 && row2[7] !== 0 ? row2[7].toLocaleString() : " "}</p>
                                            </div>
                                        </div>

                                    </div>
                                    {/* Row 3 */}
                                    <div class="card-group-shiftRegister">
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 2">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row3[0]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[29] }}>{createDate.listDay[28]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 2">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row3[0]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[29] }}>{createDate.listDay[28]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 3">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row3[1]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[31] }}>{createDate.listDay[30]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 3">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row3[1]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[31] }}>{createDate.listDay[30]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 4">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row3[2]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[33] }}>{createDate.listDay[32]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 4">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row3[2]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[33] }}>{createDate.listDay[32]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 5">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row3[3]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[35] }}>{createDate.listDay[34]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 5">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row3[3]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[35] }}>{createDate.listDay[34]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 6">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row3[4]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[37] }}>{createDate.listDay[36]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 6">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row3[4]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[37] }}>{createDate.listDay[36]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 7">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row3[5]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[39] }}>{createDate.listDay[38]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 7">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row3[5]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[39] }}>{createDate.listDay[38]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Chủ nhật">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row3[6]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[41] }}>{createDate.listDay[40]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Chủ nhật">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row3[6]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[41] }}>{createDate.listDay[40]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7" style={{ background: "#ab8ce4" }}>
                                            <div class="card-body-shiftRegister text-right">
                                                <p class="text-right font-medium m-b-0" style={{ color: "black" }}>{row3.length > 0 && row3[7] !== 0 ? row3[7].toLocaleString() : " "}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Row 4 */}
                                    <div class="card-group-shiftRegister">
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 2">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row4[0]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[43] }}>{createDate.listDay[42]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 2">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row4[0]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[43] }}>{createDate.listDay[42]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 3">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row4[1]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[45] }}>{createDate.listDay[44]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 3">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row4[1]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[45] }}>{createDate.listDay[44]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 4">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row4[2]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[47] }}>{createDate.listDay[46]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 4">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row4[2]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[47] }}>{createDate.listDay[46]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 5">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row4[3]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[49] }}>{createDate.listDay[48]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 5">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row4[3]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[49] }}>{createDate.listDay[48]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 6">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row4[4]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[51] }}>{createDate.listDay[50]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 6">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row4[4]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[51] }}>{createDate.listDay[50]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 7">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row4[5]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[53] }}>{createDate.listDay[52]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 7">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row4[5]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[53] }}>{createDate.listDay[52]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Chủ nhật">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row4[6]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[55] }}>{createDate.listDay[54]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Chủ nhật">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row4[6]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[55] }}>{createDate.listDay[54]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7" style={{ background: "#ab8ce4" }}>
                                            <div class="card-body-shiftRegister text-right">
                                                <p class="text-right font-medium m-b-0" style={{ color: "black" }}>{row4.length > 0 && row4[7] !== 0 ? row4[7].toLocaleString() : " "}</p>
                                            </div>
                                        </div>

                                    </div>
                                    {/* Row 5 */}
                                    <div class="card-group-shiftRegister">
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 2">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row5[0]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[57] }}>{createDate.listDay[56]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 2">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row5[0]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[57] }}>{createDate.listDay[56]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 3">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row5[1]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[59] }}>{createDate.listDay[58]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 3">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row5[1]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[59] }}>{createDate.listDay[58]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 4">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row5[2]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[61] }}>{createDate.listDay[60]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 4">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row5[2]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[61] }}>{createDate.listDay[60]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 5">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row5[3]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[63] }}>{createDate.listDay[62]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 5">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row5[3]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[63] }}>{createDate.listDay[62]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 6">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row5[4]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[65] }}>{createDate.listDay[64]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 6">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row5[4]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[65] }}>{createDate.listDay[64]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 7">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row5[5]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[67] }}>{createDate.listDay[66]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 7">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row5[5]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[67] }}>{createDate.listDay[66]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Chủ nhật">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row5[6]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[69] }}>{createDate.listDay[68]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Chủ nhật">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row5[6]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[69] }}>{createDate.listDay[68]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7" style={{ background: "#ab8ce4" }}>
                                            <div class="card-body-shiftRegister text-right">
                                                <p class="text-right font-medium m-b-0" style={{ color: "black" }}>{row5.length > 0 && row5[7] !== 0 ? row5[7].toLocaleString() : " "}</p>
                                            </div>
                                        </div>

                                    </div>
                                    {/* Row 6 */}
                                    <div class="card-group-shiftRegister">
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 2">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row6[0]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[71] }}>{createDate.listDay[70]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 2">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row6[0]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[71] }}>{createDate.listDay[70]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 3">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row6[1]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[73] }}>{createDate.listDay[72]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 3">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row6[1]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[73] }}>{createDate.listDay[72]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 4">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row6[2]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[75] }}>{createDate.listDay[74]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 4">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row6[2]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[75] }}>{createDate.listDay[74]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 5">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row6[3]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[77] }}>{createDate.listDay[76]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 5">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row6[3]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[77] }}>{createDate.listDay[76]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 6">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row6[4]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[79] }}>{createDate.listDay[78]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 6">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row6[4]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[79] }}>{createDate.listDay[78]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Thứ 7">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row6[5]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[81] }}>{createDate.listDay[80]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Thứ 7">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row6[5]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[81] }}>{createDate.listDay[80]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7">
                                            <div class="rowSalary viewHeaderDay hiddenContent-1" data-label="Chủ nhật">
                                                <div class="col-salary-md-5"></div>
                                                <div class="col-salary-md-4">
                                                    <p class="text-center font-medium m-b-0">{row6[6]}</p>
                                                </div>
                                                <div class="col-salary-md-3">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[83] }}>{createDate.listDay[82]}</p>
                                                </div>
                                            </div>
                                            <div class="rowSalary hiddenContent-2" data-label="Chủ nhật">
                                                <div class="col-salary-md-7">
                                                    <p class="text-center font-medium m-b-0">{row6[6]}</p>
                                                </div>
                                                <div class="col-salary-md-5">
                                                    <p class="text-center font-medium m-b-0" style={{ color: createDate.listDay[83] }}>{createDate.listDay[82]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-shiftRegister col-md-1-7" style={{ background: "#ab8ce4" }}>
                                            <div class="card-body-shiftRegister text-right">
                                                <p class="text-right font-medium m-b-0" style={{ color: "black" }}>{row6.length > 0 && row6[7] !== 0 ? row6[7].toLocaleString() : " "}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ marginTop: "10px" }}>
                                        <div className="col-md-10">
                                            <h3 class="text-right font-medium m-b-0" style={{ color: "black" }}>Tổng tiền</h3>
                                        </div>
                                        <div className="col-md-2">
                                            <h3 class="text-right font-medium m-b-0" style={{ color: "black" }}>{totalAmount.toLocaleString()}</h3>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment >
            )}
        </Fragment>
    );
};

SalaryPersonal.propTypes = {
    userId: PropTypes.object.isRequired,
    dateFrom: PropTypes.object.isRequired,
    dateTo: PropTypes.object.isRequired,
    currentDay: PropTypes.object.isRequired,
    setViewSalaryAllMemberScreen: PropTypes.func.isRequired,
    setViewSalaryPersonalScreen: PropTypes.func.isRequired,
    getShiftRegisters: PropTypes.func.isRequired,
    getAllShifts: PropTypes.func.isRequired,
    getAllJobs: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    getShiftRegisterViewSalary: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    shiftRegister: state.shiftRegister,
    shift: state.shift,
    job: state.job,
    user: state.user,
});

export default connect(mapStateToProps, {
    getShiftRegisterViewSalary, getShiftRegisters, getAllShifts, getAllJobs, getAllUsers
})(SalaryPersonal);
