import React from "react";

const withBase = (p) =>
	p ? `${process.env.PUBLIC_URL}/${String(p).replace(/^\//, "")}` : p;

export default function ProjectCard({ project, onClick }) {
	const cover = project.cover || project.images?.[0];
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
						src={withBase(cover)}
						alt={`${project.title} — cover`}
						loading="lazy"
						decoding="async"
					/>
				)}
			</div>
			<div className="card-title">{project.title}</div>
			<div className="card-summary">{project.description}</div>
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
