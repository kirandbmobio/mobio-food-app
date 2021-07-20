import React, { useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import HomeLayout from "../../components/layout/homeLayout";
import ProfileDetails from "../../components/user/ProfileDetails";

import { getProfileData, updateUser, changePassword } from "../../actions/user";
import toast from "../../utils/toast";

function Profile(props) {
  const submitProfile = async (values) => {
    let response = await props.updateUser(values);
    setToastMessage(response);
  };
  const passwordChange = async (user) => {
    let response = await props.changePassword(user);
    setToastMessage(response);
  };

  const setToastMessage = (response) => {
    if (response.data) {
      return toast.successToastMessage(response.data.message);
    } else {
      return toast.errorToastMessage(response.response.data.message);
    }
  };

  useEffect(() => {
    props.getProfileData();
  }, []);

  return (
    <HomeLayout>
      <ProfileDetails
        profileData={props.auth.profileUser}
        submit={submitProfile}
        changePassword={passwordChange}
      />
    </HomeLayout>
  );
}

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = {
  getProfileData,
  updateUser,
  changePassword,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
