import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useState } from "react";
import Lander from "./components/lander/Lander";
import SubLander from "./components/lander/SubLander";
import PcBuilder from "./components/pcBuilder/PcBuilder";
import PreBuiltPc from "./components/preBuiltPc/PreBuiltPc";
import Modal from "./components/modal/Modal";

// cookies
import { useCookies } from "react-cookie";

function App() {
  const [modal, setModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  if (!cookies.hasOwnProperty("login_Data")) {
    setCookie("login_Data", {
      login: false,
      email: null,
    });
  }

  return (
    <Router>
      <div className="app">
        <Header setmodal={setModal} />
        <Lander />
        {/* <div className="divider" /> */}
        <SubLander />
        <PcBuilder />
        <PreBuiltPc />
        {modal ? <Modal setmodal={setModal} /> : null}
      </div>
    </Router>
  );
}

export default App;
