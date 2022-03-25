import { useEffect, VFC } from "react";
import Close from "../../../assets/close.svg";
import {
  errorToastContent,
  closeIconContainer,
  errorMessage,
} from "./ErrorToast.css";

type ErrorToastProps = {
  message: string;
  closeHandler: () => void;
};

export const ErrorToast: VFC<ErrorToastProps> = ({ message, closeHandler }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      closeHandler();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [closeHandler]);

  return (
    <div className={errorToastContent}>
      <Close className={closeIconContainer} onClick={closeHandler} />
      <p className={errorMessage}>{message}</p>
    </div>
  );
};
