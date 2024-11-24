import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import ig_icon from '../Assets/insta.png';
import reload from '../Assets/reload.png';

export const RandomQuote = () => {
  // State for storing the current quote
  const [quote, setQuote] = useState({
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Johann Wolfgang von Goethe",
  });

  // Function to fetch a random quote
  const fetchQuote = async () => {
    try {
      const response = await fetch("https://quoteslate.vercel.app/api/quotes/random");
      const data = await response.json();
      setQuote({ text: data.quote, author: data.author });
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    }
  };

  // Load a quote when the component mounts
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="container">
      <div className="quote">{quote.text}</div>
      <div>
        <div className="line"></div>
        <div className="bottom">
          <div className="author">{quote.author || "Unknown"}</div>
          <div className="icons">
            <img
              src={reload}
              onClick={fetchQuote}
              alt="Reload"
              className="resized-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
