import Input from "./Input";

function DeliveryInputs() {
  return (
    <section className="container w-full mt-3">
      <Input id="name" type="text" text="Име" holder="Иван Иванов" />
      <Input
        id="telNumber"
        type="number"
        text="Телефон"
        holder="087 123 4561"
      />
      <Input id="city" type="text" text="Град" holder="София" />
      <Input id="poshtenskiKod" type="text" text="Пощенски код" holder="1584" />
      <div className="flex flex-col justify-between ">
        <div className="flex items-center mb-1">
          <label htmlFor="address" className="font-medium text-dark-400">
            Адрес
          </label>
        </div>
        <textarea
          id="address"
          type="text"
          text="Адрес"
          placeholder="РУМ Дружба 2 срещу блок 205"
          className="px-3 py-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none resize-none focus:outline-none focus:shadow-outline placeholder:text-gray-200"
          cols="22"
          rows="2"
        ></textarea>
      </div>
      <div className="mt-2 ">
        <div className="mb-2">
          <label htmlFor="moreInfo" className="font-medium text-dark-400">
            Коментар
          </label>
        </div>
        <textarea
          name="moreInfo"
          id="moreInfo"
          cols="10"
          rows="2"
          className="w-full p-3 px-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none resize-none focus:outline-none focus:shadow-outline placeholder:text-gray-200"
        ></textarea>
      </div>
      <div className="flex justify-center mt-2">
        <button
          type="button"
          className="w-full py-2 text-sm font-medium text-white uppercase transition-colors duration-300 border px-14 bg-dark hover:bg-transparent hover:text-dark border-dark"
        >
          ОЦЕНКА НА ДОСТАВКАТА
        </button>
      </div>
    </section>
  );
}
export default DeliveryInputs;
