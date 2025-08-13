import React from "react";

export default function ProjectCard({ project, onClick }) {
	const cover = project.images?.[0];
	return (
		<div
			className="project-card"
			role="button"
			tabIndex={0}
			onClick={() => onClick(project)}
			onKeyDown={(e) =>
				(e.key === "Enter" || e.key === " ") && onClick(project)
			}
		>
			<div className="card-cover">
				{cover && (
					<img
						src={cover}
						alt={`${project.title} — cover`}
						loading="lazy"
						decoding="async"
					/>
				)}
			</div>
			<div className="card-title">{project.title}</div>
			<div className="card-summary">{project.summary}</div>
			<div className="tagrow">
				{(project.tags || []).map((t) => (
					<span key={t} className="tag">
						{t}
					</span>
				))}
			</div>
		</div>
	);
}
