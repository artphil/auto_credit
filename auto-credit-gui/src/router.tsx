import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "pages/home/Home";
import LoginPage from "pages/login/Login";
import LoanPage from "pages/loan/Loan";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/consignado" element={<LoanPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router;