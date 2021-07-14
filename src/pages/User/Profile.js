import React, { useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import HomeLayout from "../../components/layout/homeLayout";
import ProfileDetails from "../../components/user/ProfileDetails";

import { getProfileData } from "../../actions/user";
import auth from "../../store/reducers/auth";

function Profile(props) {
  const submitProfile = async (values) => {
    console.log(values);
  };
  useEffect(() => {
    props.getProfileData();
  }, []);
  return (
    <HomeLayout>
      <ProfileDetails profileData={auth.user} submit={submitProfile} />
    </HomeLayout>
  );
}

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = {
  getProfileData,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
