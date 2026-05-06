import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WebApiProvider } from '@ohdsi/webapi-sdk/react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Sources from './pages/Sources';
import Cohorts from './pages/Cohorts';
import VocabularySearch from './pages/VocabularySearch';
import ConceptSets from './pages/ConceptSets';

const baseUrl = import.meta.env.VITE_WEBAPI_BASE_URL ?? 'http://localhost:8080';

export default function App() {
  return (
    <WebApiProvider config={{ baseUrl }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="sources" element={<Sources />} />
            <Route path="cohorts" element={<Cohorts />} />
            <Route path="vocabulary" element={<VocabularySearch />} />
            <Route path="concept-sets" element={<ConceptSets />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WebApiProvider>
  );
}
