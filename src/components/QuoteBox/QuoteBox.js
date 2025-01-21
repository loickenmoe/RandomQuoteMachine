import React, { useState, useEffect } from "react";
import "../../styles/app.css";
import { FaTwitter, FaTumblr, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import axios from "axios";

function QuoteBox() {
  // State variables for the quote text, author, background color, and text color
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");

  // Fetch a random quote when the component is first rendered
  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      const data = response.data;
      console.log(response);

      // Vérifie le statut et sélectionne une citation aléatoire
      if (data) {
        const randomIndex = Math.floor(Math.random() * data.quotes.length);
        const randomQuote = data.quotes[randomIndex];

        // Mets à jour l'état avec les informations de la citation
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author); // Nom de l'auteur

        // Change the background color and text color
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
          16
        )}`;
        setBgColor(randomColor);
        setTextColor(randomColor);

        console.log("Citation:", randomQuote.citation);
        console.log("Auteur:", randomQuote.infos.auteur);
        console.log("Détails supplémentaires:", randomQuote.infos);
      } else {
        console.error("Statut incorrect dans le fichier JSON");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des citations:", error);
    }
  };
  // Handler function for fetching a new quote
  const handleNewQuote = () => {
    fetchRandomQuote();
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
        minHeight: "100vh",
        paddingTop: "20px",
      }}
    >
      <div
        id="quote-box"
        className="quote-box"
        style={{ backgroundColor: "#ffffff", color: textColor }}
      >
        {/* Display the current quote text */}
        <p id="text" style={{ fontWeight:'bold' }}>
          <FaQuoteLeft /> {quote} <FaQuoteRight />
        </p>
        {/* Display the current author name */}
        <p id="author">- {author}</p>
        <div className="quote-actions">
          {/* Links to social network */}
          <div style={{ display: "flex", gap: "10px" }}>
            <a
              id="tweet-quote"
              href="https://twitter.com/intent/tweet"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: textColor, color: "#ffffff" }}
            >
              <FaTwitter />
            </a>
            <a
              id="tumblr-quote"
              href="https://www.tumblr.com/widgets/share/tool"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: textColor, color: "#ffffff" }}
            >
              <FaTumblr />
            </a>
          </div>
          {/* Button to fetch a new quote */}
          <button
            id="new-quote"
            onClick={handleNewQuote}
            style={{ backgroundColor: textColor, color: "#ffffff" }}
          >
            New Quote
          </button>
        </div>
      </div>
      <p style={{color: 'white', fontWeight:'bold'}}>By Loïc.K</p>
    </div>
  );
}

export default QuoteBox;
