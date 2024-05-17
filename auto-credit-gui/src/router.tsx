import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "pages/home/Home";
import LoanPage from "pages/loan/Loan";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/consignado" element={<LoanPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router;