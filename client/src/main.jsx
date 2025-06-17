import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
      token: {
        // colorPrimary: "#07ABA4",
        fontFamily: 'Poppins',
        fontSize: 12.5
      },
    }}
  >
    <App />

  </ConfigProvider>
)

