import React, { useState, useEffect } from 'react';
import { Html5Qrcode } from "html5-qrcode";

import styles from './QrReader.module.css';

const qrConfig = { fps: 10, qrbox: { width: 200, height: 200 } };

let html5QrCode;

const QrReader = () => {

	const [result, setResult] = useState('Click start to scan');

	useEffect(() => {
		html5QrCode = new Html5Qrcode("reader");
	}, []);

	const handleClickAdvanced = () => {
		setResult('');

		const qrCodeSuccessCallback = (decodedText, decodedResult) => {
		  setResult(decodedText);
		  handleStop();
		};
		html5QrCode.start(
		  { facingMode: "environment" },
		  qrConfig,
		  qrCodeSuccessCallback
		);
	};
	
	const handleStop = () => {
		try {
			html5QrCode
			.stop()
			.then((res) => {
				html5QrCode.clear();
			})
			.catch((err) => {
				console.log(err.message);
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.container}>
			<div id="reader" className={styles.camera} />
			<button onClick={() => handleClickAdvanced()}>
				start
			</button>
			<button onClick={() => handleStop()}>stop</button>
			<div className={styles.result}>{result}</div>		
		</div>
	);
}

export default QrReader;