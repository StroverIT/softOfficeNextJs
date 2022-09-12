import React, { useState } from "react";
// Next
import { useRouter } from "next/router";
import Image from "next/image";
// Components
import GetAll from "./GetAll";
import Input from "../../form/AccInput";

export default function Main({ products }) {
  const router = useRouter();
  const [menuImgData, setMenuImgData] = useState(null);
  const changeTypeAction = (type) => {
    // Trigger fragment change to fetch the new data
    router.push(`/adminPanel/#prodykti#${type}`, undefined, { shallow: true });
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name.includes("image")) {
      value = e.target.files[0];
      console.log(e.target.files);
    }
    setMenuImgData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitImgHandler = async () => {
    const formData = new FormData();
    Object.entries(menuImgData).forEach((item) => {
      let [key, value] = item;
      if (key.includes("image")) {
        formData.append("article", value);
        value = value?.name;
        return;
      }
      formData.append(key, value);
    });
    const options = {
      method: "POST",
      body: formData,
    };
    const res = await fetch(`/api/products/changeImage`, options);
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="mt-10">
      <div className="flex justify-end">
        <button
          onClick={() => changeTypeAction("create")}
          className="px-5 text-sm border border-green text-green hover"
        >
          Създай продукт
        </button>
      </div>
      <section className="my-5">
        {products.length > 0 &&
          products.map((product) => {
            return (
              <GetAll
                product={product}
                key={product._id}
                menuImgData={menuImgData}
                setMenuImgData={setMenuImgData}
              />
            );
          })}
        {menuImgData && (
          <div className="fixed  z-20 left-0 top-0 h-screen w-screen ">
            <div
              className="relative  w-screen h-screen  blury-noProps cursor-pointer flex items-center justify-center z-10"
              onClick={() => setMenuImgData(null)}
            ></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-full max-h-96 w-full max-w-4xl ">
              <div className="bg-white text-dark  relative z-50 py-10">
                <div className="flex items-center justify-center h-full flex-col gap-y-10 ">
                  <div className="flex flex-col">
                    <h3 className="text-xl text-bold text-primary-100">
                      Сегашна снимка:
                    </h3>
                    <div className="relative h-28 w-28">
                      <Image
                        src={`/uploads/${menuImgData.imgUrl}`}
                        layout="fill"
                        alt={menuImgData.imgUrl}
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      type="file"
                      placeholder="Снимка"
                      id="imageNewData"
                      onChange={changeHandler}
                    />
                  </div>
                  <button
                    onClick={submitImgHandler}
                    className="bg-green border border-green text-white hover:bg-transparent hover:text-green px-10 py-1 "
                  >
                    Изпрати
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
