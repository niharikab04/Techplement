
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './components/SignupPage.js';
import LoginPage from './components/LoginPage.js';
// import HomePage from './components/HomePage.js'
import Layout from './Layout.js'
import { UserContextProvider } from './UserContext.js'
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#cd5909'
        // main: '#2b6278'
      },
      secondary: {
        main: '#FFDB58'
      }
    },
    
  })
  return (
    <div className="App">
      <ThemeProvider theme={theme}>

        <UserContextProvider>
          <Router>
            <Routes>
            <Route path="/" element={<Layout/>}/>

            {/* <Route path="/" element={<HomePage/>}/> */}

              <Route path='/signup' element={<SignupPage />} />
              <Route path='/login' element={<LoginPage />} />
              
            </Routes>
          </Router>
        </UserContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
