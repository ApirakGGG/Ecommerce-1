"use client";
import React, { useCallback, useState } from "react";
import Input from "../../components/contactForm/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UpdateUserNameForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdate = useCallback((id: string, updatedName: string) => {
    setLoading(true);

    axios
      .put(`/api/edituser/${id}`, {
        name: updatedName,
      })
      .then((res) => {
        toast.success("Username updated successfully");
      })
      .catch((err) => {
        toast.error("Oops! Something went wrong");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <form>
      <Input
        id="updatedName"
        name="updatedName"
        label="Your Name"
        placeholder="Name"
        required
      />

      <button
        className={`mt-4 w-full rounded-md bg-blue-600 py-3 px-5 text-lg text-white outline-none hover:bg-blue-800 ${
          loading ? "disabled:cursor-not-allowed disabled:bg-opacity-60" : ""
        }`}
        type="submit"
        disabled={loading}
      >
        {loading ? "SUBMITTING..." : "SUBMIT"}
      </button>
    </form>
  );
};

export default UpdateUserNameForm;
