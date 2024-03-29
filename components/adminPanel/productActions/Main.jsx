import React, { useEffect, useRef, useState } from "react";
// Next
import { useRouter } from "next/router";
import Image from "next/image";
// Components
import GetAll from "./GetAll";
import Input from "../../form/AccInput";
import { toastError, toastSuccess } from "../../notificataions/Toast";

export default function Main({ products }) {
  const router = useRouter();
  const [menuImgData, setMenuImgData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const inputRef = useRef(null)

  const changeTypeAction = (type) => {
    // Trigger fragment change to fetch the new data
    router.push(`/adminPanel/#prodykti#${type}`, undefined, { shallow: true });
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    console.log(value);
    if (name.includes("image")) {
      value = e.target.files[0];
    }
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
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
    if (
      data.message == "Успешно променихте снимката, рестарирайте страницата!"
    ) {
      toastSuccess("Успешно променихте снимката!");
      router.push(router.asPath, undefined, { scroll: false });
    } else {
      toastError("Нещо се обърка!");
    }
  };
  useEffect(()=>{

    const test = e=>{
      if(e.clipboardData.files.length > 0){
        const fileInput = inputRef.current
        const fileZero = e.clipboardData.files[0]
        
        console.log(e.clipboardData.files);
        const obj = {
          target: {
              name: fileZero.name,
              value: fileZero.type,
              files: e.clipboardData.files
          }
        } 
        console.log(obj.target.name);
        console.log(fileZero.name);

        changeHandler(obj)
    // setPreviewImage(URL.createObjectURL(e.clipboardData.files[0]));

      }
    }
    window.addEventListener("paste",test)
    return()=>{
      window.removeEventListener("paste", test)
    }
  },[])
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
          <div className="fixed top-0 left-0 z-20 w-screen h-screen ">
            <div
              className="relative z-10 flex items-center justify-center w-screen h-screen cursor-pointer blury-noProps"
              onClick={() => setMenuImgData(null)}
            ></div>
            <div className="absolute z-20 w-full h-full max-w-4xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-h-96 ">
              <div className="relative z-50 py-10 bg-white text-dark">
                <div className="flex flex-col items-center justify-center h-full gap-y-10 ">
                  {previewImage && (
                    <div className="flex flex-col">
                      <h3 className="text-xl text-bold text-primary-100">
                        Сегашна снимка:
                      </h3>
                    
                      <div className="relative h-28 w-28">
                        <Image
                          src={previewImage}
                          layout="fill"
                          alt={menuImgData.imgUrl}
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <Input
                    inputRef={inputRef}
                      type="file"
                      placeholder="Снимка"
                      id="imageNewData"
                      onChange={changeHandler}
                    />
                  </div>
                  <button
                    onClick={submitImgHandler}
                    className="px-10 py-1 text-white border bg-green border-green hover:bg-transparent hover:text-green "
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
