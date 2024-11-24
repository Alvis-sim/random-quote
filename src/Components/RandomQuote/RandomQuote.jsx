import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import reload from '../Assets/reload.png';
import twitter_icon from '../Assets/twitter-dark.svg'

export const RandomQuote = () => {
  const [quote, setQuote] = useState({
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Johann Wolfgang von Goethe",
  });

  // Fetch a random quote
  const fetchQuote = async () => {
    try {
      const response = await fetch("https://quoteslate.vercel.app/api/quotes/random");
      const data = await response.json();
      setQuote({ text: data.quote, author: data.author });
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    }
  };

  // Load initial quote on mount
  useEffect(() => {
    fetchQuote();
  }, []);

  // Text-to-Speech function
  const speakQuote = () => {
    const utterance = new SpeechSynthesisUtterance(quote.text + " by " + (quote.author || "Unknown"));
    speechSynthesis.speak(utterance);
  };

  const twitter = () => {
    const tweetText = encodeURIComponent(`${quote.text} - ${quote.author || "Unknown"}`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank");
  };
  
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
              title="Generate quote"
            />
            <button onClick={speakQuote} className="speak-button" title="Hear quote">🔊 Speak</button>
            <img
              src={twitter_icon}
              onClick={()=>{twitter()}}
              alt="twitter"
              className="resized-image"
              title="Share on Twitter"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
