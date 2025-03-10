Password Generator 

Aim: This project is very important and for undertanding the concept of conditional rendering, dependencies, useEffect, useRef, useState, useCallback. 

Project Overview

This is a simple Password Generator built using React with Tailwind CSS for styling. It allows users to:

Adjust the password length using a slider.

Include numbers and special characters through checkboxes.

Generate random passwords dynamically.

Copy the generated password to the clipboard.

Code Explanation

Import Statements

"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'

"use client": Ensures the component runs on the client side (Next.js specific).

React hooks:

useState: Manages component states (password length, character/number inclusion, and the generated password).

useRef: Creates a reference to access DOM elements directly (used for copying the password).

useCallback: Optimizes functions by memoizing them.

useEffect: Triggers password generation when dependencies change.

State Initialization

const [length, setLength] = useState(8);
const [numberAllowed, setNumberAllowed] = useState(false);
const [charAllowed, setCharAllowed] = useState(false);
const [password, setPassword] = useState("");
const passwordRef = useRef(null)

length: Sets the default password length to 8.

numberAllowed: Tracks if numbers are allowed in the password.

charAllowed: Tracks if special characters are allowed.

password: Stores the generated password.

passwordRef: Points to the password input field for clipboard copying.

Copy Password to Clipboard

const CopyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0, 100) // optional
  window.navigator.clipboard.writeText(password)
}, [password])

select(): Highlights the password in the input field.

setSelectionRange(): Sets the selection range — optional step for better UX.

writeText(): Copies the selected text to the clipboard.

useCallback: Ensures the function isn't recreated unnecessarily.

Password Generator Logic

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

str: Initializes with alphabets (A-Z, a-z).

if statements: Adds numbers and special characters based on user selection.

for loop: Iterates through the desired length, picking random characters.

Math.random(): Generates a random index to get a character from the string.

setPassword(): Updates the password state.

Trigger Password Generation

useEffect(() => {
  passwordGenerator();
}, [length, numberAllowed, charAllowed, passwordGenerator]);

useEffect: Calls passwordGenerator whenever dependencies (length, numberAllowed, charAllowed) change.

UI Components

<div className="w-[90%] max-w-[600px] bg-gray-700 rounded-lg p-6 flex flex-col gap-y-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg">

Tailwind CSS classes:

w-[90%] max-w-[600px]: Sets the width.

bg-gray-700 rounded-lg: Background and border radius.

p-6 flex flex-col gap-y-4: Padding and vertical flex gap.

absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2: Centers the div.

shadow-lg: Adds a box shadow.

Password Input and Copy Button

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

input: Displays the generated password.

readOnly: Prevents user edits.

ref: Connects input to passwordRef.

button: Copies the password to clipboard on click.

Controls (Length, Characters, Numbers)

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

slider: Adjusts password length.

onChange: Updates length state.

<label className="flex items-center gap-x-1">
  <input
    type="checkbox"
    checked={charAllowed}
    className="cursor-pointer w-4 h-4"
    onChange={() => setCharAllowed((prev) => !prev)}
  />
  <span className="text-white font-semibold">Character</span>
</label>

checkbox: Toggles special character inclusion.

<label className="flex items-center gap-x-1">
  <input
    type="checkbox"
    checked={numberAllowed}
    className="cursor-pointer w-4 h-4"
    onChange={() => setNumberAllowed((prev) => !prev)}
  />
  <span className="text-white font-semibold">Number</span>
</label>

checkbox: Toggles number inclusion.




   No Copyright © 2025 Abhineet Singh.  

This project is open for learning purposes. Feel free to use, modify, and share the code. The goal is to help freshers and beginners learn and grow. Happy coding! 

