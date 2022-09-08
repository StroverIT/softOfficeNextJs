function IsComponent({ state, setState, onText, offText }) {
  return (
    <button
      onClick={() => setState(!state)}
      className={`px-5 py-1 transition-transform border rounded-full text-semibold ${
        !state ? "border-green text-green" : "border-secondary text-secondary"
      } hover:-translate-y-1`}
      type="button"
    >
      {" "}
      {!state ? onText : offText}{" "}
    </button>
  );
}

export default IsComponent;
