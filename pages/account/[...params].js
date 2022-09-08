import React, { useState, useEffect } from "react";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
// Models
import User from "../../db/models/User";
import Token from "../../db/models/Token";
import { connectMongo } from "../../db/connectDb";
// Components
import Input from "../../components/form/Input";
import Outlined from "../../components/buttons/Outlined";
// NextJs
import Head from "next/head";
import { useRouter } from "next/router";

const innerRoutes = {
  verifyAccount: "verifyAccountToken",
  changePassword: "changePassword",
  verifyDelivery: "verifyDelivery",
};
export default function Index({ data }) {
  const router = useRouter();

  const passData = {
    password: "",
    confPassword: "",
  };
  const [inputs, setInputs] = useState(passData);
  const [errors, setErrors] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [dataState, setDataState] = useState(data);
  const [isLoading, setLoading] = useState(false);

  function passStateHandler(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }
  async function passFormHandler(e) {
    e.preventDefault();
    let sendDataInputs = inputs;
    sendDataInputs.userId = data.userId;
    sendDataInputs.token = data.token;
    const res = await fetch("/api/account/forgotten/succPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendDataInputs),
    });
    const resData = await res.json();
    if (res.status != 201) {
      setErrors(...resData.errors);
      return;
    }
    setDataState((prevState) => ({
      ...prevState,
      route: "success",
      message: resData.message,
    }));
  }

  useEffect(() => {
    if (inputs.password.length > 0 || inputs.confPassword.length > 0) {
      if (inputs.password != inputs.confPassword) {
        setErrors("Паролите трябва да съвпадат");
        setDisabled(true);
      } else {
        setErrors(null);
        setDisabled(false);
      }
    }
  }, [errors, inputs]);
  useEffect(() => {
    if (
      innerRoutes.verifyDelivery &&
      dataState?.message == "Успешно потвърдихте поръчката си"
    ) {
      localStorage.clear();
    }
  }, [dataState]);

  return (
    <>
      <Head>
        <title>SoftOffice my account</title>
        <meta name="description" content="Онлайн магазин SoftOffice" />
      </Head>
      <main className="text-center">
        <div className="container flex flex-col items-center justify-center w-full py-10 text-center bg-white rounded shadow-xl lg:max-w-xl">
          {dataState?.message && (
            <>
              <div className="text-2xl text-green">{dataState.message}</div>
              <div className="mt-2 text-lg underline cursor-pointer text-primary">
                <a onClick={() => router.push("/")}>Към начална страница</a>
              </div>
            </>
          )}
          {dataState?.error && (
            <>
              <div className="text-2xl text-secondary">{dataState.error}</div>
              <div className="mt-2 text-lg underline cursor-pointer text-primary">
                <a onClick={() => router.push("/")}>Към начална страница</a>
              </div>
            </>
          )}
          {dataState?.route == innerRoutes.changePassword && !dataState?.error && (
            <div className="container flex flex-col items-center justify-center">
              <h1 className="mb-5 text-lg font-medium text-primary">
                Смяна на паролата
              </h1>
              {errors && <div className="mb-4 text-secondary">{errors}</div>}
              <form
                className="w-1/2"
                onSubmit={passFormHandler}
                onChange={passStateHandler}
              >
                <Input
                  type="password"
                  placeholder="Нова парола"
                  id="password"
                  isReq={true}
                  iconType="password"
                />
                <Input
                  type="password"
                  placeholder="Потвърди паролата"
                  id="confPassword"
                  isReq={true}
                  iconType="password"
                />
                <Outlined
                  type="submit"
                  text="Изпрати"
                  custom={`text-sm ${
                    disabled && "cursor-not-allowed opacity-50"
                  }`}
                  isDisabled={disabled}
                  isLoading={isLoading}
                  onClick={() => setLoading(true)}
                />
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
export async function getServerSideProps(context) {
  const { params } = context.params;
  const url = params[0];
  const userId = params[1];
  const token = params[2];
  await connectMongo();
  let data = {};
  try {
    if (token.length < 12) throw { message: "Невалидна сесия!" };

    const foundToken = await Token.findOne({
      token: ObjectId(token),
    });

    if (!foundToken || foundToken?.userId != userId) {
      throw {
        message: "Невалидна сесия!",
      };
    }

    if (url == innerRoutes.verifyAccount) {
      if (!data.error) {
        const user = await User.findById(foundToken.userId._id);
        user.isVerified = true;
        await user.save();
        await Token.deleteOne({ _id: foundToken._id });
        data.message = "Успешно потвърдихте акаунта си!";
      }
    }

    if (url == innerRoutes.changePassword) {
      if (!data.error) {
        data.route = innerRoutes.changePassword;
        data.token = token;
        data.userId = userId;
      }
    }
    if (url == innerRoutes.verifyDelivery) {
      if (!data.error) {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/account/verifyDeliveryToken/${userId}/${token}`
        );

        const resData = await res.json();
        if (res.status != 201) {
          throw {
            message: resData.message,
          };
        }
        data.message = resData.message;
      }
    }
  } catch (e) {
    data.error = e.message;
  }

  mongoose.connection.close();

  return {
    props: { data },
  };
}
