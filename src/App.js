import React, { useMemo, useState } from "react";
import projects from "./data/projects.json";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import "./App.css";

export default function App() {
	const [selected, setSelected] = useState(null);

	// Reorder projects to lead with strategic/system-level work
	const PRIORITY = [
		"tooltip-standards",
		"status-page",
		"ia-onboarding",
		"webhook-troubleshooting",
	];
	const ordered = useMemo(() => {
		const map = new Map(PRIORITY.map((id, idx) => [id, idx]));
		return [...projects].sort((a, b) => {
			const ai = map.has(a.id) ? map.get(a.id) : 999;
			const bi = map.has(b.id) ? map.get(b.id) : 999;
			return ai - bi;
		});
	}, []);

	return (
		<div className="app">
			{/* HERO */}
			<h1>Christina Webster – Senior Content Designer</h1>
			<p className="lede">
				Content systems, product UX, and developer experience. I craft
				scalable patterns and plain-language guidance that improve
				usability and reduce support costs.
			</p>

			{/* ABOUT */}
			<section className="about">
				<h2 className="section-title">About</h2>
				<p>
					I specialise in turning fragmented UX into clear, reusable
					content systems. My sweet spot is high-stakes or complex
					experiences where language, structure, and governance make
					the difference between confusion and confidence.
				</p>
			</section>

			{/* SKILLS SNAPSHOT (optional—keep or remove) */}
			<section className="skills">
				<div className="skill">
					<h3>Content systems & governance</h3>
					<p>
						Pattern libraries, standards, content ops, scalable
						templates.
					</p>
				</div>
				<div className="skill">
					<h3>Developer & technical UX</h3>
					<p>
						Dashboards, error handling, logs, webhook flows, clear
						terminology.
					</p>
				</div>
				<div className="skill">
					<h3>High-stakes comms</h3>
					<p>
						Status pages, outage messaging, cross-channel incident
						updates.
					</p>
				</div>
			</section>

			{/* PROJECTS */}
			<h2 className="section-title">Selected work</h2>
			<div className="grid">
				{ordered.map((p) => (
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
