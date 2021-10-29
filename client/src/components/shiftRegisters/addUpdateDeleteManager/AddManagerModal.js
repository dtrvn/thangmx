import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { addUpdateDeleteUserManager, setShowAddManagerModal } from "../../../actions/shiftRegisterManager";
import Switch from './Switch';
// import AlertShiftRegister from '../../layout/AlertShiftRegister';

const AddManagerModal = ({
    currentUserId,
    users,
    countCallAddManagerModal,
    currentDay,
    branchId,
    dateFrom,
    dateTo,
    addUpdateDeleteUserManager,
    showAddManagerModal,
    setShowAddManagerModal,
}) => {
    const [formData, setFormData] = useState({
        userId: null,
        userIdOld: currentUserId,
        branchId: branchId,
        dateFrom: moment(dateFrom).format('MM-DD-YYYY'),
        dateTo: moment(dateTo).format('MM-DD-YYYY'),
        date: moment(currentDay).format('MM-DD-YYYY'),
        userFlag: "0",
    });

    const [value, setValue] = useState(false);
    const [disableButtonUpdate, setDisableButtonUpdate] = useState(0);
    const { userId } = formData;

    let elmUsers = [];
    let getName = "";

    useEffect(() => {
        console.log("useEffect " + currentUserId + " - " + formData.userIdOld);
        setFormData({
            ...formData,
            userIdOld: currentUserId,
            date: moment(currentDay).format('MM-DD-YYYY'),
            userId: "0",
            userFlag: "0",
        });
        if (currentUserId !== "") {
            setValue(true);
        } else {
            setValue(false);
        }
        setDisableButtonUpdate(0);
    }, [countCallAddManagerModal]);

    elmUsers.push(<option value="0">* Chọn người quản lý</option>);
    users.map((ele, idx) => {
        // Lấy roles Admin và khác user hiện tại
        if (ele.roles === "Admin" && ele._id !== currentUserId) {
            elmUsers.push(<option value={ele._id}>{ele.name}</option>);
        }
        if (ele._id === currentUserId) {
            getName = ele.name;
        }
    });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (value === false) {
            if (currentUserId !== "") {
                // Delete user
                formData.userFlag = "1";
                setDisableButtonUpdate(1);
            }
        } else {
            if (currentUserId !== "") {
                if (formData.userId === currentUserId || formData.userId === "0") {
                    // No change
                    formData.userFlag = "0";
                } else {
                    // Change user (Update)
                    formData.userFlag = "2";
                    setDisableButtonUpdate(1);
                }
            } else {
                if (formData.userId === "0") {
                    // No change
                    formData.userFlag = "0";
                } else {
                    // Add user
                    formData.userFlag = "3";
                    setDisableButtonUpdate(1);
                }
            }
        }

        // if (formData.userFlag === "0") {
        //     if (formData.userId === null || formData.userId === "0") {
        //         // No change
        //         formData.userFlag = "0";
        //     }
        // }

        addUpdateDeleteUserManager(formData);
    };

    const clearData = () => {
        setShowAddManagerModal(false);
    }

    return (
        <Fragment>
            <div className="fade modal-backdrop show"></div>
            <div id="responsive-modal-AddManager" className={`modal ${showAddManagerModal === true ? "show" : ""}`} tabIndex={-1} style={{ display: showAddManagerModal === true ? 'block' : 'none' }} data-backdrop="static"
                data-keyboard="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Cập nhật ca quản lý ngày (<Moment format="DD/MM">{currentDay}</Moment>)</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <form className="form" onSubmit={(e) => onSubmit(e)}>
                            {/* <AlertShiftRegister /> */}

                            <div className="modal-body">

                                <div class="form-group">
                                    <div className="row">
                                        <Switch
                                            isOn={value}
                                            onColor="#EF476F"
                                            handleToggle={() => setValue(!value)}
                                            itemClass={""} />
                                        <div className="col-md-9">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text label-success">{getName}</span>
                                                </div>
                                                <select
                                                    disabled={value ? "" : "disabled"}
                                                    name="userId"
                                                    value={userId}
                                                    onChange={(e) => onChange(e)}
                                                    class="form-control custom-select"
                                                >
                                                    {elmUsers}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default waves-effect" data-dismiss="modal" onClick={() => clearData()}>Đóng</button>
                                <button type="submit" className="btn btn-danger waves-effect waves-light" disabled={disableButtonUpdate === 0 ? "" : "disabled"}>Lưu thay đổi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

AddManagerModal.propTypes = {
    idUpdate: PropTypes.object.isRequired,
    currentUserId: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    countCallAddManagerModal: PropTypes.object.isRequired,
    currentDay: PropTypes.object.isRequired,
    branchId: PropTypes.object.isRequired,
    dateFrom: PropTypes.object.isRequired,
    dateTo: PropTypes.object.isRequired,
    showAddManagerModal: PropTypes.object.isRequired,
    addUpdateDeleteUserManager: PropTypes.func.isRequired,
    setShowAddManagerModal: PropTypes.func.isRequired,
};

export default connect(null, { addUpdateDeleteUserManager, setShowAddManagerModal })(
    AddManagerModal
);
