import express from 'express';
import { v4 as uuid4 } from 'uuid';

const app = express();

const jobs = [
	{
		id: uuid4(), title: "Software Engineer", company: "Google", location: "Mountain View, CA", salary: 120000, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl tincidunt nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl tincidunt nisl, eget aliquam nisl nisl sit amet nisl.",
	},
	{
		id: uuid4(), title: "Senior Application Engineer", company: "Microsoft", location: "Vancuver", salary: 620000, description: "Sit porro rerum unde magni sequi dolores, saepe. Sapiente rem autem qui ducimus commodi. Architecto voluptatem maiores perspiciatis officiis neque. Inventore at aliquid architecto quas suscipit Doloribus delectus commodi quod"
	}
];

app.use(express.json());

// all jobs
app.get('/', (req, res) => {
	res.send(jobs);
});

// add new job
app.post('/', (req, res) => {
	const job = req.body;
	job.id = uuid4();
	jobs.push(job);
	res.send(job);
});

// get job
app.get('/:id', (req, res) => {
	const id = req.params.id;
	const job = jobs.find( (job) => job.id == id );
	res.send(job);
});

// update job
app.put('/:id', (req, res) => {
	const { id } = req.params;
	const job = req.body;
	job.id = id;
	const index = jobs.findIndex( (job) => job.id == id );
	jobs[index] = job;
	res.send(job);
});

// delete job
app.delete('/:id', (req, res) => {
	const { id } = req.params;
	const index = jobs.findIndex( (job) => job.id == id );
	jobs.splice(index, 1);
	res.send(jobs);
});

app.listen(4001, () => {
	console.log('Listening on port 4001');
});

app

