import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Coins from "./pages/Coins";
import CoinDetails from './pages/CoinDetails.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const backgroundImageURL = 'https://www.simplilearn.com/ice9/free_resources_article_thumb/cryptocurrency_explained.jpg';

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageURL})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh'
  };

  return (
    <div style={backgroundStyle}>
      <Coins />
    </div>

  );
}

export default App
