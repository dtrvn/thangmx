import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import moment from "moment";

const ShiftJob = ({
    shifts,
    jobs,
    shiftCurrentList,
    jobCurrentList,
}) => {

    
    return (
        <Fragment>
            
        </Fragment>
    );
};

ShiftJob.propTypes = {
    shifts: PropTypes.object.isRequired,
    jobs: PropTypes.object.isRequired,
    shiftCurrentList: PropTypes.object.isRequired,
    jobCurrentList: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(
    ShiftJob
);
