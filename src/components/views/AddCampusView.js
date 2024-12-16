import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
const AddCampusView = ({ handleSubmit: submitHandler }) => {
  const schema = Yup.object().shape({
    name: Yup.string().required("Campus name is required."),
    address: Yup.string().required("Campus address is required."),
    imageUrl: Yup.string().url("Invalid URL format.").notRequired(),
    description: Yup.string().notRequired(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label>Campus Name:</label>
        <input type="text" {...register("name")} />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>
      <br />

      <div>
        <label>Campus Address:</label>
        <input type="text" {...register("address")} />
        {errors.address && (
          <p style={{ color: "red" }}>{errors.address.message}</p>
        )}
      </div>
      <br />

      <div>
        <label>Campus Description:</label>
        <textarea {...register("description")}></textarea>
      </div>
      <br />
      <div>
        <label>Image URL:</label>
        <input type="text" {...register("imageUrl")} />
        {errors.imageUrl && (
          <p style={{ color: "red" }}>{errors.imageUrl.message}</p>
        )}
      </div>
      <br />

      <button type="submit">Add Campus</button>
    </form>
  );
};

export default AddCampusView;
