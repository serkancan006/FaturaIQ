import toast, { Toaster, ToastPosition } from "react-hot-toast";

// Toast mesajı gösteren fonksiyon
const messageHot = (
  message: string,
  hotToastrOptions: Partial<HotToastrOptionsType>
) => {
  toast(message, hotToastrOptions);
};

// Tüm toast mesajlarını kapatma fonksiyonu
const dismissAllHot = () => {
  toast.dismiss();
};

// Toast seçenekleri tipi
type HotToastrOptionsType = {
  type: "success" | "error";
  position?: ToastPosition;
};

// Toastify Container bileşeni
export const HotToastContainer = () => {
  return <Toaster position="top-center" reverseOrder={false} />;
};

export type { HotToastrOptionsType }

const NotifyService = {
  messageHot,
  dismissAllHot
}

export default NotifyService
