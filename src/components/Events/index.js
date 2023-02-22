import React, { Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import routes from "../../routes";
const Loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Content = ({ setIsAuthenticated }) => {
  return (
    <>
      <div>
        <Suspense fallback={Loading}>
          <Routes>
            {routes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              );
            })}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default React.memo(Content);
