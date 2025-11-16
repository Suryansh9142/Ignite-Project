import React, { useState } from "react";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import Welcome from "./welcome";
import PG from "./pg";
import Hospital from "./Hospital";
import Restaurant from "./Restaurant";

function App() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);

  if (page === "dashboard") return <Home setPage={setPage} />;
  if (page === "login") return <Login setPage={setPage} setUser={setUser} />;
  if (page === "register") return <Register setPage={setPage} />;
  if (page === "welcome") return <Welcome user={user} setPage={setPage} />;
  if (page === "pg") return <PG user={user} setPage={setPage} />;
  if (page === "hospital") return <Hospital user={user} setPage={setPage} />;
  if (page === "restaurant") return <Restaurant user={user} setPage={setPage} />;

  return null;
}

export default App;