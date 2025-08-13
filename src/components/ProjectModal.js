import React, { useEffect } from "react";

export default function ProjectModal({ project, onClose }) {
	useEffect(() => {
		if (!project) return;
		const onKey = (e) => e.key === "Escape" && onClose();
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = prevOverflow;
		};
	}, [project, onClose]);

	if (!project) return null;

	return (
		<div
			className="modal-backdrop"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby={`h-${project.id}`}
		>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<button className="close" onClick={onClose} aria-label="Close">
					Close
				</button>

				<h2 id={`h-${project.id}`}>{project.title}</h2>
				{project.role && <div className="role">{project.role}</div>}

				{project.images?.length > 0 && (
					<div className="gallery">
						{project.images.map((src, i) => (
							<img
								key={i}
								src={src}
								alt={`${project.title} — screenshot ${i + 1}`}
								loading="lazy"
								decoding="async"
							/>
						))}
					</div>
				)}

				<div className="cols">
					<div className="body">
						<p style={{ whiteSpace: "pre-wrap" }}>{project.body}</p>
					</div>
					<div className="side">
						{project.approach?.length > 0 && (
							<>
								<h4>Approach</h4>
								<ul>
									{project.approach.map((a, i) => (
										<li key={i}>{a}</li>
									))}
								</ul>
							</>
						)}
						{project.impact?.length > 0 && (
							<>
								<h4>Impact</h4>
								<ul>
									{project.impact.map((x, i) => (
										<li key={i}>{x}</li>
									))}
								</ul>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
