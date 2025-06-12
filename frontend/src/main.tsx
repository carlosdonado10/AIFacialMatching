import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './styles/theme.css';
import { ThemeProvider } from './components/theme-provider'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import App from './App'
import Dashboard from './pages/dashboard.tsx';
import Settings from './pages/settings.tsx';
import Requests from "./pages/requests.tsx";
import Matches from "./pages/matches.tsx";
import Identities from "./pages/identities.tsx";
import Admin from "./pages/admin.tsx";
import Upload from "./pages/upload.tsx";
import History from "./pages/history.tsx";
import SystemHealth from "./pages/systemHealth.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'settings', element: <Settings /> },
      { path: 'requests', element: <Requests /> },
      { path: 'matches', element: <Matches /> },
      { path: 'identities', element: <Identities /> },
      { path: 'admin', element: <Admin /> },
      { path: 'upload', element: <Upload /> },
      { path: 'history', element: <History /> },
      { path: 'system-health', element: <SystemHealth /> }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
