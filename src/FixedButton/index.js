import React from 'react';

import { useLocation } from 'react-router-dom'

import { DATA } from '../constants';

import styles from './FixedButton.module.css';

const FixedButton = () => {
	const location = useLocation();

	let obj = DATA.find(o => o.link === location.pathname);

	return (
		<div className={styles.container}>
			{ obj.source && 
				<button className={styles.button} onClick={ ()=>{ window.location.href = obj.source } }>Source Code</button>
			}
		</div>
	);
}

export default FixedButton;