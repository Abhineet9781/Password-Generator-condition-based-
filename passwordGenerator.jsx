"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'

const PasswordGeneratorApp = () => {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)


  const CopyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100) // optional 
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#$%&()*";
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);


  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);


  return (
    <div className="w-[90%] max-w-[600px] bg-gray-700 rounded-lg p-6 flex flex-col gap-y-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
      <div className="flex w-full">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
          className="flex-grow h-12 text-black text-sm pl-3 outline-none rounded-l-lg"
        />
        <button className="bg-blue-600 text-white h-12 w-[100px] rounded-r-lg hover:bg-blue-700 transition" onClick={CopyPasswordToClipboard}>
          Copy
        </button>
      </div>

      <div className="flex items-center justify-between text-sm gap-x-4">
        <label className="flex items-center gap-x-1">
          <span className="text-white font-semibold">Length: {length}</span>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer h-2 w-[120px]"
            onChange={(e) => setLength(e.target.value)}
          />
        </label>

        <label className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={charAllowed}
            className="cursor-pointer w-4 h-4"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <span className="text-white font-semibold">Character</span>
        </label>

        <label className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            className="cursor-pointer w-4 h-4"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <span className="text-white font-semibold">Number</span>
        </label>
      </div>
    </div>
  )
}

export default PasswordGeneratorApp
