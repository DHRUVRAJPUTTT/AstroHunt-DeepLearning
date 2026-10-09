import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { ToastContainer } from './components/ui/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { HistoryPage } from './pages/HistoryPage';
import { PerformancePage } from './pages/PerformancePage';
import { ResearchPage } from './pages/ResearchPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Dashboard Routes with Sidebar */}
        <Route path="/dashboard" element={<Sidebar />}>
          <Route index element={<DashboardPage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="upload" element={<Navigate to="/dashboard/analysis" replace />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="research" element={<ResearchPage />} />
        </Route>
        
        {/* Standalone Research Page without sidebar */}
        <Route path="/research" element={
          <div className="min-h-screen bg-[#080B18] pt-24 px-4 sm:px-6 lg:px-8">
            <ResearchPage />
          </div>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
