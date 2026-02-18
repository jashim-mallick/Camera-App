"use client";

import { useRef, useState } from "react";
import Webcam from "react-webcam";

const MobileCamera = () => {
	const webcamRef = useRef<Webcam>(null);
	const [open, setOpen] = useState(false);

	const capture = () => {
		const imageSrc = webcamRef.current?.getScreenshot();
		console.log(imageSrc);
	};

	return (
		<div>
			{/* Open Button */}
			{!open && <button onClick={() => setOpen(true)}>Open Camera</button>}

			{/* Camera UI */}
			{open && (
				<div>
					<Webcam
						ref={webcamRef}
						audio={false}
						screenshotFormat="image/jpeg"
						videoConstraints={{ facingMode: "environment" }}
						style={{ width: "100%" }}
					/>

					<button onClick={capture}>Capture</button>

					<button onClick={() => setOpen(false)}>Close Camera</button>
				</div>
			)}
		</div>
	);
};

export default MobileCamera;
