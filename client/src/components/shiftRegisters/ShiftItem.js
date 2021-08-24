import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import moment from "moment";
import JobItem from "./JobItem";

const ShiftItem = ({
    shift,
    jobs,
    shiftCurrentList,
    jobCurrentList,
}) => {

    const [shiftSwitch, setShiftSwitch] = useState(false);

    
    let onColor = "#EF476F";
    let checkExistShift = null;
    checkExistShift = shiftCurrentList.indexOf(shift._id);
    // useEffect(() => {
    //     setShiftSwitch(false);
    //     checkExistShift = shiftCurrentList.indexOf(shift._id);
    //     if(checkExistShift){
    //         setShiftSwitch(true);
    //     }
    // }, [shiftSwitch]);

    return (
        <Fragment>
            <div className="form-group">
                <div class="row">
                    <div class="col-md-2">
                        {checkExistShift}
                        <input
                            checked={shiftSwitch}
                            onChange={() => setShiftSwitch(!shiftSwitch)}
                            className="react-switch-checkbox"
                            id={`react-switch-new`}
                            type="checkbox"
                        />
                        <label
                            style={{ background: shiftSwitch && onColor }}
                            className="react-switch-label"
                            htmlFor={`react-switch-new`}
                        >
                            <span className={`react-switch-button`} />
                        </label>
                        <p class="text-center font-medium m-b-0">{shift.shiftName}</p>
                    </div>
                    <div class="col-md-3">
                        <div className="btn-group md-3" data-toggle="buttons" role="group">
                            {/* <JobItem /> */}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

ShiftItem.propTypes = {
    shift: PropTypes.object.isRequired,
    jobs: PropTypes.object.isRequired,
    shiftCurrentList: PropTypes.object.isRequired,
    jobCurrentList: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(
    ShiftItem
);
