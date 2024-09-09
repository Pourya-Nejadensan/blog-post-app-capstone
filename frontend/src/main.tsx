import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "./theme/theme.tsx";
import {CssBaseline} from "@mui/material";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={ theme }>
          <CssBaseline />
          <App />
      </ThemeProvider>
  </StrictMode>,
)
