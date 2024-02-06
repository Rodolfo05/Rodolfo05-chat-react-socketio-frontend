import { BrowserRouter, useNavigate } from "react-router-dom";
import { Chat } from "./components/Chat"
import { Login } from "./components/Login";
import { AppRouter } from "./router/AppRouter";

export const App = () => {

  return (
    <>

      <AppRouter />
      <Login />
    </>
  );

}
