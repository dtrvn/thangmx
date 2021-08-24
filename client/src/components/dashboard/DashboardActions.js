import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      {/* <Link to="/edit-user" className="btn">
        <i className="fas fa-user-circle text-primary"></i> Chỉnh sửa thông tin
      </Link> */}

      <button type="button" class="btn">
        <i className="fas fa-user-circle text-primary"></i> Đổi mật khẩu
      </button>
    </div>
  );
};

export default DashboardActions;
