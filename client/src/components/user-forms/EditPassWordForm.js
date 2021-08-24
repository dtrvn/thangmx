import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePassword } from "../../actions/user";
import { setAlert } from "../../actions/alert";

const EditPassWordForm = ({
  setAlert,
  updatePassword,
  history,
  user: { user },
}) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    setFormData({
      id: !user ? "" : user._id,
      password: "",
      password2: "",
    });
  }, [user]);

  const { id, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Mật khẩu không trùng khớp", "danger");
    } else {
      updatePassword({ id, password }, history);
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 m-t-30">
          <div className="card">
            <div className="card-header bg-info">
              <h4 class="m-b-0 text-white">Thay đổi mật khẩu nhân viên</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                      <label htmlFor="exampleInputuname">Mật khẩu mới</label>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1"><i className="ti-key" /></span>
                        </div>
                        <input type="password" className="form-control" placeholder="* Mật khẩu mới"
                          name="password"
                          value={password}
                          onChange={(e) => onChange(e)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputuname">Nhập lại mật khẩu mới</label>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1"><i className="ti-key" /></span>
                        </div>
                        <input type="password" className="form-control" placeholder="* Nhập lại mật khẩu mới"
                          name="password2"
                          value={password2}
                          onChange={(e) => onChange(e)} />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success waves-effect waves-light m-r-10"><i className="ti-save" />{"  "}Lưu</button>
                    <Link className="btn btn-inverse waves-effect waves-light" to="/users">
                      Trở về
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* <h1 className="large text-primary">Thay đổi mật khẩu nhân viên</h1>
        <p className="lead">
          <i className="fas fa-user" /> Hãy nhập thông tin vào các ô bên dưới
        </p>
        <small>* = Ô bắt buộc nhập</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="password"
              placeholder="* Mật khẩu mới"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="* Nhập lại mật khẩu mới"
              name="password2"
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary my-1">
            Lưu
          </button>
          <Link className="btn btn-light my-1" to="/users">
            Trở về
          </Link>
        </form> */}
      </div>
    </Fragment>
  );
};

EditPassWordForm.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updatePassword, setAlert })(
  withRouter(EditPassWordForm)
);
