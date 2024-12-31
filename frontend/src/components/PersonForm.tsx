import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  labelClassName,
  inputClassName,
  buttonClassName,
  errorClassName,
} from "../styling";
// TASK 2 is up to you on where you put the validaton

// TASK 1
const personSchema = z.object({
  id: z.string().min(1),
  firstName: z
    .string()
    .regex(/\b[A-Z][a-z]*\b/, "First Name must begin with a capital letter"),
  lastName: z
    .string()
    .regex(/\b[A-Z][a-zA-Z]*\b/, "Last Name must begin with a capital letter"),
  dob: z.string().date(),
});

// TASK 1
const path = "/person";

type FormFields = z.infer<typeof personSchema>;

export default function PersonForm() {
  // Form handling
  const form = useForm<FormFields>({ resolver: zodResolver(personSchema) });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  // Success message handling
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Form submission handling
  // Event used in place of original isUpdating to prevent unnecessary re-render
  const onSubmit: SubmitHandler<FormFields> = async (
    data: FormFields,
    event
  ) => {
    console.log(event);
    const isUpdating =
      (event?.nativeEvent as SubmitEvent).submitter?.id == "update";
    try {
      const url = isUpdating
        ? `http://localhost:8080${path}/${data.id}`
        : `http://localhost:8080${path}`;
      const method = isUpdating ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        // TASK 3
        const dynamicSuccessMessage = isUpdating
          ? "You have sucessfully updated the following record:"
          : "You have sucessfully created the following record:";
        setSuccessMessage(
          dynamicSuccessMessage + JSON.stringify(json, null, 2)
        );
        setHasFailed(false);
      } else {
        setSuccessMessage("Failed to create person");
        setHasFailed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // See styling.js

  return (
    <div className="">
      <div className="flex justify-center">
        <h1>Create or Update a Record</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="my-2">
          <div className="relative">
            <input
              className={inputClassName}
              type="text"
              id="id"
              placeholder=" "
              {...register("id")}
            />
            <label className={labelClassName} htmlFor="id">
              ID
            </label>
          </div>
          <p className={errorClassName}>{errors.id?.message}</p>
        </div>

        {/* TASK 1 Add more attribute fields here */}
        <div className="my-2">
          <div className="relative">
            <input
              className={inputClassName}
              type="text"
              id="firstName"
              placeholder=" "
              {...register("firstName")}
            />
            <label className={labelClassName} htmlFor="firstName">
              First Name
            </label>
          </div>
          <p className={errorClassName}>{errors.firstName?.message}</p>
        </div>

        <div className="my-2">
          <div className="relative">
            <input
              className={inputClassName}
              type="text"
              id="lastName"
              placeholder=" "
              {...register("lastName")}
            />
            <label className={labelClassName} htmlFor="lastName">
              Last Name
            </label>
          </div>
          <p className={errorClassName}>{errors.lastName?.message}</p>
        </div>

        <div className="relative my-2">
          <input
            className={inputClassName}
            type="date"
            id="dob"
            {...register("dob")}
          />
          <label className={labelClassName} htmlFor="dob">
            Date of Birth
          </label>
        </div>

        <div className="flex justify-between mt-4">
          <button type="submit" className={buttonClassName} id="create">
            Create
          </button>
          <button type="submit" className={buttonClassName} id="update">
            Update
          </button>
        </div>
      </form>

      {successMessage &&
        (hasFailed ? (
          <p className={errorClassName}>{successMessage}</p>
        ) : (
          <p className="text-green-500 mt-4">{successMessage}</p>
        ))}
    </div>
  );
}
