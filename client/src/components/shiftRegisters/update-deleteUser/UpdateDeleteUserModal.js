import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import moment from "moment";
import { updateOrDeleteUser, setShowShiftRegistersUserModal } from "../../../actions/shiftRegister";
import Switch from './Switch';
import AlertShiftRegister from '../../layout/AlertShiftRegister';

const UpdateDeleteUserModal = ({
    idUpdate,
    currentUserLineId,
    users,
    countCallUpdateDeleteUserModal,
    listUserId,
    updateOrDeleteUser,
    showUpdateOrDeleteUserModal,
    setShowShiftRegistersUserModal,
}) => {
    const [formData, setFormData] = useState({
        id: null,
        userId: null,
        userFlag: "0",
    });

    const [value, setValue] = useState(true);
    const [disableButtonUpdate, setDisableButtonUpdate] = useState(0);
    const { userId } = formData;

    let elmUsers = [];
    let getName = "";

    useEffect(() => {
        setFormData({
            ...formData,
            id: idUpdate,
            userId: "0",
            userFlag: "0",
        });
        setValue(true);
        setDisableButtonUpdate(0);
    }, [countCallUpdateDeleteUserModal]);

    elmUsers.push(<option value="0">* Chọn nhân viên</option>);
    users.map((ele, idx) => {
        // List trừ Admin, user hiện tại và các user đã đăng kí
        if (ele.roles !== "Admin" && ele._id !== currentUserLineId && listUserId.indexOf(ele._id) === -1) {
            elmUsers.push(<option value={ele._id}>{ele.name}</option>);
        }
        if (ele._id === currentUserLineId) {
            getName = ele.name;
        }
    });

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    // console.log("get shift list " + JSON.stringify(shiftCurrentList));
    // console.log("get job list " + JSON.stringify(jobCurrentList));

    const onSubmit = (e) => {
        e.preventDefault();
        if (value === false) {
            // Delete user
            formData.userFlag = "1";
            setDisableButtonUpdate(1);
        } else {
            if (formData.userId === currentUserLineId || formData.userId === "0") {
                // No change
                formData.userFlag = "0";
            } else {
                // Change user (Update)
                formData.userFlag = "2";
                setDisableButtonUpdate(1);
            }
        }
        // if (formData.userFlag === "0") {
        //     if (formData.userId === null || formData.userId === "0") {
        //         // No change
        //         formData.userFlag = "0";
        //     }
        // }
        
        updateOrDeleteUser(formData);
    };

    const clearData = () => {
        setShowShiftRegistersUserModal(false);
    }
    
    return (
        <Fragment>
            <div className="fade modal-backdrop show"></div>
            <div id="responsive-modal-UpdateDeleteUser" className={`modal ${showUpdateOrDeleteUserModal === true ? "show" : ""}`} tabIndex={-1} style={{ display: showUpdateOrDeleteUserModal === true ? 'block' : 'none' }} data-backdrop="static"
                data-keyboard="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Thay đổi nhân viên hoặc xoá tất cả ca đăng kí của nhân viên </h3>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => clearData()}>×</button>
                        </div>
                        <form className="form" onSubmit={(e) => onSubmit(e)}>
                            <AlertShiftRegister />

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

UpdateDeleteUserModal.propTypes = {
    idUpdate: PropTypes.object.isRequired,
    currentUserLineId: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    countCallUpdateDeleteUserModal: PropTypes.object.isRequired,
    listUserId: PropTypes.object.isRequired,
    showUpdateOrDeleteUserModal: PropTypes.object.isRequired,
    updateOrDeleteUser: PropTypes.func.isRequired,
    setShowShiftRegistersUserModal: PropTypes.func.isRequired,
};

export default connect(null, { updateOrDeleteUser, setShowShiftRegistersUserModal })(
    UpdateDeleteUserModal
);
