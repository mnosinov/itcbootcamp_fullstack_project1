import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Description.css';

const Description = () => {
	const { id } = useParams();
	const [job, setJob] = useState({});

	async function getJob() {
		const response = await fetch(`http://localhost:4000/${id}`);
		const data = await response.json();
		setJob(data);
	}

	useEffect( () => {
		getJob();
	}, [id]);

	return (
		<div className="description-container">
			<p>{job.title}</p>
			<p>{job.company}</p>
			<p>{job.location}</p>
			<p>{job.salary}</p>
			<p>{job.description}</p>
		</div>
	)
};

export default Description
