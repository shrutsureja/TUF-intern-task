"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const baseURL = process.env.NODE_ENV === 'development' ? 'localhost:3001' : process.env.BASE_URL;

export default function Home() {
  const [username, setUsername] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [stdin, setStdin] = useState("");
  const [sourceCode, setSorurceCode] = useState("");

  const router = useRouter();

  const handleClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const data = {
      username,
      preferred_language: selectedOption,
      stdin,
      source_code: sourceCode,
    };
    try {
      const response = await axios(`http://${baseURL}/api/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      console.log(response);
      setTimeout(() => {
        router.push("/submissions");
      }, 2000);
    } catch (error) {
      
    }
    
  }

  return (
    <>
      <h1>TUF Intern Challange</h1>
      <form onSubmit={handleClick}>
        <label>
          username
          <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <br />
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="C++">C++</option>
          <option value="python">python</option>
          <option value="java">java</option>
          <option value="javascript">javascript</option>  
        </select>
        <br />
        <label>
          stdin
          <textarea name="stdin" onChange={(e) => setStdin(e.target.value)}/>
        </label>
        <br />
        <label>
          source Code
          <textarea name="stdin" onChange={(e) => setSorurceCode(e.target.value)}/>
        </label>
        <input type="submit" value="Submit" />

      </form>
    </>
  );
}
