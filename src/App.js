import "bootstrap/dist/css/bootstrap.min.css";
import React, { lazy, Suspense } from "react";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "./App.css";

const Test = lazy(() => import("./pages/landing/Test"));

function App() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Test />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
