import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const EditCampusView = ({ campus, handleSubmit: submitHandler }) => {
  const validSchema = Yup.object().shape({
    name: Yup.string().required("Campus name is required."),
    address: Yup.string().required("Campus address is required."),
    imageUrl: Yup.string().url("Invalid URL format.").notRequired(),
    description: Yup.string().notRequired(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validSchema),
    defaultValues: {
      name: campus?.name || "",
      address: campus?.address || "",
      imageUrl: campus?.imageUrl || "",
      description: campus?.description || "",
    },
  });

  useEffect(() => {
    reset({
      name: campus?.name || "",
      address: campus?.address || "",
      imageUrl: campus?.imageUrl || "",
      description: campus?.description || "",
    });
  }, [campus, reset]);

  return (
    <div>
      <h1>Edit Campus</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Image URL:</label>
          <input type="text" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p style={{ color: "red" }}>{errors.imageUrl.message}</p>
          )}
        </div>
        <br />

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
          <label>Description:</label>
          <textarea {...register("description")}></textarea>
        </div>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditCampusView;
