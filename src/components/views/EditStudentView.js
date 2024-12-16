import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const EditStudentView = ({ student, handleSubmit }) => {
  // Validation schema
  const schema = Yup.object().shape({
    firstname: Yup.string().required("First name is required."),
    lastname: Yup.string().required("Last name is required."),
    email: Yup.string()
      .email("Invalid email format.")
      .required("Email is required."),
    imageURL: Yup.string().url("Invalid URL format.").notRequired(),
    gpa: Yup.number()
      .transform((value, originalValue) => (originalValue === "" ? 0 : value)) 
      .min(0, "GPA must be at least 0.")
      .max(4, "GPA must be at most 4.")
      .typeError("GPA must be a valid number."), 
    campusId: Yup.number()
      .transform((value, originalValue) => (originalValue === "" ? 0 : value))
      .integer("Campus ID must be a valid number.")
      .typeError("Campus ID must be a valid number."),
  });

  const {
    register,
    handleSubmit: onSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  useEffect(() => {
    if (student) {
      reset({
        firstname: student.firstname || "",
        lastname: student.lastname || "",
        email: student.email || "",
        imageURL: student.imageURL || "",
        gpa: student.gpa || 0,
        campusId: student.campusId || 0,
      });
    }
  }, [student, reset]);

  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={onSubmit(handleSubmit)}>
        <div>
          <label>First Name:</label>
          <input type="text" {...register("firstname")} />
          {errors.firstname && (
            <p style={{ color: "red" }}>{errors.firstname.message}</p>
          )}
        </div>
        <br />

        <div>
          <label>Last Name:</label>
          <input type="text" {...register("lastname")} />
          {errors.lastname && (
            <p style={{ color: "red" }}>{errors.lastname.message}</p>
          )}
        </div>
        <br />

        <div>
          <label>Email:</label>
          <input type="text" {...register("email")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <br />

        <div>
          <label>Image URL:</label>
          <input type="text" {...register("imageURL")} />
          {errors.imageURL && (
            <p style={{ color: "red" }}>{errors.imageURL.message}</p>
          )}
        </div>
        <br />

        <div>
          <label>GPA:</label>
          <input type="number" step="0.01" {...register("gpa")} />
          {errors.gpa && <p style={{ color: "red" }}>{errors.gpa.message}</p>}
        </div>
        <br />

        <div>
          <label>Campus ID:</label>
          <input type="text" {...register("campusId")} />
          {errors.campusId && (
            <p style={{ color: "red" }}>{errors.campusId.message}</p>
          )}
        </div>
        <br />

        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudentView;
