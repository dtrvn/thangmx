import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { deleteTypeUser, getAllTypeUsers } from "../../actions/typeUser";
import AddTypeUserForm from "../typeUser-forms/AddTypeUserForm";
import EditTypeUserForm from "../typeUser-forms/EditTypeUserForm";

const TypeUser = ({
  deleteTypeUser,
  getAllTypeUsers,
  typeUser: { typeUsers, typeUser },
}) => {
  const initialFormState = {
    id: null,
    typeUsername: "",
    typeUserPercentCost: "",
  };

  // Setting state
  const [currentTypeUser, setCurrentTypeUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const editTypeUser = (typeUser) => {
    setEditing(true);

    setCurrentTypeUser({
      id: typeUser._id,
      typeUsername: typeUser.typeUsername,
      typeUserPercentCost: typeUser.typeUserPercentCost,
    });
  };

  const listTypeUsers = typeUsers.map((typeUser) => (
    <tr key={typeUser._id}>
      <td>{typeUser.typeUsername}</td>
      <td>{typeUser.typeUserPercentCost}</td>
      <td>
        <button
          onClick={() => editTypeUser(typeUser)}
          className="btn btn-success"
        ><i class="far fa-edit"></i>
          <span className="hide-sm"> Sửa</span>
        </button>
        <button
          onClick={() => deleteTypeUser(typeUser._id)}
          className="btn btn-danger"
        ><i class="fas fa-trash-alt"></i>
          <span className="hide-sm"> Xóa</span>
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      {editing ? (
        <EditTypeUserForm
          editing={editing}
          setEditing={setEditing}
          currentTypeUser={currentTypeUser}
        />
      ) : (
        <AddTypeUserForm />
      )}
      <div class="table-responsive">
        <table class="table color-table warning-table">
          <thead>
            <tr>
              <th>Loại nhân viên</th>
              <th>Phần trăm lương</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{listTypeUsers}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

TypeUser.propTypes = {
  getAllTypeUsers: PropTypes.func.isRequired,
  deleteTypeUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  typeUser: state.typeUser,
});

export default connect(mapStateToProps, { deleteTypeUser, getAllTypeUsers })(
  TypeUser
);
