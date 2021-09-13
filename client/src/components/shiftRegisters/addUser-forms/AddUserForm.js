import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUserShiftRegister } from "../../../actions/shiftRegister";

const AddUserForm = ({
    users,
    branchIdForm,
    startDate,
    endDate,
    saveUserId,
    addUserShiftRegister,
}) => {
    const [formData, setFormData] = useState({
        userId: null,
        branchId: branchIdForm,
        dateFrom: startDate,
        dateTo: endDate,
    });

    const [disableButtonAdd, setDisableButtonAdd] = useState(0);

    const { userId } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    let elmUsers = [];
    let getIndex = null;
    elmUsers.push(<option value="0">* Chọn nhân viên</option>);
    users.map((ele) => {
        if (ele.roles !== "Admin") {
            if (saveUserId) {
                getIndex = saveUserId.indexOf(ele._id);
                if (getIndex < 0) {
                    elmUsers.push(<option value={ele._id}>{ele.name}</option>);
                }
            } else {
                elmUsers.push(<option value={ele._id}>{ele.name}</option>);
            }
        }
    });

    useEffect(() => {
        if (elmUsers.length === 1 && userId === null) {
            
            // elmUsers.push(<option value="0">Đã hết nhân viên</option>);
            setDisableButtonAdd(1);
        } else {
            setDisableButtonAdd(0);
        }

    }, [elmUsers]);


    const onSubmit = (e) => {
        e.preventDefault();
        addUserShiftRegister(formData);
    };

    return (
        <Fragment>
            <form
                class="form"
                onSubmit={(e) => onSubmit(e)}
            >
                <div class="card-group-shiftRegister">

                    <div class="card-shiftRegister col-md-2-5">
                        <div class="card-body-shiftRegister">

                            <button
                                type="submit"
                                class="btn btn-sm btn-info"
                                style={{ marginTop: '10px', marginLeft: '10px' }}
                                disabled={disableButtonAdd === 1 ? true : false}
                            >
                                <i class="ti-plus"></i>{"  "}Thêm nhân viên
                            </button>

                        </div>
                    </div>

                    <div class="card-shiftRegister col-md-9-5">
                        <div class="card-body-shiftRegister text-center">
                            {disableButtonAdd === 1 ? (
                                <select
                                    class="form-control custom-select col-md-5"
                                    style={{ marginTop: '5px' }}
                                    disabled="true"
                                >
                                    <option value="0">Đã hết nhân viên</option>
                                </select>
                            ) : (
                                <select
                                    name="userId"
                                    value={userId}
                                    onChange={(e) => onChange(e)}
                                    class="form-control custom-select col-md-5"
                                    style={{ marginTop: '5px' }}
                                >
                                    {elmUsers}
                                </select>
                            )}

                        </div>
                    </div>
                </div>
            </form>
        </Fragment >

    )
};

AddUserForm.propTypes = {
    users: PropTypes.object.isRequired,
    branchIdForm: PropTypes.object.isRequired,
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    saveUserId: PropTypes.object.isRequired,
    addUserShiftRegister: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // personInShift: state.personInShift,
});

export default connect(mapStateToProps, { addUserShiftRegister })(
    AddUserForm
);
