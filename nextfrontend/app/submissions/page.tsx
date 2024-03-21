"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : process.env.NEXT_PUBLIC_BASE_URL;

const Page = () => {
	const [submissions, setSubmissions] = useState([]);
	
	useEffect(() => {
		fetchData();
	}, []);

	const router = useRouter();

	async function fetchData() {
		setSubmissions([]);
		const loadingToast =  toast.loading('Fetching the data..', { duration: 1000 });
		try {
			const result = await axios.get(`${baseURL}/api/getAllSubmissions`);
			if (result.status !== 200){
				console.error("error in fetching data", result);
			}
			const data = result.data.data;
			for(let i = 0; i < data.length; i++) {
				// converting the base64 source code to normal code
				const source_code = data[i].source_code;
				const normal_code = Buffer.from(source_code, 'base64').toString('utf-8');

				data[i].source_code = normal_code;

				// Converting the timestamp to a readable format
				const initialTime = new Date(data[i].timestamp);
				initialTime.setHours(initialTime.getHours() + 5);
				initialTime.setMinutes(initialTime.getMinutes() + 30);
				data[i].timestamp = `${initialTime.toLocaleDateString()} ${initialTime.toLocaleTimeString()}`;
			}
			setSubmissions(data	);
			toast.dismiss(loadingToast);
			toast.success('Data fetched successfully...', { duration: 1000 });
		} catch (error) {
			console.error(error);
			toast.error('Error in fetching data...', { duration: 2000 });
		}
	}
	return (
		<>
			<div>
				<Toaster />
			</div>
			<button onClick={fetchData}> Refresh </button>
			<button onClick={()=> router.push('/')}>Home Page</button>
			<h1>Submissions</h1>
				<div>
					<table>
						<thead>
							<tr>
								<th>id</th>
								<th>Username</th>
								<th>Language</th>
								<th>stdin</th>
								<th>source code</th>
								<th>Time Stamp</th>
							</tr>
						</thead>
						<tbody>
							{submissions.map((submission : {id : string, user_id: string, preferred_language: string, stdin : string, source_code:string, timestamp: string}, index) => {
								return (
									<tr key={index}>
										<td>{submission.id}</td>
										<td>{submission.user_id}</td>
										<td>{submission.preferred_language}</td>
										<td>{submission.stdin}</td>
										<td><div>
											<pre>{submission.source_code.slice(0, 100)}</pre>
											<button onClick={() => {
												const blob = new Blob([submission.source_code], { type: 'text/plain' });
												const url = URL.createObjectURL(blob);
												window.open(url);
											}}>
												View Source Code
											</button>
											</div>
										</td>
										<td>{submission.timestamp}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</>
	)
}
export default Page;