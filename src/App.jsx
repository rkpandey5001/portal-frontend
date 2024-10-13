import Navbar from "./components/shared/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Browse from "./components/Browse";
import Jobs from "./components/Jobs";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import UpdateProfileDialouge from "./components/UpdateProfileDialouge";
import Companies from "./components/Companies";
import CompaniesJobs from "./components/CompaniesJobs";
import CompaniesCreate from "./components/admin/CompaniesCreate";
import UpdateCompanyInfo from "./components/admin/UpdateCompanyInfo";
import AdminJobs from "./components/admin/AdminJobs";
import UpdateAdminJobs from "./components/admin/UpdateAdminJobs";
import AdminJobsCreate from "./components/admin/AdminJobsCreate";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Message from "./components/Message";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/message" element={<Message />} />
          <Route path="/description/:id" element={<JobDescription />} />
          <Route path="/updateprofile" element={<UpdateProfileDialouge />} />
          <Route
            path="/admin/companies"
            element={<ProtectedRoute>{<Companies />}</ProtectedRoute>}
          />
          <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/admin/companies/create" element={<CompaniesCreate />} />
          <Route path="/admin/jobs/create" element={<AdminJobsCreate />} />
          <Route path="/admin/companies/:id" element={<UpdateCompanyInfo />} />
          <Route path="/admin/jobs/:id" element={<UpdateAdminJobs />} />
          <Route path="/admin/jobs/:id/applicants" element={<Applicants />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
