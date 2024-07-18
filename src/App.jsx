import { useCallback, useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);

  const passwordRef = useRef(null);

  // Generate Password function
  const generatePassword = useCallback(() => {
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let characters = lowerCaseLetters + upperCaseLetters;
    if (numAllowed) characters += numbers;
    if (specialCharAllowed) characters += specialCharacters;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }

    setPassword(newPassword);
  }, [length, numAllowed, specialCharAllowed, setPassword]);

  // Copy password to clipboard function
  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand("copy");
      alert("Password copied to clipboard!");
    }
  }, []);

  // Generate password on initial load and when dependencies change
  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, specialCharAllowed, generatePassword]);

  return (
    <>
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-3xl mx-auto shadow-md rounded-lg px-8 py-6 my-8 bg-gray-800 text-orange-500">
          <h1 className="text-3xl font-bold text-white text-center mb-4">
            Password Generator
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-4 bg-gray-900 text-white"
              placeholder="Generated Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="ml-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Copy
            </button>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <label className="text-white">Length:</label>
            <input
              type="range"
              min={6}
              max={64}
              value={length}
              className="cursor-pointer flex-grow bg-gray-900 text-white"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <span className="text-white">{length}</span>
          </div>

          <div className="flex items-center gap-4 mb-4 text-white">
            <input
              type="checkbox"
              checked={numAllowed}
              onChange={() => setNumAllowed(!numAllowed)}
              className="cursor-pointer"
            />
            <label>Include Numbers</label>
          </div>

          <div className="flex items-center gap-4 mb-4 text-white">
            <input
              type="checkbox"
              checked={specialCharAllowed}
              onChange={() => setSpecialCharAllowed(!specialCharAllowed)}
              className="cursor-pointer"
            />
            <label>Include Special Characters</label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
