import Toast from "react-native-toast-message";

import { ToastProps } from "../models/models";

export const showToast = ({ title, description, type }: ToastProps) => {
  Toast.show({
    type: type,
    text1: title,
    text2: description,
  });
};
