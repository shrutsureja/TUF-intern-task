"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'

const baseURL = process.env.NODE_ENV === 'development' ? 'localhost:3001' : process.env.NEXT_PUBLIC_BASE_URL;
console.log(baseURL);

const Page = () => {
	const [submissions, setSubmissions] = useState([]);
	useEffect(() => { 

	}, [submissions]);
	async function fetchData() {
		try {
			const result = await axios.get(`http://${baseURL}/api/submissions`);
			console.log(result);
			if (result.status !== 200){
				console.error("error in fetching data", result);
			}
			setSubmissions(result.data.data);
			console.log(submissions);
			
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<>
			<button onClick={fetchData}> Refresh </button>
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
							</tr>
						</thead>
						<tbody>
							{submissions.map((submission : {id : string, user_id: string, preferred_language: string, stdin : string, source_code:string}, index) => {
								return (
									<tr key={index}>
										<td>{submission.id}</td>
										<td>{submission.user_id}</td>
										<td>{submission.preferred_language}</td>
										<td>{submission.stdin}</td>
										<td>{submission.source_code}</td>
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