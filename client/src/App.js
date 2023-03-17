import React, { Suspense, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { LoginOrRegister } from "./Component/LoginRegister/LoginOrRegister";
import SupportChat from "./Component/SupportChat/SupportChat";
import { ProtectedRoute } from "./protectedRoute";
import Robot from "./Images/Robot.png";

const ChatBot = React.lazy(() => import("./Component/ChatBot"));

function App() {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown(true);
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense
            fallback={
              <div className="loader-wrapper">
                <div className="loder-crcil"></div>
                <div className="text">Loading ...</div>
              </div>
            }
          >
            <div className="container" onClick={handleClick}>
              <div className="d-flex align-items-center justify-content-center border rounded mx-auto w-50 mt-3 bg-secondary position-relative">
                <div className="w-100 bg-light rounded m-2 header">
                  <div className="bg-dark text-white rounded-top p-2">
                    <div className="row mt-2 ms-2">
                      <div className="col-sm-2 position-relative">
                        <img
                          src={Robot}
                          className="imgBlock border-circle"
                          alt="robot"
                        />
                      </div>
                      <div className="col-sm-8">
                        <p className="textSpacing"> Click to talk to ChatBot</p>
                        {/* <p>{subheading}</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isShown && <ChatBot />}
          </Suspense>
        }
      />
      <Route path="/login" element={<LoginOrRegister route="SignIn" />} />
      <Route path="/register" element={<LoginOrRegister route="SignUp" />} />
      <Route
        path="/support/chat"
        element={
          <ProtectedRoute>
            <SupportChat />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
