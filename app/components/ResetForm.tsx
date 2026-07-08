"use client";
import { useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";
import Input from "./contactForm/Input";

export const ResetPass = () => {
  const [loading, setLoading] = useState(false);
  return (
    <form>
      <Input
        className=""
        id="UserName"
        name="Name"
        label="UserName"
        placeholder="UserName"
      />

      <div className="flex flex-row justify-center  ">
        <div className="flex-1 w-64">
          <Input
            className="w-20"
            id="Password"
            name="Password"
            label="Password"
            placeholder="Password"
          />
        </div>
        <div className="flex-1 w-32 ml-7">
          <Input
            className=""
            id="Confirm Password"
            name="Confirm Password"
            label="Confirm Password"
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <div className="items-center justify-between">
        <button
          className="mt-4 justify-center rounded-md bg-blue-600 py-3 px-5 text-lg text-white outline-none hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading !== true ? (
            "Change Password"
          ) : (
            <div className="flex h-full w-full items-center justify-center ">
              <RiLoader5Fill className="h-8 w-8 animate-spin" />
            </div>
          )}
        </button>
      </div>
      <p className="mt-5 text-green-500 dark:text-green-500"></p>
    </form>
  );
};
