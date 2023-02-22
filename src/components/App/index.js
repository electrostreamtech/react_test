import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "../Login";
import Dashboard from "../Events";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem("is_authenticated")));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              exact
              path="/login"
              name="Login Page"
              element={
                !isAuthenticated ? (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              exact
              path="*"
              name="Home"
              element={
                isAuthenticated ? (
                  <Dashboard setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
