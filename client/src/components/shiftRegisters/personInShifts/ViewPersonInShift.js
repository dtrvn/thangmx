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
    var initialFormState = initialFormState = {
        id: null,
        branchId: branchId,
        startDate: startDate,
        endDate: endDate,
        currentDate: currentDate,
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
        personNo0: "",
        personNo1: "",
        personNo2: "",
        personNo3: "",
        personNo4: "",
        personNo5: "",
        personNo6: "",
        personNo7: "",
        personNo8: "",
        personNo9: "",
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

    let name0, name1, name2, name3, name4, name5, name6, name7, name8, name9 = "";
    let id0, id1, id2, id3, id4, id5, id6, id7, id8, id9 = null;
    let elementList1 = [];
    let elementList2 = [];
    let elementList3 = [];
    let elementList4 = [];
    let getIndex = null;
    let labelName = null;

    useEffect(() => {
        shifts.map((ele, idx) => {
            getIndex = personNo.indexOf(ele._id);
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
            if (idx === 3) {
                getIndex >= 0 ? name3 = personNo[getIndex + 1] : name3 = " ";
                id3 = ele._id;
            }
            if (idx === 4) {
                getIndex >= 0 ? name4 = personNo[getIndex + 1] : name4 = " ";
                id4 = ele._id;
            }
            if (idx === 5) {
                getIndex >= 0 ? name5 = personNo[getIndex + 1] : name5 = " ";
                id5 = ele._id;
            }
            if (idx === 6) {
                getIndex >= 0 ? name6 = personNo[getIndex + 1] : name6 = " ";
                id6 = ele._id;
            }
            if (idx === 7) {
                getIndex >= 0 ? name7 = personNo[getIndex + 1] : name7 = " ";
                id7 = ele._id;
            }
            if (idx === 8) {
                getIndex >= 0 ? name8 = personNo[getIndex + 1] : name8 = " ";
                id8 = ele._id;
            }
            if (idx === 9) {
                getIndex >= 0 ? name9 = personNo[getIndex + 1] : name9 = " ";
                id9 = ele._id;
            }
        })

        setFormData({
            ...formData,
            id: getId,
            currentDate: currentDate,
            shiftId0: id0,
            shiftId1: id1,
            shiftId2: id2,
            shiftId3: id3,
            shiftId4: id4,
            shiftId5: id5,
            shiftId6: id6,
            shiftId7: id7,
            shiftId8: id8,
            shiftId9: id9,
            personNo0: name0,
            personNo1: name1,
            personNo2: name2,
            personNo3: name3,
            personNo4: name4,
            personNo5: name5,
            personNo6: name6,
            personNo7: name7,
            personNo8: name8,
            personNo9: name9,
            oldData: personNo,
        })
    }, [personInShift]);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    shifts.map((ele, idx) => {
        if (idx === 0) {
            labelName = "input-group-text label-success";
            elementList1.push(
                <div className="col-md-4">
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
            elementList1.push(
                <div className="col-md-4">
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
            elementList1.push(
                <div className="col-md-4">
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
        if (idx === 3) {
            labelName = "input-group-text";
            elementList2.push(
                <div className="col-md-4">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className={labelName} style={{ backgroundColor: "#cc9900", color: "white" }}>{ele.shiftName}</span>
                        </div>
                        <input type="text"
                            name="personNo3" value={formData.personNo3} onChange={(e) => onChange(e)} />
                    </div>
                </div>
            );
        }
        if (idx === 4) {
            labelName = "input-group-text";
            elementList2.push(
                <div className="col-md-4">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className={labelName} style={{ backgroundColor: "#ff33cc", color: "white" }}>{ele.shiftName}</span>
                        </div>
                        <input type="text"
                            name="personNo4" value={formData.personNo4} onChange={(e) => onChange(e)} />
                    </div>
                </div>
            );
        }
        if (idx === 5) {
            labelName = "input-group-text";
            elementList2.push(
                <div className="col-md-4">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className={labelName} style={{ backgroundColor: "#00cc00", color: "white" }}>{ele.shiftName}</span>
                        </div>
                        <input type="text"
                            name="personNo5" value={formData.personNo5} onChange={(e) => onChange(e)} />
                    </div>
                </div>
            );
        }
        if (idx === 6) {
            labelName = "input-group-text";
            elementList3.push(
                <div className="col-md-4">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className={labelName} style={{ backgroundColor: "#00ccff", color: "white" }}>{ele.shiftName}</span>
                        </div>
                        <input type="text"
                            name="personNo6" value={formData.personNo6} onChange={(e) => onChange(e)} />
                    </div>
                </div>
            );
        }
        if (idx === 7) {
            labelName = "input-group-text";
            elementList3.push(
                <div className="col-md-4">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className={labelName} style={{ backgroundColor: "#9933ff", color: "white" }}>{ele.shiftName}</span>
                        </div>
                        <input type="text"
                            name="personNo7" value={formData.personNo7} onChange={(e) => onChange(e)} />
                    </div>
                </div>
            );
        }
        if (idx === 8) {
            labelName = "input-group-text";
            elementList3.push(
                <div className="col-md-4">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className={labelName} style={{ backgroundColor: "#ff6600", color: "white" }}>{ele.shiftName}</span>
                        </div>
                        <input type="text"
                            name="personNo8" value={formData.personNo8} onChange={(e) => onChange(e)} />
                    </div>
                </div>
            );
        }
        if (idx === 9) {
            labelName = "input-group-text";
            elementList4.push(
                <div className="col-md-4">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className={labelName} style={{ backgroundColor: "#006600", color: "white" }}>{ele.shiftName}</span>
                        </div>
                        <input type="text"
                            name="personNo9" value={formData.personNo9} onChange={(e) => onChange(e)} />
                    </div>
                </div>
            );
        }
    })

    const onSubmit = (e) => {
        e.preventDefault();
        addPersonInShift(formData, history);
    };

    return (
        <Fragment>
            <form
                class="form"
                onSubmit={(e) => onSubmit(e)}
            >
                <div className="row">
                    {elementList1}
                    {elementList2}
                    {elementList3}
                    {elementList4}
                </div>

                <div className="row">
                    <button
                        type="submit"
                        class="btn btn-info"
                    >
                        <i class="fas fa-plus"></i>{"  "}<span className="hide-sm">Cập nhật</span>
                    </button>
                </div>
            </form>
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addPersonInShift })(
    ViewPersonInShift
);
