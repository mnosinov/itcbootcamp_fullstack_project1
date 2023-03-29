import './App.css';
import Card from './components/Card';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

function App() {
	const [jobs, setJobs] = useState([]);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [company, setCompany] = useState("");
	const [location, setLocation] = useState("");
	const [salary, setSalary] = useState(0);
	const [description, setDescription] = useState("");
	const [id, setId] = useState("");
	const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
	const [editMode, setEditMode] = useState(false);

	const customStyles = {
		content: {
			display: 'flex',
			flexDirection: 'column',
			top: '50%',
			left: '50%',
			right: 'auto',
			width: '70%',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	useEffect(() => {
		setButtonIsDisabled(!(company.trim() && title.trim() && location.trim() && salary > 0 && description.trim()));
	}, [title, company, location, salary, description]);

	Modal.setAppElement('body');

  function openModal() {
		setEditMode(false);
    setIsOpen(true);
  }

  function closeModal() {
		clearInputs();
    setIsOpen(false);
  }

	async function getJobs() {
		const res = await fetch('http://localhost:4000');
		const data = await res.json();
		setJobs(data);
	}

	useEffect( () => {
		getJobs();
	}, []); // array is empty - so it will be executed only once after dom content had been loaded.

	const onSaveHandler = async () => {
		const job = { title, company, location, salary, description }; // if key is equal to value - than we can specify only key
		await fetch("http://localhost:4000", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(job)
		});
		getJobs();
		closeModal();
		clearInputs();
	};

	const onEditSaveHandler = async () => {
		const job = { title, company, location, salary, description };
		await fetch(`http://localhost:4000/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(job)
		});
		getJobs();
		closeModal();
		clearInputs();
	};

	function clearInputs() {
		setCompany('');
		setTitle('');
		setLocation('');
		setSalary(0);
		setDescription('');
	}

	function onEditHandler(job) {
		setCompany(job.company);
		setTitle(job.title);
		setLocation(job.location);
		setSalary(job.salary);
		setDescription(job.description);
		setId(job.id);
		setEditMode(true);
		setIsOpen(true);
	}

	console.log('jobs', jobs);

  return (
		<div className="container">
			<Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Job Modal"
      >
				<h2>{editMode ? 'Edit job' : 'Add a job'}</h2>
				<div className="modal-inputs">
					<input onChange={(e) => setCompany(e.target.value)} value={company} type="text" placeholder="company" />
					<input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="title" />
					<input onChange={(e) => setLocation(e.target.value)} value={location} type="text" placeholder="location" />
					<input onChange={(e) => setSalary(e.target.value)} value={salary} type="number" placeholder="salary" />
					<textarea placeholder="description" onChange={(e) => setDescription(e.target.value)} value={description} />
					<button onClick={editMode ? onEditSaveHandler : onSaveHandler} disabled={buttonIsDisabled}>{editMode ? 'Save' : 'Add'}</button>
				</div>
      </Modal>
			<button onClick={openModal}>add job</button>

			<div className="cards">
				{
					jobs.map( (job) => (
						<Link to={`/${job.id}`} key={job.id}>
							<Card key={job.id} job={job} getJobs={getJobs} onEditHandler={onEditHandler} />
						</Link>
					))
				}
			</div>
		</div>
  );
}

export default App;
