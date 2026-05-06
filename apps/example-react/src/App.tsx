import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { WebApiProvider } from '@ohdsi/webapi-sdk/react';
import Sources from './pages/Sources';
import Cohorts from './pages/Cohorts';
import VocabularySearch from './pages/VocabularySearch';

const baseUrl = import.meta.env.VITE_WEBAPI_BASE_URL ?? 'http://localhost:8080';

const navItems = [
  { label: 'Sources', to: '/sources' },
  { label: 'Cohorts', to: '/cohorts' },
  { label: 'Vocabulary Search', to: '/vocabulary' },
];

export default function App() {
  return (
    <WebApiProvider config={{ baseUrl }}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-ohdsi-blue text-white shadow">
            <div className="max-w-5xl mx-auto px-4 flex items-center gap-6 h-14">
              <span className="font-bold text-lg">OHDSI WebAPI</span>
              <span className="text-blue-200 text-sm">React Example</span>
              <nav className="flex gap-1 ml-4">
                {navItems.map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                        isActive ? 'bg-white/20' : 'hover:bg-white/10'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </header>
          <main className="max-w-5xl mx-auto px-4 py-8">
            <Routes>
              <Route index element={<Navigate to="/sources" replace />} />
              <Route path="/sources" element={<Sources />} />
              <Route path="/cohorts" element={<Cohorts />} />
              <Route path="/vocabulary" element={<VocabularySearch />} />
              <Route path="*" element={<Navigate to="/sources" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </WebApiProvider>
  );
}
