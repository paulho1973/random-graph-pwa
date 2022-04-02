import React, { useState } from 'react';
import QRCode from 'react-qr-code';

import styles from './PriceTag.module.css';

const PriceTag = () => {

	const [name, setName] = useState('');
	const [price, setPrice] = useState('');



	return (
		<div className={styles.container}>

			<input className={styles.input} type="text" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} />
		
			<input className={styles.input} type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}/>

			<div className={styles.line}>Generated QR code Price Tag</div>

			<div className={styles.content}>
			{ (name && price) ? 
			<QRCode value={'https://www.example.com/buy?product='+name+'&price='+price} />
			:
			<div className={styles.blinkme}>please enter name and price</div>
			}
			</div>
			
		</div>
	);
}

export default PriceTag;