import React from 'react';
import './NewCard.css'; // Import CSS for NewCard

const NewCard = ({ onClick }) => {
  return (
    <div className="new-card" onClick={onClick}>
      <div className="new-card-content">
        <h2>View Uploaded Image</h2>
        {/* <p>Click here to upload and view images with Web3 security.</p> */}
      </div>
    </div>
  );
};

export default NewCard;
