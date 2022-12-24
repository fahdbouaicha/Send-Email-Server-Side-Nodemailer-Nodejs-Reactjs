import SendEmailForm from "./features/SendEmailForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <SendEmailForm />
      <ToastContainer />
    </>
  );
}

export default App;
