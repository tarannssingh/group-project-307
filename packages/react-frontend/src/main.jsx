import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
root.render(<App />);