import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../routes/Layout.jsx";
import CreatePostRoute from "../routes/CreatePostRoute.jsx";
import PostDetailsRoute from "../routes/PostDetailsRoute.jsx";
import EditPostRoute from "../routes/EditPostRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<App />} />
        <Route index={false} path="/create" element={<CreatePostRoute />} />
        <Route index={false} path="/edit/:id" element={<EditPostRoute />} />
        <Route
          index={false}
          path="/details/:id"
          element={<PostDetailsRoute />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
