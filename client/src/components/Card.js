import React from 'react';
import './Card.css';

const Card = ( {job} ) => {

	const deleteJob = async (id) => {
		const response = await fetch(`http://localhost:4000/${id}`, {
			method: 'DELETE',
		});
		const data = await response.json();
		console.log(data);

	};

	return (
		<div className="card">Card!
			<p>company { job.company }</p>
			<p>title { job.title }</p>
			<p>location { job.location }</p>
			<p>salary { job.salary }</p>
			<div>
				<button onClick={ () => deleteJob(job.id)}>delete</button>
				<button>edit</button>
			</div>
		</div>
	)
};

export default Card;
