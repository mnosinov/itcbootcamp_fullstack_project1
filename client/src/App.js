import './App.css';
import Card from './components/Card';
import React, { useEffect, useState } from 'react';

function App() {
	const [jobs, setJobs] = useState([]);

	async function getJobs() {
		const res = await fetch('http://localhost:4000');
		const data = await res.json();
		setJobs(data);
	}

	useEffect( () => {
		getJobs();
	}, []);

	console.log('jobs', jobs);

  return (
		<div className="container">
			{
				jobs.map( (job) => (
					<Card key={job.id} job={job}/>
				))
			}
		</div>
  );
}

export default App;
