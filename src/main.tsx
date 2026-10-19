import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import QuizPage from './pages/QuizPage'
import AdminDrawPage from './pages/AdminDrawPage'
import AdminGate from './components/AdminGate'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route
          path="/admin-losowanie"
          element={
            <AdminGate>
              <AdminDrawPage />
            </AdminGate>
          }
        />
        <Route path="*" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
