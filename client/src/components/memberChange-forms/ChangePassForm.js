import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changePassword } from "../../actions/user";
import { setAlert } from "../../actions/alert";

const ChangePassForm = ({
  setAlert,
  changePassword,
  history,
  auth: { user },
  displayChangePass,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    oldPass: "",
    newPass: "",
    newPass2: "",
  });

  useEffect(() => {
    setFormData({
      id: !user ? "" : user._id,
      oldPass: "",
      newPass: "",
      newPass2: "",
    });
  }, [user]);

  const { id, oldPass, newPass, newPass2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (newPass !== newPass2) {
      setAlert("Mật khẩu không trùng khớp", "danger");
    } else {
      changePassword({ id, oldPass, newPass, newPass2 }, history);
    }
  };

  const cancelButtonClick = () => {
    console.log("truoc do " + displayChangePass);
    displayChangePass = false;
    console.log("sau do " + displayChangePass);
  };

  return (
    <Fragment>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="password"
            placeholder="* Mật khẩu cũ"
            name="oldPass"
            value={oldPass}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="* Mật khẩu mới"
            name="newPass"
            value={newPass}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="* Nhập lại mật khẩu mới"
            name="newPass2"
            value={newPass2}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary my-1">
          Thay đổi
        </button>
        {/* <button type="button" className="btn btn-primary my-1">
          Hủy bỏ
        </button> */}
        {/* <Link className="btn btn-light my-1" to="/users">
          Cancel
        </Link> */}
      </form>
    </Fragment>
  );
};

ChangePassForm.propTypes = {
  changePassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changePassword, setAlert })(
  withRouter(ChangePassForm)
);
