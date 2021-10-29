import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { clearBranchs } from "../../actions/branch";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout, clearBranchs }) => {
  const authLinks = (
    <Fragment>
      <ul className="navbar-nav mr-auto">
        {user && user.roles !== "User" ? (
          <Fragment>
            <li>
              <Link to="/users">
                <i className="fas fa-address-book" />{" "}
                <span className="hide-sm">Quản lý nhân viên</span>
              </Link>
            </li>
          </Fragment>
        ) : (
          ""
        )}

        <li>
          <Link to="/shiftRegisters" onClick={() => clearBranchs()}>
            <i className="far fa-registered" />{" "}
            <span className="hide-sm">Đăng ký ca</span>
          </Link>
        </li>
        <li>
          <Link to="/salarys">
            <i className="ti-money" />{" "}
            <span className="hide-sm">Lương</span>
          </Link>
        </li>
      </ul>
      <ul>
        {/* {user && user.roles === "Admin" ? (
          <Fragment>
            <li>
              <Link to="/users">
                <i className="fas fa-address-book" />{" "}
                <span className="hide-sm">Quản lý nhân viên</span>
              </Link>
            </li>
          </Fragment>
        ) : (
          ""
        )}

        <li>
          <Link to="/shiftRegisters">
            <i className="far fa-registered" />{" "}
            <span className="hide-sm">Đăng ký ca</span>
          </Link>
        </li>
        <li>
          <Link to="/salarys">
            <i className="ti-money" />{" "}
            <span className="hide-sm">Lương</span>
          </Link>
        </li> */}
        {/* <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li> */}
        <li>
          <Link to="/dashboard">
            {user ? user.name : ""}
          </Link>
          <Link onClick={logout}>
            <i className="fas fa-sign-out-alt" />{" "}
            <span className="hide-sm">Thoát</span>
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <ul>
      {/* <li>
        <Link to="/register">Register</Link>
      </li> */}
      <li>
        <Link to="/login">Đăng nhập</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          {" "}
          <i className="ti-home"></i> Home{" "}
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propsType = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  clearBranchs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, clearBranchs })(Navbar);
