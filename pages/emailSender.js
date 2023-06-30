import { sendContactForm } from "@/lib/api";
import React, { useState } from "react";

const initValues = { name: "", email: "", subject: "",phone: "", message: "" }

const initstate = {isLoading: false, error: "",mainEmail: "rohitsivasai989@gmail.com", values: initValues }

const EmailSender = () => {
  const [state, setState] = useState(initstate);
  const [mainEmail,setMainEmail] = useState("rohitsivasai989@gmail.com")

  const { values,isLoading,error } = state;

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

    const onSubmit = async ()=>{
        setState((prev)=>({
            ...prev,
            isLoading: true,
        }))
        try {
        await sendContactForm(state)
        setState(initstate)

        } catch (error) {
            setState((prev)=>({
                ...prev,
                isLoading: true,
                error: error.message
            }))
        }
    }

  console.log(state);

  return (
    <div>
      <h1>Conatct</h1>
      {error &&  <div>
        {error}
      </div> }
      <div>
        {/* <form action=""> */}
          <div className="flex flex-col w-1/5 mx-auto">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              id=""
              value={values.name}
              onChange={handleChange}
              className="border-2"
            />
          </div>
          <div className="flex flex-col w-1/5 mx-auto">
            <label htmlFor="">email</label>
            <input
              type="email"
              name="email"
              id=""
              value={values.email}
              onChange={handleChange}
              className="border-2"
            />
          </div>
          <div className="flex flex-col w-1/5 mx-auto">
            <label htmlFor="">subject</label>
            <input
              type="text"
              name="subject"
              id=""
              value={values.subject}
              onChange={handleChange}
              className="border-2"
            />
          </div>
          <div className="flex flex-col w-1/5 mx-auto">
            <label htmlFor="">phone number</label>
            <input
              type="number"
              name="phone"
              id=""
              value={values.phone}
              onChange={handleChange}
              className="border-2"
            />
          </div>
          <div className="flex flex-col w-1/5 mx-auto">
            <label htmlFor="">message</label>
            <textarea
              name="message"
              id=""
              rows={4}
              value={values.message}
              onChange={handleChange}
              className="border-2"
            />
          </div>
          <button
            className="p-2 border rounded-md  mx-auto text-center w-fit flex justify-center"
            disabled={
              !values.name ||
              !values.subject ||
              !values.email ||
              !values.message
            }
            isLoading={isLoading}
            onClick={onSubmit}
          >
            Submit
          </button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default EmailSender;
