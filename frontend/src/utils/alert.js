import Swal from "sweetalert2";
import whithReactContent from "sweetalert2-react-content";

export const showAlert = (message, icon, focus = "") => {
  onfocus(focus);
  const MyAlert = whithReactContent(Swal);
  MyAlert.fire({
    title: message,
    icon,
  });
};

export const showConfirDeleteDialog = (message) => {
  const MyAlert = whithReactContent(Swal);
  return MyAlert.fire({
    title: "",
    text: message,
    icon: ALERT_ICON.Question,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
  })
};

export const ALERT_ICON = {
  Success: "success",
  Error: "error",
  Warning: "warning",
  Info: "info",
  Question: "question",
};

const onfocus = (focus) => {
  if (focus != "") {
    document.getElementById(focus).focus();
  }
};
