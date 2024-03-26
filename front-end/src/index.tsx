import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Root } from './pages/Root/Root';
import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Song } from './pages/Song/Song';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotFound } from './pages/NotFound/NotFound';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children:[
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "/songs/:id",
        element: <Song />
      },
      {
        path: "*",
        element: <NotFound />
      },
    ]
  },
])

const theme = createTheme({
  palette:{
    primary:{
      main: "#0c1f29"
    }
  }
})

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router}></RouterProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
