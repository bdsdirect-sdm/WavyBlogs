import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import Button from "../common/components/CommonButton";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";
import Local from "../environment/env";
import GoBack from "../common/components/GoBack";

const InviteFriend: React.FC = () => {
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object().shape({
    friends: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Name is required"),
          email: Yup.string().email("Invalid email").required("Email is required"),
          message: Yup.string().required("Message is required"),
        })
      )
      .required("At least one friend is required"),
  });

  const inviteFriend = async(friend:any)=>{
    try{
      const response = await api.post(`${Local.INVITE_FRIEND}`, friend, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success(`${response.data.message}`);
      navigate('/app/dashboard')
    }
    catch(err:any){
      toast.error(`${err.response.data.message}`);
    }
    return;
  }

  const inviteMutation = useMutation({
    mutationFn: inviteFriend
  })

  const initialValues = {
    friends: [{ name: "", email: "", message: "" }],
  };

  const handleSubmit = (values: any) => {
    inviteMutation.mutate(values.friends);
    // console.log("Submitted Data:", values);
  };

  return (
    <div className="h-100" >
      <GoBack text="Friends" />
      <span className="ms-5 fw-bold text-secondary ">
        Invite some friends, show them your Waves and let's see what they can do!
      </span>

      <div className="container my-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="p-4 shadow-sm rounded bg-white">
              <FieldArray name="friends">
                {({ remove, push }) => (
                  <div>
                    {values.friends.map((_, index) => (
                      <div key={index} className="mb-4">
                        <h6 className="text-secondary fw-semibold small " >
                          Friend #{index + 1}{" "}
                          {index > 0 && (
                            <button
                              type="button"
                              className="btn btn-link text-danger ms-2 p-0"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          )}
                        </h6>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label htmlFor={`friends.${index}.name`} className="form-label text-secondary fw-light ">
                              Full Name
                            </label>
                            <Field
                              name={`friends.${index}.name`}
                              type="text"
                              className="form-control"
                              placeholder="Name"
                            />
                            <ErrorMessage
                              name={`friends.${index}.name`}
                              component="div"
                              className="text-danger mt-1"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor={`friends.${index}.email`} className="form-label  text-secondary fw-light ">
                              Email
                            </label>
                            <Field
                              name={`friends.${index}.email`}
                              type="email"
                              className="form-control"
                              placeholder="Email"
                            />
                            <ErrorMessage
                              name={`friends.${index}.email`}
                              component="div"
                              className="text-danger mt-1"
                            />
                          </div>
                          <div className="col-md-12">
                            <label htmlFor={`friends.${index}.message`} className="form-label  text-secondary fw-light ">
                              Message
                            </label>
                            <Field
                              name={`friends.${index}.message`}
                              type="text"
                              className="form-control"
                              placeholder="Message"
                            />
                            <ErrorMessage
                              name={`friends.${index}.message`}
                              component="div"
                              className="text-danger mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn btn-link text-decoration-none ms-auto"
                        onClick={() =>
                          push({ name: "", email: "", message: "" })
                        }
                        style={{color:'#3E5677'}}
                      >
                        + Add More
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
              <div className="row mt-3" >
                <div className="col-2 ms-auto" >
                <Button text="Friends" type="submit" />
                </div>
                {/* <button type="submit" className="btn btn-primary mt-3 ms-auto col-2 ">
                  Submit
                </button> */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InviteFriend;
