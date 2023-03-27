import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      salary: 120000,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl tincidunt nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl tincidunt nisl, eget aliquam nisl nisl sit amet nisl.",
    },
  ];
	res.send(jobs);
});

app.listen(4000, () => {
	console.log('Listening on port 4000');
});

app

