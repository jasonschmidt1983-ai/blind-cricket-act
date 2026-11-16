import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;
const path = window.location.pathname;
if (root.hasChildNodes()) {
  hydrateRoot(root, <App path={path} />);
} else {
  createRoot(root).render(<App path={path} />);
}
