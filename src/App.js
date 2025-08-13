import React, { useState } from "react";
import projects from "./data/projects.json";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import "./App.css";

export default function App() {
	const [selected, setSelected] = useState(null);

	return (
		<div className="app">
			<h1>Christina Webster – Senior Content Designer</h1>
			<p className="lede">
				I design content systems and product copy that help merchants
				and developers move faster — from outage communications and
				navigation changes to developer troubleshooting and design
				standards.
			</p>

			<div className="grid">
				{projects.map((p) => (
					<ProjectCard key={p.id} project={p} onClick={setSelected} />
				))}
			</div>

			<ProjectModal
				project={selected}
				onClose={() => setSelected(null)}
			/>
		</div>
	);
}
