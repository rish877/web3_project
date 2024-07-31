import React, { useState } from 'react';
import NewCard from './NewCard';
import GetImage from './GetImage';
import './parent.css'; // Import CSS for App

const App = () => {
  const [showGetImage, setShowGetImage] = useState(false);

  const handleNewCardClick = () => {
    setShowGetImage(true);
  };

  return (
    <div className="app">
      {showGetImage ? <GetImage /> : <NewCard onClick={handleNewCardClick} />}
    </div>
  );
};

export default App;
