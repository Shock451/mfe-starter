import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

// define a mount function to start up the app
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el)
};

// if in development and in isolation, mount immediately
if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#_dashboard-dev-root");
  if (el) {
    mount(el);
  }
}

// else we are running through container and we should
// export the mount function
export { mount };
