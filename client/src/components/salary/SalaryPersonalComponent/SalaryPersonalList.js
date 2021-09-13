import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter, Redirect } from "react-router-dom";

import Moment from "react-moment";
import moment from "moment";

const SalaryPersonalList = ({

}) => {



    return (
        <Fragment>
            <div class="card-group-shiftRegister">

                <div class="card-shiftRegister col-md-1-7">
                    <div class="card-body-shiftRegister text-center">
                        {/* <p class="text-center font-medium m-b-0">{eleSat}</p> */}
                    </div>
                </div>
                <div class="card-shiftRegister col-md-1-7">
                    <div class="card-body-shiftRegister text-center">
                        {/* <p class="text-center font-medium m-b-0">{eleSat}</p> */}
                    </div>
                </div>
                <div class="card-shiftRegister col-md-1-7">
                    <div class="card-body-shiftRegister text-center">
                        {/* <p class="text-center font-medium m-b-0">{eleSat}</p> */}
                    </div>
                </div>
                <div class="card-shiftRegister col-md-1-7">
                    <div class="card-body-shiftRegister text-center">
                        {/* <p class="text-center font-medium m-b-0">{eleSat}</p> */}
                    </div>
                </div>
                <div class="card-shiftRegister col-md-1-7">
                    <div class="card-body-shiftRegister text-center">
                        {/* <p class="text-center font-medium m-b-0">{eleSat}</p> */}
                    </div>
                </div>
                <div class="card-shiftRegister col-md-1-7">
                    <div class="card-body-shiftRegister text-center">
                        {/* <p class="text-center font-medium m-b-0">{eleSat}</p> */}
                    </div>
                </div>
                <div class="card-shiftRegister col-md-1-7">
                    <div class="card-body-shiftRegister text-center">
                        {/* <p class="text-center font-medium m-b-0">{eleSat}</p> */}
                    </div>
                </div>
                <div class="card-shiftRegister col-md-1-7">
                    <div class="card-body-shiftRegister text-center">
                        <p class="text-center font-medium m-b-0">A</p>
                        <p class="text-center font-medium m-b-0">A</p>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

SalaryPersonalList.propTypes = {

};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {

})(SalaryPersonalList);
