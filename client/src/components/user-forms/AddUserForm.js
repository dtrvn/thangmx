import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createUser } from "../../actions/user";
import { getAllTypeUsers } from "../../actions/typeUser";

const AddUserForm = ({ createUser, getAllTypeUsers, history, typeUser: { typeUsers } }) => {
  useEffect(() => {
    getAllTypeUsers();
  }, [getAllTypeUsers]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    password: "123456",
    typeUserId: "",
    status: "",
    roles: "",
  });

  const { name, email, phone, password, typeUserId, status, roles } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if(!formData.typeUserId){
      formData.typeUserId = typeUsers[0]._id;
    }
    if(!formData.status){
      formData.status = "Hoạt động";
    }
    if(!formData.roles){
      formData.roles = "User";
    }
    console.log("loai nhan vien "+formData.typeUserId);
    createUser(formData, history);
  };

  const blankValue = "";

  // var elmTypeUsers = [];
  // typeUsers.map((typeUser, index) => {
  //   elmTypeUsers.push({
  //     label: typeUser.typeUsername,
  //     value: typeUser.typeUsername,
  //   });
  // });

  let elmTypeUsers = typeUsers.map((ele) => (
    <option value={ele._id}>{ele.typeUsername}</option>
  ));

  // elmTypeUsers.unshift([<option value={0}>* Chọn loại nhân viên</option>]);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 m-t-30">
          <div className="card">
            <div className="card-header bg-info">
              <h4 class="m-b-0 text-white">Tạo mới nhân viên</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                      <label htmlFor="exampleInputuname">Họ và tên</label>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1"><i className="ti-user" /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="* Họ và tên"
                          name="name"
                          value={name}
                          onChange={(e) => onChange(e)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email</label>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon2"><i className="ti-email" /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="* Email"
                          name="email"
                          value={email}
                          onChange={(e) => onChange(e)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Số điện thoại</label>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon2"><i className="ti-mobile" /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="* Số điện thoại"
                          name="phone"
                          value={phone}
                          onChange={(e) => onChange(e)} />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label">Loại nhân viên</label>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon2"><i className="fab fa-laravel" /></span>
                        </div>
                        <select
                          name="typeUserId"
                          value={typeUserId}
                          onChange={(e) => onChange(e)}
                          class="form-control custom-select"
                        >
                          {elmTypeUsers}
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label">Trạng thái</label>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon2"><i className="ti-flickr" /></span>
                        </div>
                        <select class="form-control custom-select" name="status" value={status} onChange={(e) => onChange(e)}>
                          <option value="Hoạt động">Hoạt động</option>
                          <option value="Ẩn">Ẩn</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label">Quyền hạn</label>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon2"><i className="fas fa-user-secret" /></span>
                        </div>
                        <select class="form-control custom-select" name="roles" value={roles} onChange={(e) => onChange(e)}>
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                        </select>
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
      </div>

      {/* <h1 className="large text-primary">Tạo mới nhân viên</h1>
      <p className="lead">
        <i className="fas fa-user" /> Hãy nhập thông tin vào các ô bên dưới
      </p>
      <small>* = Ô bắt buộc nhập</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Họ và tên"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Số điện thoại"
            name="phone"
            value={phone}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <select
            name="typeUserId"
            value={typeUserId}
            onChange={(e) => onChange(e)}
          >
            {elmTypeUsers}
          </select>
        </div>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value={0}>* Chọn trạng thái</option>
            <option value="Hoạt động">Hoạt động</option>
            <option value="Ẩn">Ẩn</option>
          </select>
        </div>
        <div className="form-group">
          <select name="roles" value={roles} onChange={(e) => onChange(e)}>
            <option value={0}>* Chọn quyền</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary my-1">
          Lưu
        </button>
        <Link className="btn btn-light my-1" to="/users">
          Trở về
        </Link>
      </form> */}
    </Fragment>
  );
};

AddUserForm.propTypes = {
  createUser: PropTypes.func.isRequired,
  getAllTypeUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  typeUser: state.typeUser,
});

export default connect(mapStateToProps, { createUser, getAllTypeUsers })(
  withRouter(AddUserForm)
);
