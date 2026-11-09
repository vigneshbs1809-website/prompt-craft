import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Toast from '@/components/shared/Toast';
import { AppProvider } from '@/context/AppContext';

import HomePage from '@/pages/HomePage';
import BuilderPage from '@/pages/BuilderPage';
import ImproverPage from '@/pages/ImproverPage';
import TemplatesPage from '@/pages/TemplatesPage';
import LearningHubPage from '@/pages/LearningHubPage';
import HistoryPage from '@/pages/HistoryPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-slate-50/60 font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
          <Header />
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/improver" element={<ImproverPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/learn" element={<LearningHubPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
          <Toast />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
