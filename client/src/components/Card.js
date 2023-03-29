import React from 'react';
import './Card.css';

const Card = ( {job, getJobs, onEditHandler} ) => {

	const deleteJob = async (id) => {
		const response = await fetch(`http://localhost:4000/${id}`, {
			method: 'DELETE',
		});
		getJobs();
	};

	return (
		<div className="card">
			<p>company { job.company }</p>
			<p>title { job.title }</p>
			<p>location { job.location }</p>
			<p>salary { job.salary }</p>
			<div>
				<button onClick={ () => deleteJob(job.id) }>delete</button>
				<button onClick={ (e) => {
						e.preventDefault();
						//e.stopPropagation();
						onEditHandler(job);
					}
				}
				>edit</button>
			</div>
		</div>
	)
};

export default Card;
