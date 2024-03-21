"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";


const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : process.env.NEXT_PUBLIC_BASE_URL;
console.log(baseURL);

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
			console.log(result);
			if (result.status !== 200){
				console.error("error in fetching data", result);
			}
			setSubmissions(result.data.data);
			console.log(submissions);
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
										<td>{submission.source_code}</td>
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