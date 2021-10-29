import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { addPersonInShift } from "../../../actions/personInShift";
import { set } from "mongoose";

const ViewPersonInShift = ({
    personInShift,
    shifts,
    branchId,
    startDate,
    endDate,
    currentDate,
    history,
    addPersonInShift,
}) => {
    // console.log("personInShift "+JSON.stringify(personInShift));
    var initialFormState = initialFormState = {
        id: null,
        branchId: branchId,
        startDate: startDate,
        endDate: endDate,
        currentDate: currentDate,
        shiftId0: "",
        shiftId1: "",
        shiftId2: "",
        personNo0: "",
        personNo1: "",
        personNo2: "",
        oldData: [],
    };

    const [formData, setFormData] = useState(initialFormState);

    let personNo = [];
    let getId = null;
    if (personInShift) {
        personInShift.map((ele) => {
            getId = ele._id;
            ele.personShift.map((req) => {
                personNo.push(req.shiftId);
                personNo.push(req.personNumber);
            })
        })
    }

    let name0, name1, name2 = "";
    let id0, id1, id2 = null;
    let elementList = [];
    // let createName = null;
    let getIndex = null;
    let labelName = null;
    // let valueInput = null;

    useEffect(() => {
        shifts.map((ele, idx) => {
            getIndex = personNo.indexOf(ele._id);
            // if (getIndex >= 0) {
            //     if (idx === 0) {
            //         name0 = personNo[getIndex + 1];
            //     }
            //     if (idx === 1) {
            //         name1 = personNo[getIndex + 1];
            //     }
            //     if (idx === 2) {
            //         name2 = personNo[getIndex + 1];
            //     }
            // }
            if (idx === 0) {
                getIndex >= 0 ? name0 = personNo[getIndex + 1] : name0 = " ";
                id0 = ele._id;
            }
            if (idx === 1) {
                getIndex >= 0 ? name1 = personNo[getIndex + 1] : name1 = " ";
                id1 = ele._id;
            }
            if (idx === 2) {
                getIndex >= 0 ? name2 = personNo[getIndex + 1] : name2 = " ";
                id2 = ele._id;
            }
        })

        // if (personNo.length === 0) {
        //     setFormData({
        //         ...formData,
        //         shiftId0: "",
        //         shiftId1: "",
        //         shiftId2: "",
        //         personNo0: "",
        //         personNo1: "",
        //         personNo2: "",
        //     })
        // } else {
        setFormData({
            ...formData,
            id: getId,
            currentDate: currentDate,
            shiftId0: id0,
            shiftId1: id1,
            shiftId2: id2,
            personNo0: name0,
            personNo1: name1,
            personNo2: name2,
            oldData: personNo,
        })
        // }
    }, [personInShift]);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    shifts.map((ele, idx) => {
        // getIndex = personNo.indexOf(ele._id);
        // createName = "shift" + idx;
        // if (getIndex >= 0) {
        //     valueInput = personNo[getIndex + 1];
        // } else {
        // valueInput = "0";
        // }
        if (idx === 0) {
            labelName = "input-group-text label-success";
            // formData.personNo0 = valueInput;
            elementList.push(
                <div className="col-md-3">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className={labelName}>{ele.shiftName}</span>
                        </div>
                        <input type="text"
                            name="personNo0" value={formData.personNo0} onChange={(e) => onChange(e)} />
                    </div>
                </div>
            );
        }
        if (idx === 1) {
            labelName = "input-group-text label-info";
            // formData.personNo1 = valueInput;
            elementList.push(
                <div className="col-md-3">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className={labelName}>{ele.shiftName}</span>
                        </div>
                        <input type="text"
                            name="personNo1" value={formData.personNo1} onChange={(e) => onChange(e)} />
                    </div>
                </div>
            );
        }
        if (idx === 2) {
            labelName = "input-group-text label-warning";
            // formData.personNo2 = valueInput;
            elementList.push(
                <div className="col-md-3">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className={labelName}>{ele.shiftName}</span>
                        </div>
                        <input type="text"
                            name="personNo2" value={formData.personNo2} onChange={(e) => onChange(e)} />
                    </div>
                </div>
            );
        }
    })

    // const onaddPersonInShift = () => {
    //     console.log("input " + formData.personNo0);
    //     console.log("input1 " + formData.personNo1);
    //     console.log("input2 " + formData.personNo2);
    // }

    const onSubmit = (e) => {
        e.preventDefault();
        addPersonInShift(formData, history);
    };

    return (
        <Fragment>
            {/* <label class="control-label mt-3">{" "}(<Moment format="DD/MM">{personInShifts.date}</Moment>)</label> */}
            {/* <div class="row"> */}
            {/* <div className="col-lg-2">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text label-success">Ca 1</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with checkbox" />
                    </div>
                </div> */}
            {/* {JSON.stringify(formData)} */}

            <form
                class="form row"
                onSubmit={(e) => onSubmit(e)}
            >
                {elementList}
                {/* <input
                        type="text"
                        placeholder="* Loại nhân viên"
                        name="personNo0"
                        value={formData.personNo0}
                        onChange={(e) => onChange(e)}
                    />
                    <input
                        type="text"
                        placeholder="* Loại nhân viên"
                        name="personNo1"
                        value={formData.personNo1}
                        onChange={(e) => onChange(e)}
                    />
                    <input
                        type="text"
                        placeholder="* Loại nhân viên"
                        name="personNo2"
                        value={formData.personNo2}
                        onChange={(e) => onChange(e)}
                    /> */}

                <div className="col-md-3">
                    <button
                        type="submit"
                        class="btn btn-info"
                    // onClick={() => onaddPersonInShift()}
                    >
                        <i class="fas fa-plus"></i>{"  "}<span className="hide-sm">Cập nhật</span>
                    </button>
                </div>
            </form>
            {/* </div> */}
            {/* <div className="jq-toast-wrap top-right">
                <div className="jq-toast-single jq-has-icon jq-icon-success" style={{ textAlign: 'left', display: 'none' }}>
                    <span className="jq-toast-loader jq-toast-loaded" style={{ WebkitTransition: 'width 3.1s ease-in', OTransition: 'width 3.1s ease-in', transition: 'width 3.1s ease-in', backgroundColor: '#ff6849' }} />
                    <span className="close-jq-toast-single">×</span>
                    <h2 className="jq-toast-heading">Welcome to Material Pro admin</h2>
                    Use the predefined ones, or specify a custom position object.
                </div>
            </div> */}
        </Fragment>

    )
};

ViewPersonInShift.propTypes = {
    personInShifts: PropTypes.object.isRequired,
    shifts: PropTypes.object.isRequired,
    branchId: PropTypes.object.isRequired,
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    currentDate: PropTypes.object.isRequired,
    addPersonInShift: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // personInShift: state.personInShift,
});

export default connect(mapStateToProps, { addPersonInShift })(
    ViewPersonInShift
);
