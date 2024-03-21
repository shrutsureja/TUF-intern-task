"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import UnderDevelopment from "./components/underDevelopment";

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : process.env.NEXT_PUBLIC_BASE_URL;

const languages = ["C++", "python", "java", "javascript"];

export default function Home() {
  
	const [username, setUsername] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [stdin, setStdin] = useState("");
	const [sourceCode, setSorurceCode] = useState("");

	const router = useRouter();
	
	const handleClick = async (e: { preventDefault: () => void; }) => {
		// check if the data is empty or not
		if(username === "" || selectedOption === "" || stdin === "" || sourceCode === "") {
			toast.error('Please fill all the fields...', { duration: 2000 });
			return;
		}
		if (username.split(" ").length > 1) {
			toast.error('Username should not contain spaces...', { duration: 2000 });
			return;
		}

		const loadingToast =  toast.loading('Submitting the data..', { duration: 500 });
		e.preventDefault();
		const base64SourceCode = btoa(sourceCode);
		// const base64Stdin = btoa(stdin);
		// console.log(base64SourceCode, base64Stdin);
		
		// trying to convert the source code to base64
		const data = {
			username,
			preferred_language: selectedOption,
			stdin,
			source_code: base64SourceCode,
		};


		try {
			const response = await axios(`${baseURL}/api/submitCodeSnippet`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				data: JSON.stringify(data),
			});
			if(response.status === 200 && response.data.status === 200) {
				toast.dismiss(loadingToast);
				toast.success('Data submitted successfully...', { duration: 2000 });
				setTimeout(() => {
					router.push("/submissions");
				}, 1000);
			}
			else {
				console.error("error in fetching data", response);
				toast.dismiss(loadingToast);
				toast.error('Error in submitting data...', { duration: 2000 });
			}
			
		} catch (error) {
			console.error(error);
			toast.dismiss(loadingToast);
			toast.error('Error in submitting data...', { duration: 2000 });
		}
	}

	return (
	<>
		<UnderDevelopment/>
		<br/>
		<br/>
		<div>
			<Toaster />
		</div>	
		<h1>TUF Intern Challange</h1>
		<button onClick={() => router.push('/submissions')}>Go to Submissions Page </button>
		<br/>
		<br />
		<form onSubmit={handleClick}>
			<label>
				username
				<input type="text" name="username" onChange={(e) => setUsername(e.target.value)} required/>
			</label>
			<br />
			<select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} required>
				<option value="">Select Language</option>
				{languages.map((language, index) => {
					return (
						<option value={language} key={index}>{language}</option>
					)
				})}
			</select>
			<br />
			<label>
				stdin
				<textarea name="stdin" onChange={(e) => setStdin(e.target.value)} required/>
			</label>
			<br />
			<label>
				source Code
				<textarea name="stdin" onChange={(e) => setSorurceCode(e.target.value)} required/>
			</label>
			<input type="submit" value="Submit" />
		</form>
	</>
  );
}
