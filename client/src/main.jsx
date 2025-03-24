import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import UserLoginStore from './contexts/UserLoginStore.jsx';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <UserLoginStore>
      <App/>
    </UserLoginStore>   
  </StrictMode>
)