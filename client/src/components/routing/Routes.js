import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";
import Alert from "../../components/layout/Alert";
import Dashboard from "../../components/dashboard/Dashboard";
import CreateProfile from "../../components/profile-forms/CreateProfile";
import Users from "../../components/users/Users";
import ShiftRegisters from "../../components/shiftRegisters/ShiftRegisters";
import AddUserForm from "../../components/user-forms/AddUserForm";
import EditUserForm from "../../components/user-forms/EditUserForm";
import EditPassWordForm from "../../components/user-forms/EditPassWordForm";
import AddEducation from "../../components/profile-forms/AddEducation";
import PersonInShiftList  from "../../components/shiftRegisters/personInShifts/PersonInShiftList";
import SalaryPersonal from "../../components/salary/SalaryPersonal";
// import Profiles from "../../components/profiles/Profiles";
// import Profile from "../../components/profile/Profile";
import Posts from "../../components/posts/Posts";
import Post from "../../components/post/Post";
import NotFound from "../../components/layout/NotFound";
import PrivateRoute from "../../components/routing/PrivateRoute";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        {/* <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} /> */}
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/shiftRegisters" component={ShiftRegisters} />
        <PrivateRoute exact path="/create-user" component={AddUserForm} />
        <PrivateRoute exact path="/edit-user/:id" component={EditUserForm} />
        <PrivateRoute exact path="/edit-pass" component={EditPassWordForm} />
        <PrivateRoute exact path="/modifer-personInShift/:startDate/:endDate/:branchId" component={PersonInShiftList} />
        <PrivateRoute exact path="/salary-personal" component={SalaryPersonal} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
