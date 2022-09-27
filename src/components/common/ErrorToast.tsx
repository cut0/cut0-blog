import { useEffect, FC } from "react";
import { CloseSvgIcon } from "../icons/TwitterSvgIcon copy";
import {
  errorToastContent,
  closeIconContainer,
  errorMessage,
} from "./ErrorToast.css";

type ErrorToastProps = {
  message: string;
  closeHandler: () => void;
};

export const ErrorToast: FC<ErrorToastProps> = ({ message, closeHandler }) => {
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
      <CloseSvgIcon
        className={closeIconContainer}
        title="close"
        onClick={closeHandler}
      />
      <p className={errorMessage}>{message}</p>
    </div>
  );
};
