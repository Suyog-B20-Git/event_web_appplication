import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createNewOrganizer } from "../../../src/redux/actions/master/Organizer";

export const Orgnizer = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [preview, setPreview] = useState({});

  const onSubmit = (data) => {
    dispatch(createNewOrganizer(data));
    setPreview(data);
    console.log("Form submitted:", data);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Organizer Registration</h1>
      <Row>
        <Col md={8}>
          <Card>
            <CardBody>
              <CardTitle>Registration Form</CardTitle>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Basic Information */}
                <h3>Basic Information</h3>
                <hr />
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    onChange={(e) => setValue("name", e.target.value, { shouldValidate: true })}
                  />
                  {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </FormGroup>

                <FormGroup>
                  <Label for="categories">Categories</Label>
                  <Input
                    id="categories"
                    name="categories"
                    type="text"
                    {...register("categories", { required: "Categories are required" })}
                    onChange={(e) => setValue("categories", e.target.value, { shouldValidate: true })}
                  />
                  {errors.categories && <p className="text-danger">{errors.categories.message}</p>}
                </FormGroup>

                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    type="textarea"
                    {...register("description", { required: "Description is required" })}
                    onChange={(e) => setValue("description", e.target.value, { shouldValidate: true })}
                  />
                  {errors.description && <p className="text-danger">{errors.description.message}</p>}
                </FormGroup>

                {/* Contact Information */}
                <h3>Contact Information</h3>
                <hr />
                <FormGroup>
                  <Label for="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    {...register("phoneNumber")}
                    onChange={(e) => setValue("phoneNumber", e.target.value, { shouldValidate: true })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    {...register("email")}
                    onChange={(e) => setValue("email", e.target.value, { shouldValidate: true })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="text"
                    {...register("website")}
                    onChange={(e) => setValue("website", e.target.value, { shouldValidate: false })}
                  />
                </FormGroup>

                {/* Social Media */}
                <h3>Social Media</h3>
                <hr />
                <FormGroup>
                  <Label for="facebookUrl">Facebook URL</Label>
                  <Input
                    id="facebookUrl"
                    name="facebookUrl"
                    type="text"
                    {...register("facebookUrl")}
                    onChange={(e) => setValue("facebookUrl", e.target.value, { shouldValidate: false })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="instagramUrl">Instagram URL</Label>
                  <Input
                    id="instagramUrl"
                    name="instagramUrl"
                    type="text"
                    {...register("instagramUrl")}
                    onChange={(e) => setValue("instagramUrl", e.target.value, { shouldValidate: false })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="youtubeUrl">YouTube URL</Label>
                  <Input
                    id="youtubeUrl"
                    name="youtubeUrl"
                    type="text"
                    {...register("youtubeUrl")}
                    onChange={(e) => setValue("youtubeUrl", e.target.value, { shouldValidate: false })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="twitterUrl">Twitter URL</Label>
                  <Input
                    id="twitterUrl"
                    name="twitterUrl"
                    type="text"
                    {...register("twitterUrl")}
                    onChange={(e) => setValue("twitterUrl", e.target.value, { shouldValidate: false })}
                  />
                </FormGroup>

                {/* Additional Fields */}
                <h3>Additional Fields</h3>
                <hr />
                {[ "tags", "city", "state", "address", "country", "googleSearchLocation", "googleSearchLat", "googleSearchLong", "availableTime", "rating", "profileImage", "visits" ].map((field) => (
                  <FormGroup key={field}>
                    <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                    <Input
                      id={field}
                      name={field}
                      type={field === "description" ? "textarea" : "text"}
                      {...register(field)}
                      onChange={(e) => setValue(field, e.target.value, { shouldValidate: true })}
                    />
                  </FormGroup>
                ))}

                {/* Submit Button */}
                <Button type="submit" color="primary">Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <CardTitle>Preview</CardTitle>
              {Object.keys(preview).length > 0 && (
                <div>
                  <h3>Basic Information</h3>
                  <p><strong>Name:</strong> {preview.name}</p>
                  <p><strong>Categories:</strong> {preview.categories}</p>
                  <p><strong>Description:</strong> {preview.description}</p>

                  <h3>Contact Information</h3>
                  <p><strong>Phone Number:</strong> {preview.phoneNumber}</p>
                  <p><strong>Email:</strong> {preview.email}</p>
                  <p><strong>Website:</strong> {preview.website}</p>

                  <h3>Social Media</h3>
                  <p><strong>Facebook URL:</strong> {preview.facebookUrl}</p>
                  <p><strong>Instagram URL:</strong> {preview.instagramUrl}</p>
                  <p><strong>YouTube URL:</strong> {preview.youtubeUrl}</p>
                  <p><strong>Twitter URL:</strong> {preview.twitterUrl}</p>

                  <h3>Additional Fields</h3>
                  {Object.keys(preview).filter(field => !["name", "categories", "description", "phoneNumber", "email", "website", "facebookUrl", "instagramUrl", "youtubeUrl", "twitterUrl"].includes(field)).map((field) => (
                    <p key={field}><strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {preview[field]}</p>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
