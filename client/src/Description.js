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

	console.log(8, id);
	return (
		<div className="description-container">
			{job.title}
			{job.company}
			{job.location}
			{job.salary}
			{job.description}
		</div>
	)
};

export default Description
