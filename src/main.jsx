import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Analytics />
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#222",
              color: "white",
            },
          },
          error: {
            style: {
              background: "#222",
              color: "white",
            },
          },
          loading: {
            style: {
              background: "#222",
              color: "white",
            },
          },
        }}
      />
    </Provider>
  </BrowserRouter>,
);
