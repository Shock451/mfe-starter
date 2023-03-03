import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// define a mount function to start up the app
const mount = (el) => {
  ReactDOM.render(<App />, el);
};

// if in development and in isolation, mount immediately
if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#_marketing-dev-root");
  if (el) {
    mount(el);
  }
}

// else we are running through container and we should
// export the mount function
export { mount };
