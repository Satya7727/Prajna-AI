import React, { useState } from "react";
import "./styles/App.css";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponseText("");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Prajna?prompt=${encodeURIComponent(prompt)}`);
      const data = await res.json();
      setResponseText(data.responseText.trimStart());
    } catch (err) {
      setResponseText("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">Prajna</h1>

      <form className="question-form" onSubmit={handleAsk}>
        <label htmlFor="prompt" className="visually-hidden">Ask your question</label>
        <input
          type="text"
          id="prompt"
          name="prompt"
          value={prompt}
          placeholder="Ask your question here..."
          onChange={(e) => setPrompt(e.target.value)}
          required
          autoComplete="off"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask Prajna"}
        </button>
      </form>

      {responseText && (
        <>
          <h2 className="response-heading">Uttara:</h2>
          <div className="response-box">
            <pre>{responseText}</pre>
          </div>
        </>
      )}

      <footer className="footer">Made with 💜</footer>
    </div>
  );
}
