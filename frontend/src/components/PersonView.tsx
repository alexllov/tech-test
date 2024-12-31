import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  labelClassName,
  inputClassName,
  buttonClassName,
  errorClassName,
} from "../styling";

const schema = z.object({
  id: z.string().min(1),
});

type FormFields = z.infer<typeof schema>;

const path = "/person";

// TASK 4
export default function PersonView() {
  const form = useForm<FormFields>({ resolver: zodResolver(schema) });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [failureMessage, setFailureMessage] = useState<string | null>(null);
  useEffect(() => {
    if (failureMessage) {
      const timer = setTimeout(() => {
        setFailureMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [failureMessage]);

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    try {
      const url = `http://localhost:8080${path}/${data.id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        setSearchResult(json);
      } else {
        setSearchResult(null);
        setFailureMessage("Error, no record found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <p className="flex justify-center">Search for a Record</p>
        <div className="my-2">
          <div className="relative">
            <input
              className={inputClassName}
              type="text"
              id="searchId"
              placeholder=" "
              {...register("id")}
            />
            <label className={labelClassName} htmlFor="searchId">
              ID of Person
            </label>
          </div>
          <p className={errorClassName}>{errors.id?.message}</p>
        </div>
        <button className={`${buttonClassName} mt-2 py-3`}>View</button>
      </form>

      {searchResult ? (
        <div className="mt-2 bg-harker-background-light rounded-lg px-2">
          <p>ID: {searchResult.id}</p>
          <p>First Name: {searchResult.firstName}</p>
          <p>Last Name: {searchResult.lastName}</p>
          <p>Date of Birth: {searchResult.dob}</p>
        </div>
      ) : (
        <p className={errorClassName}>{failureMessage}</p>
      )}
    </div>
  );
}
