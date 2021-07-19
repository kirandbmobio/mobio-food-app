import React, { useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import HomeLayout from "../../components/layout/homeLayout";
import ProfileDetails from "../../components/user/ProfileDetails";

import { getProfileData, updateUser } from "../../actions/user";
import toast from "../../utils/toast";

function Profile(props) {
  const submitProfile = async (values) => {
    let response = await props.updateUser(values);
    if (response.data) {
      return toast.successToastMessage(response.data.message);
    } else {
      return toast.errorToastMessage(response.response.data.message);
    }
  };
  const changePassword = async (password) => {};
  useEffect(() => {
    props.getProfileData();
  }, []);

  return (
    <HomeLayout>
      <ProfileDetails
        profileData={props.auth.profileUser}
        submit={submitProfile}
        changePassword={changePassword}
      />
    </HomeLayout>
  );
}

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = {
  getProfileData,
  updateUser,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
