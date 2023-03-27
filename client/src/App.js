import './App.css';

function App() {
	async function getJobs() {
		const res = await fetch('http://localhost:4000');
		const data = await res.json();
		console.log(data);
	}
	getJobs();
  return (
		<div className="container">
			gw
		</div>
  );
}

export default App;
