import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "pages/home/Home";
import LoginPage from "pages/login/Login";
import LoanPage from "pages/loan/Loan";
import LogoutPage from "pages/logout/Logout";
import LoanListPage from "pages/loan/LoanList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/consignado" element={<LoanPage />} />
        <Route path="/emprestimos" element={<LoanListPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router;