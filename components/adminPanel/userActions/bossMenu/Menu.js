import React, { useState } from "react";
// Components
import Input from "../../../form/AccInput";
import Outlined from "../../../buttons/Outlined";
import { HiX } from "react-icons/hi";

const Index = ({ workers, setWorkers }) => {
  const [count, setCount] = useState(1);

  const addWorker = () => {
    const objInit = { email: "" };
    const newObj = [...workers];
    for (let i = 0; i < count; i++) {
      newObj.push(objInit);
    }
    setWorkers(newObj);
  };
  const removeWorkerHandler = (workerIdx, e) => {
    const newData = workers.filter((item, idx) => {
      return idx != workerIdx;
    });
    setWorkers(newData);
  };
  const workerInputsHandler = (workerIndx, e) => {
    const newData = workers.map((worker, index) => {
      console.log(worker, index, workerIndx);
      if (index == workerIndx) {
        return { ...worker, [e.target.name]: e.target.value };
      }
      return worker;
    });
    setWorkers(newData);
  };
  return (
    <section>
      <h3 className="font-semibold text-center">Работници</h3>
      <section className="flex text-sm jus">
        <div className="">
          <Outlined text="Добави Работник" onClick={addWorker} />
        </div>
        <div>
          <Input
            placeholder="Обща Броя"
            id="generalPromo"
            type="text"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
      </section>
      {workers && (
        <section>
          {workers.map((data, index) => {
            return (
              <div className="flex items-center justify-center" key={index}>
                <Input
                  placeholder="И-мейл"
                  id="email"
                  type="text"
                  value={data.email}
                  onChange={workerInputsHandler.bind({}, index)}
                />
                <div
                  className="text-3xl cursor-pointer text-secondary"
                  onClick={removeWorkerHandler.bind({}, index)}
                >
                  <HiX />
                </div>
              </div>
            );
          })}
        </section>
      )}
    </section>
  );
};

export default Index;
