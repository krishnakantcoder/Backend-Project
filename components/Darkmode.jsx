import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
  // Check localStorage for theme preference
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  // Apply theme to body
  useEffect(() => {
    document.body.className =
      theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";
    localStorage.setItem("theme", theme); // Save theme preference
  }, [theme]);

  return (
    <div className="container text-center mt-3">
      <button
        className="btn btn-primary"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙 Enable Dark Mode" : "☀️ Enable Light Mode"}
      </button>
    </div>
  );
};

export default DarkModeToggle;
