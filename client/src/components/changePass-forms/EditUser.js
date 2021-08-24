import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createUser, getCurrentUser } from "../../actions/user";

const EditUser = ({ auth: { user }, createUser, getCurrentUser, history }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // getCurrentUser();
    setFormData({
      id: !user._id ? "" : user._id,
      name: !user.name ? "" : user.name,
      email: !user.email ? "" : user.email,
      phone: !user.phone ? "" : user.phone,
    });
  }, [getCurrentUser]);

  const { name, email, phone } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createUser(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Chỉnh sửa thông tin</h1>
      <p className="lead">
        <i className="fas fa-user" /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required fields</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Họ và tên</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Email</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="phone"
            name="phone"
            value={phone}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Số điện thoại</small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditUser.propTypes = {
  createUser: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createUser, getCurrentUser })(
  withRouter(EditUser)
);
