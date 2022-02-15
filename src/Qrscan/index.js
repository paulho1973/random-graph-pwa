import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

import styles from './Qrscan.module.css';

const Qrscan = () => {

	const [result, setResult] = useState('No result');

	const handleError = (err) => {
		console.err(err)
	}

	const handleScan = (result) => {
		if(result){
			setResult(result)
		}
	}

	const previewStyle = {
		height: 240,
		width: 320,
	}

	return (
		<div className={styles.container}>
			<QrReader
			delay={500}
			style={previewStyle}
			onError={handleError}
			onScan={handleScan}
			/>
			<div className={styles.result}>{result}</div>		
		</div>
	);
}

export default Qrscan;