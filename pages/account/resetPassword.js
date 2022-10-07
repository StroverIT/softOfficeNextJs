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
<<<<<<< HEAD
  const [isLoading, setLoader] = useState(false);

=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  function formHandlerInputs(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
<<<<<<< HEAD
    setLoader(true);
=======

>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    const errors = [];
    const emailCheck = emailVal(inputs.email);
    if (!emailCheck.result) errors.push(emailCheck.message);
    if (errors.length > 0) {
      setErrorMessages([...errors]);
      setSuccessMessage(null);
<<<<<<< HEAD
      setLoader(false);
=======

>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
      setLoader(false);

=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      return;
    }

    // Send message
    setErrorMessages([]);
    setSuccessMessage("Успешно изпратена заявка, вижте си и-мейла!");
<<<<<<< HEAD
    setLoader(false);
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  }
  return (
    <>
      <Head>
        <title>SoftOffice reset password</title>
        <meta name="description" content="Онлайн магазин SoftOffice" />
      </Head>
      <main>
        <div className="container flex justify-center my-10">
          <div className="w-full bg-white rounded shadow-xl lg:w-1/2">
            <div className="mt-5 ml-8">
              <h3 className="text-3xl text-center">Забравена парола</h3>
              {successMessage && (
<<<<<<< HEAD
                <div className="my-2 text-center text-green">
=======
                <div className="my-2 text-green text-center">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                  {successMessage}
                </div>
              )}
              {errorMessages && (
<<<<<<< HEAD
                <div className="my-2 text-center text-secondary">
=======
                <div className="my-2 text-secondary text-center">
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
                  className="w-full px-4 py-2 font-bold text-white rounded shadow-md disabled:opacity-25 bg-primary hover:bg-primary focus:outline-none focus:shadow-outline flex justify-center items-center"
                  type="submit"
                >
                  {isLoading ? <div className="loader"></div> : "Изпрати"}
=======
                  className="w-full px-4 py-2 font-bold text-white rounded shadow-md disabled:opacity-25 bg-primary hover:bg-primary focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Изпрати
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
