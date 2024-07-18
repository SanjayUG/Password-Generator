import { useCallback, useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);

  const passwordRef = useRef(null);

  // generates Password
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

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    document.execCommand("copy");
    alert("Password copied to clipboard!");
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, specialCharAllowed, generatePassword]);

  return (
    <>
      <div className="w-full max-w-3xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-900 text-white">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-gray-800 text-white"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-1 rounded-lg"
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm text-white gap-x-2 mb-4">
          <div className="flex items-center gap-x-1">
            <label>Length: {length}</label>
            <input
              type="range"
              min={6}
              max={64}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-x-2 mb-4 text-white">
          <input
            type="checkbox"
            checked={numAllowed}
            onChange={() => setNumAllowed(!numAllowed)}
          />
          <label>Include Numbers</label>
        </div>

        <div className="flex items-center gap-x-2 mb-4 text-white">
          <input
            type="checkbox"
            checked={specialCharAllowed}
            onChange={() => setSpecialCharAllowed(!specialCharAllowed)}
          />
          <label>Include Special Characters</label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;
