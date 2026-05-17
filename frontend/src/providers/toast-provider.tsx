import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position={"top-right"}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1B3022",
          color: "#fff",
          borderRadius: "12px",
          fontSize: "14px",
        },
      }}
    />
  );
}
