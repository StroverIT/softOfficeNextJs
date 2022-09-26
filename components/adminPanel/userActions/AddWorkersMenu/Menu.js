import React from "react";

import Input from "../../../form/AccInput";

const Menu = ({ workers, setWorkers }) => {
  const addWorker = () => {
    const objInit = { email: "" };
    const newObj = [...workers];
    newObj.push(objInit);
    setWorkers(newObj);
  };
  const changeValHand = (e, workerIndx) => {
    const newData = workers.map((worker, index) => {
      if (index == workerIndx) {
        return { ...worker, [e.target.name]: e.target.value };
      }
      return worker;
    });
    setWorkers(newData);
  };
  return (
    <div>
      <button
        onClick={addWorker}
        className="px-5 py-2 mb-2 text-white rounded-full bg-orange"
      >
        Добави поле
      </button>
      {workers.map((worker, index) => {
        return (
          <Input
            key={worker + index}
            placeholder="и-мейл на работника"
            id="email"
            type="text"
            value={worker.email}
            onChange={(e) => changeValHand(e, index)}
          />
        );
      })}
    </div>
  );
};

export default Menu;
