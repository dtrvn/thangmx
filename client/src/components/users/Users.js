import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter, Redirect } from "react-router-dom";
import { deleteUser, getAllUsers, getUser } from "../../actions/user";
import { getAllTypeUsers } from "../../actions/typeUser";
import AddUserForm from "../user-forms/AddUserForm";
import EditUserForm from "../user-forms/EditUserForm";
import { setAlert } from "../../actions/alert";

const Users = ({
  setAlert,
  deleteUser,
  getAllUsers,
  getAllTypeUsers,
  getUser,
  user: { users },
  typeUser: { typeUsers },
  isAuthenticated,
  auth: { user },
}) => {
  useEffect(() => {
    getAllUsers();
    getAllTypeUsers();
  }, [getAllTypeUsers, getAllUsers]);

  const initialFormState = {
    id: null,
    name: "",
    email: "",
    phone: "",
    typeUserId: "",
    status: "",
    roles: "",
  };

  const filterState = {
    filterName: "",
    filterTypeUserName: "",
    filterStatus: "",
    filterRoles: "",
  };

  // Setting state
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);
  const [filter, setFilter] = useState(filterState);

  if (isAuthenticated && user && user.roles === "User") {
    return <Redirect to="/dashboard" />;
  }

  const onChange = (e) =>
    setFilter({ ...filter, [e.target.name]: e.target.value });

  let elmTypeUsers = typeUsers.map((ele) => (
    <option value={ele._id}>{ele.typeUsername}</option>
  ));

  elmTypeUsers.unshift([<option value="All">* Tất cả</option>]);

  if (filter.filterName) {
    users = users.filter((user) => {
      return user.name.toLowerCase().indexOf(filter.filterName) !== -1;
    });
  }

  if (filter.filterTypeUserName) {
    users = users.filter((user) => {
      if (filter.filterTypeUserName === "All") {
        return user;
      }
      if (filter.filterTypeUserName === user.typeUserId) {
        return user.typeUserId === filter.filterTypeUserName;
      }
    });
  }

  if (filter.filterStatus) {
    users = users.filter((user) => {
      if (filter.filterStatus === "All") {
        return user;
      }
      if (filter.filterStatus === "Hoạt động") {
        return user.status === filter.filterStatus;
      }
      if (filter.filterStatus === "Ẩn") {
        return user.status === filter.filterStatus;
      }
    });
  }

  if (filter.filterRoles) {
    users = users.filter((user) => {
      if (filter.filterRoles === "All") {
        return user;
      }
      if (filter.filterRoles === "Admin") {
        return user.roles === filter.filterRoles;
      }
      if (filter.filterRoles === "User") {
        return user.roles === filter.filterRoles;
      }
    });
  }

  const listUsers = users.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        {typeUsers.map((typeUser) =>
          typeUser._id === user.typeUserId ? typeUser.typeUsername : ""
        )}
      </td>
      <td>{user.status === "Hoạt động" ?
        <div class="label label-table label-success">Hoạt động</div> :
        <div class="label label-table label-danger">Ẩn</div>}</td>
      <td>{user.roles}</td>
      <td>
        <Link
          to={`/edit-user/${user._id}`}
          className="btn btn-success"
          // onClick={() => getUser(user._id)}
        >
          <i class="far fa-edit"></i>
        </Link>
        <Link
          to="/edit-pass"
          className="btn btn-primary"
          onClick={() => getUser(user._id)}
        >
          <i class="fas fa-key"></i>
        </Link>
        <button onClick={() => deleteUser(user._id)} className="btn btn-danger">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 m-t-30">
          <div className="card">
            <div className="card-header bg-info">
              <h4 class="m-b-0 text-white">Quản lý nhân viên</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <Link to="/create-user" className="btn btn-success">
                  <i className="fas fa-users"></i> Thêm nhân viên
                </Link>
              </div>
              <div className="row">
                <div class="table-responsive m-t-20">
                  <table id="myTable" class="table color-bordered-table success-bordered-table">
                    <thead>
                      <tr>
                        <th scope="col">Tên nhân viên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Loại nhân viên</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Quyền</th>
                        <th scope="col">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            name="filterName"
                            value={filter.filterName}
                            onChange={(e) => onChange(e)}
                          />
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                          <select
                            name="filterTypeUserName"
                            value={filter.filterTypeUserName}
                            onChange={(e) => onChange(e)}
                          >
                            {elmTypeUsers}
                          </select>
                        </td>
                        <td>
                          <select
                            name="filterStatus"
                            value={filter.filterStatus}
                            onChange={(e) => onChange(e)}
                          >
                            <option value="All">* Tất cả</option>
                            <option value="Hoạt động">Hoạt động</option>
                            <option value="Ẩn">Ẩn</option>
                          </select>
                        </td>
                        <td>
                          <select
                            name="filterRoles"
                            value={filter.filterRoles}
                            onChange={(e) => onChange(e)}
                          >
                            <option value="All">* Tất cả</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                          </select>
                        </td>
                        <td></td>
                      </tr>
                      {listUsers}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <h1 className="large text-primary">Quản lý nhân viên</h1>
        <Link to="/create-user" className="btn">
          <i className="fas fa-user-circle text-primary"></i> Thêm nhân viên
        </Link>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Tên nhân viên</th>
              <th scope="col">Email</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Loại nhân viên</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Quyền</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="filterName"
                  value={filter.filterName}
                  onChange={(e) => onChange(e)}
                />
              </td>
              <td></td>
              <td></td>
              <td>
                <select
                  name="filterTypeUserName"
                  value={filter.filterTypeUserName}
                  onChange={(e) => onChange(e)}
                >
                  {elmTypeUsers}
                </select>
              </td>
              <td>
                <select
                  name="filterStatus"
                  value={filter.filterStatus}
                  onChange={(e) => onChange(e)}
                >
                  <option value="All">* Tất cả</option>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Ẩn">Ẩn</option>
                </select>
              </td>
              <td>
                <select
                  name="filterRoles"
                  value={filter.filterRoles}
                  onChange={(e) => onChange(e)}
                >
                  <option value="All">* Tất cả</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </td>
              <td></td>
            </tr>
            {listUsers}
          </tbody>
        </table> */}
      </div>
    </Fragment>
  );
};

Users.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  getAllTypeUsers: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
  typeUser: state.typeUser,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteUser,
  getAllUsers,
  getAllTypeUsers,
  getUser,
})(Users);
