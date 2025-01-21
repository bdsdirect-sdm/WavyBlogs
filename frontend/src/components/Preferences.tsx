import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../common/components/CommonButton";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";
import Local from "../environment/env";
import { queryClient } from "../main";
import GoBack from "../common/components/GoBack";

const Preferences:React.FC = () => {
  const token = localStorage.getItem('token');

  const getpreference = async() => {
    try{
      const response = await api.get(`${Local.GET_PREFERENCE}`, {
        headers: {
          Authorization: `Bearer ${token}`
          }
      })
      return response.data;
    }
    catch(err:any){
      toast.error(err.response.data.message)
    }
  }

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["preferences"],
    queryFn: getpreference
  })

  const updatePreference = async(data:any) => {
    try{
      const response = await api.post(`${Local.UPDATE_PREFERENCE}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
          }
      })
      toast.success(`${response.data.message}`);
      return;
    }
    catch(err:any){
      
    }
  }

  const updateMutation = useMutation({
    mutationFn: updatePreference,
    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey: ["preferences"],
      }); 
    }
  })


  const initialValues = {
    language: data?.preference?.language || "",
    breakfast: data?.preference?.breakfast || "",
    lunch: data?.preference?.lunch || "",
    dinner: data?.preference?.dinner || "",
    wake_time: data?.preference?.wake_time || "",
    bed_time: data?.preference?.bed_time || "",
    weight_in: data?.preference?.weight_in || "kg",
    height_in: data?.preference?.height_in || "cm",
    blood_glucose_in: data?.preference?.blood_glucose_in || "mg/dl",
    cholesterol_in: data?.preference?.cholesterol_in || "mg/dl",
    blood_pressure_in: data?.preference?.pressure_in || "mmHg",
    distance_in: data?.preference?.distance_in || "km",
    system_email: data?.preference?.system_email || false,
    sms: data?.preference?.sms || true,
    post: data?.preference?.post || true,
    member_services_email: data?.preference?.member_services_email || true,
    phone_call: data?.preference?.phone_call || false
  };

  const validationSchema = Yup.object({
    language: Yup.string().required("Please select a language"),
    breakfast: Yup.string().required("Please set a breakfast time"),
    lunch: Yup.string().required("Please set a lunch time"),
    dinner: Yup.string().required("Please set a dinner time"),
    wake_time: Yup.string().required("Please set a wake-up time"),
    bed_time: Yup.string().required("Please set a bedtime"),
  });

  const handleSubmit = (values:any) => {
    console.log("Form Data: ", values);
    updateMutation.mutate(values);
    // Add API submission logic here
  };

  if (isLoading) {
    return (<div>Loading...</div>)
  }

  if (isError) {
    return (<div>Error: {error.message}</div>)
  }

  return (
    <div className="container">
      <GoBack text="Preferences"/>

      <div className="bg-white p-4 rounded">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Language</label>
                  <Field as="select" name="language" className="form-select">
                    <option value="" disabled>
                      Select language
                    </option>
                    <option value="English">English</option>
                  </Field>
                  <ErrorMessage
                    name="language"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Breakfast</label>
                  <Field
                    type="time"
                    name="breakfast"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="breakfast"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              {/* Time Fields */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Lunch</label>
                  <Field
                    type="time"
                    name="lunch"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="lunch"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Dinner</label>
                  <Field
                    type="time"
                    name="dinner"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="dinner"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              {/* Wake-up and Bed time */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Wake-up Time</label>
                  <Field
                    type="time"
                    name="wake_time"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="wake_time"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Bed Time</label>
                  <Field
                    type="time"
                    name="bed_time"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="bed_time"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              {/* Units Selection */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Weight</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <Field
                        type="radio"
                        className="form-check-input"
                        name="weight_in"
                        value="Kg"
                        
                      />
                      <label className="form-check-label">Kg</label>
                    </div>
                    <div className="form-check">
                      <Field
                        type="radio"
                        className="form-check-input"
                        name="weight_in"
                        value="lbs"
                      />
                      <label className="form-check-label">lbs</label>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Height</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <Field
                        type="radio"
                        className="form-check-input"
                        name="height_in"
                        value="cm"
                      />
                      <label className="form-check-label">cm</label>
                    </div>
                    <div className="form-check">
                      <Field
                        type="radio"
                        className="form-check-input"
                        name="height_in"
                        value="ft/inches"
                      />
                      <label className="form-check-label">ft/inches</label>
                    </div>
                  </div>
                </div>
                
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Blood Glocose</label>
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <Field
                          type="radio"
                          className="form-check-input"
                          name="blood_glucose_in"
                          value="mmo/l"
                        />
                        <label className="form-check-label">mmo/l</label>
                      </div>
                      <div className="form-check">
                        <Field
                          type="radio"
                          className="form-check-input"
                          name="blood_glucose_in"
                          value="mg/dl"
                        />
                        <label className="form-check-label">mg/dl</label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                      <label className="form-label">Cholesterol</label>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <Field
                            type="radio"
                            className="form-check-input"
                            name="cholesterol_in"
                            value="mmo/l"
                          />
                          <label className="form-check-label">mmo/l</label>
                        </div>
                        <div className="form-check">
                          <Field
                            type="radio"
                            className="form-check-input"
                            name="cholesterol_in"
                            value="mg/dl"
                          />
                          <label className="form-check-label">mg/dL</label>
                        </div>
                      </div>
                   </div>
               </div>

              <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Blood Pressure</label>
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <Field
                          type="radio"
                          className="form-check-input"
                          name="blood_pressure_in"
                          value="kPa"
                        />
                        <label className="form-check-label">kPa</label>
                      </div>
                      <div className="form-check">
                        <Field
                          type="radio"
                          className="form-check-input"
                          name="blood_pressure_in"
                          value="mmHg"
                        />
                        <label className="form-check-label">mmHg</label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Distance</label>
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <Field
                          type="radio"
                          className="form-check-input"
                          name="distance_in"
                          value="km"
                        />
                        <label className="form-check-label">km</label>
                      </div>
                      <div className="form-check">
                        <Field
                          type="radio"
                          className="form-check-input"
                          name="distance_in"
                          value="miles"
                        />
                        <label className="form-check-label">miles</label>
                      </div>
                    </div>
                  </div>
              </div>

              <div className="mb-3">
                <div className="border-top border-bottom py-1 mb-2" >
                  <label className="form-label text-secondary">Communication Type</label>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-check form-switch">
                      <label className="form-check-label">System Emails</label>
                      <Field className="form-check-input" type="checkbox" name="system_email" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-check form-switch">
                      <label className="form-check-label">SMS</label>
                      <Field className="form-check-input" type="checkbox" name="sms"   />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-check form-switch">
                      <label className="form-check-label">Post</label>
                      <Field className="form-check-input" type="checkbox" name="post"  />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-check form-switch">
                      <label className="form-check-label">Member Services Emails</label>
                      <Field className="form-check-input" type="checkbox" name="member_services_email" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-check form-switch">
                      <label className="form-check-label">Phone Call</label>
                      <Field className="form-check-input" type="checkbox" name="phone_call" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="ms-auto w-25">
                <div className="ps-5 ms-5 " >
                  <Button text="Update" type="submit" />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Preferences;
