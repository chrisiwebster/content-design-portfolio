import React, { useEffect, useState } from "react";

const withBase = (p) =>
	p ? `${process.env.PUBLIC_URL}/${String(p).replace(/^\//, "")}` : p;

export default function ProjectModal({ project, onClose }) {
	const [lightboxImg, setLightboxImg] = useState(null);

	useEffect(() => {
		if (!project) return;
		const onKey = (e) => {
			if (e.key === "Escape") {
				if (lightboxImg) {
					setLightboxImg(null);
				} else {
					onClose();
				}
			}
		};
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [project, onClose, lightboxImg]);

	if (!project) return null;

	return (
		<>
			<div
				className="modal-backdrop"
				onClick={onClose}
				role="dialog"
				aria-modal="true"
				aria-labelledby={`h-${project.id}`}
			>
				<div className="modal" onClick={(e) => e.stopPropagation()}>
					<button
						className="close"
						onClick={onClose}
						aria-label="Close"
					>
						Close
					</button>

					<h2 id={`h-${project.id}`}>{project.title}</h2>
					{project.tags?.length ? (
						<div className="role">{project.tags.join(" · ")}</div>
					) : null}

					{project.images?.length > 0 && (
						<div className="gallery">
							{project.images.map((src, i) => (
								<img
									key={i}
									src={withBase(src)}
									alt={`${project.title} — screenshot ${
										i + 1
									}`}
									loading="lazy"
									decoding="async"
									onClick={() =>
										setLightboxImg(withBase(src))
									}
									style={{ cursor: "pointer" }}
								/>
							))}
						</div>
					)}

					{/* Layout: summary spans full width; then two equal columns */}
					<div className="cols">
						{project.summary && (
							<div className="summary-block">
								<h4>Summary</h4>
								<p>{project.summary}</p>
							</div>
						)}

						<div className="col">
							{project.context && (
								<>
									<h4>Context</h4>
									<p>{project.context}</p>
								</>
							)}
							{project.role && (
								<>
									<h4>Role</h4>
									<p>{project.role}</p>
								</>
							)}
						</div>

						<div className="col">
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

			{/* Lightbox overlay */}
			{lightboxImg && (
				<div
					className="lightbox"
					onClick={() => setLightboxImg(null)}
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						background: "rgba(0, 0, 0, 0.9)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1000,
						cursor: "zoom-out",
					}}
				>
					<img
						src={lightboxImg}
						alt="Full-size preview"
						style={{
							maxWidth: "90%",
							maxHeight: "90%",
							boxShadow: "0 0 20px rgba(0,0,0,0.5)",
						}}
					/>
				</div>
			)}
		</>
	);
}
