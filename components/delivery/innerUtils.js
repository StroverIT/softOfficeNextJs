export const changeHandler = (e, setInputs) => {
  const name = e.target.name;
  const val = e.target.value;

  setInputs((prevState) => ({
    ...prevState,
    address: { ...prevState.address, [name]: val },
  }));
};
