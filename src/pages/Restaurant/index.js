import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import HomeLayout from "../../components/layout/homeLayout";
import MaterialTable from "../../components/Table/MaterialTable";

import {
  restaurantList,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../../actions/restaurant";

import toast from "../../utils/toast";

function Restaurant(props) {
  const columns = [
    { title: "id", field: "_id", hidden: true },
    {
      title: "Name",
      field: "restaurant_name",
      validate: (rowData) =>
        rowData.restaurant_name === "" ? "Name cannot be empty" : "",
    },
    { title: "Type", field: "restaurant_type" },
    { title: "country", field: "address.country" },
    { title: "state", field: "address.state" },
    { title: "city", field: "address.city" },
    { title: "landmark", field: "address.landmark" },
  ];
  useEffect(() => {
    props.restaurantList();
  }, []);
  useEffect(() => {
    let errors = props.restaurant.errors;
    let successMessages = props.restaurant.successMessages;
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.errorToastMessage(error);
      });
    }
    if (successMessages.length > 0) {
      successMessages.forEach((msg) => {
        toast.successToastMessage(msg);
      });
    }
  }, [props.restaurant]);

  return (
    <HomeLayout>
      <MaterialTable
        title={<h3>Restaurants</h3>}
        columns={columns}
        data={props.restaurant.restaurants}
        add={props.addRestaurant}
        update={props.updateRestaurant}
        delete={props.deleteRestaurant}
        // options={{ selection: true }}
      />
    </HomeLayout>
  );
}

const mapStateToProps = (state) => ({ restaurant: state.restaurant });
const mapDispatchToProps = {
  restaurantList,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Restaurant)
);
