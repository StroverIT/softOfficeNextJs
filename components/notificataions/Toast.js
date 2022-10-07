import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD
import ProductNotif from "./ProductNotif";
const options = {
  autoClose: 4000,
  className: "text-sm text-dark",
=======

const options = {
  autoClose: 4000,
  className: "text-sm text-gray",
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  position: toast.POSITION.TOP_RIGHT,
};
const promiseOptions = {
  autoClose: -1,
  className: "",
  position: toast.POSITION.TOP_CENTER,
};
<<<<<<< HEAD
const optionsTest = {
  position: "top-right",
  autoClose: -1,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: "text-dark",
};

// export const toastProduct = (productName) => {
//   toast(<ProductNotif productName={productName} />, optionsTest);
// };
export const toastProduct = (productName) => {
  toast.success(`${productName} беше добавен успешно в количката`, options);
};

=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
export const toastPromise = (message) => {
  toast.loading(message, promiseOptions);
};
export const toastHideAll = () => {
  toast.dismiss();
};
export const toastSuccess = (message) => {
  toast.success(message, options);
};

export const toastError = (message) => {
  toast.error(message, options);
};

export const toastWarning = (message) => {
  toast.warn(message, options);
};

export const toastInformation = (message) => {
  toast.info(message, options);
};

export const toastDark = (message) => {
  toast.dark(message, options);
};

export const toastDefault = (message) => {
  toast(message, options);
};
