import React, { useState, useEffect } from "react";

// NextJs
import Head from "next/head";
// Components
import Input from "../../components/form/Input";
import { emailVal } from "../../utils/validationHandler";

export default function ResetPassword() {
  const initialValues = {
    email: "",
  };
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [inputs, setInputs] = useState(initialValues);
  function formHandlerInputs(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();

    const errors = [];
    const emailCheck = emailVal(inputs.email);
    if (!emailCheck.result) errors.push(emailCheck.message);
    if (errors.length > 0) {
      setErrorMessages([...errors]);
      setSuccessMessage(null);

      return;
    }
    const res = await fetch("/api/account/forgotten/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });
    //Await for data for any desirable next steps
    if (res.status != 201) {
      const data = await res.json();
      setErrorMessages([...data.map((e) => e)]);
      setSuccessMessage(null);
      return;
    }

    // Send message
    setErrorMessages([]);
    setSuccessMessage("Успешно изпратена заявка, вижте си и-мейла!");
  }
  return (
    <>
      <Head>
        <title>IvdaGeo reset password</title>
        <meta name="description" content="Онлайн магазин IvdaGeo" />
      </Head>
      <main>
        <div className="container flex justify-center my-10">
          <div className="w-full bg-white rounded shadow-xl lg:w-1/2">
            <div className="mt-5 ml-8">
              <h3 className="text-3xl text-center">Забравена парола</h3>
              {successMessage && (
                <div className="my-2 text-center text-green">
                  {successMessage}
                </div>
              )}
              {errorMessages && (
                <div className="my-2 text-center text-secondary">
                  <ul>
                    {errorMessages.map((e) => {
                      return <li key={e}>{e}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>

            <form
              className="px-8 pt-1 pb-8 mt-6 mb-4"
              onSubmit={submitHandler}
              onChange={(e) => formHandlerInputs(e)}
            >
              <Input
                placeholder="И-мейл"
                type="email"
                id="email"
                isReq={true}
                iconType="email"
              />

              <div className="flex items-center justify-center ">
                <button
                  className="w-full px-4 py-2 font-bold text-white rounded shadow-md disabled:opacity-25 bg-primary hover:bg-primary focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Изпрати
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
