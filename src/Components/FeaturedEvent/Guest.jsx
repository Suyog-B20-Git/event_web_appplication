import React, { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";

function Guest() {
  const [firstName, setFirstName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[360px] h-[360px] pb-5  flex flex-col gap-3">
        <h2
          className=" text-3xl  md:text-2xl font-semibold"
          style={{
            textDecoration: "underline",
            textDecorationColor: "#FF2459",
            color: "#FF2459",
          }}
        >
          Checkout as guest
        </h2>
        <InputField
          label={"First Name"}
          type={"text"}
          name={"firstName"}
          width={"w-full"}
          placeholder={"Enter yor first Name"}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <InputField
          label={"Email*"}
          type={"email"}
          name={"email"}
          width={"w-full"}
          placeholder={"Enter email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label={"phone*"}
          type={"tel"}
          name={"phone"}
          width={"w-full"}
          placeholder={"Enter password"}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button
          text={"Continue"}
          type={"button"}
          variant={"primary"}
          rounded={"rounded-xl"}
          width={"w-full"}
        />
      </div>
    </div>
  );
}

export default Guest;
