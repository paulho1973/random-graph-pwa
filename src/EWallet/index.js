import React, { useState, useEffect } from 'react';

import { Html5Qrcode } from "html5-qrcode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import Message from './Message';

import styles from './EWallet.module.css';

const qrConfig = { fps: 10, qrbox: { width: 200, height: 200 } };

let html5QrCode;

const EWallet = () => {

	const [balance, setBalance] = useState(100);
	const [topup, setTopup] = useState('');

	const [transhistory, setTransHistory] = useState([]);
	const [topuphistory, setTopupHistory] = useState([]);

	const [modal1, setModal1] = useState(false);
	const [modal2, setModal2] = useState(false);

	const [result, setResult] = useState('');

	const [msg, setMsg] = useState('');

	const [list, setList] = useState('trans');

	useEffect(() => {
		html5QrCode = new Html5Qrcode("reader");
	}, []);

	const handleClickAdvanced = () => {
		setResult('');

		const qrCodeSuccessCallback = (decodedText, decodedResult) => {
		  setResult(decodedText);
		  let vproduct = getParameterByName('product', decodedText);
		  let vprice = getParameterByName('price', decodedText);
		  handleStop();
		  setModal2(false);
		  updateBalance(vproduct, vprice);
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

	const showModal1 = () => {
		setModal1(true);
		setTopup('');
		setMsg('');
	}
	  
	const hideModal1 = () => {
		setModal1(false);
	}

	const showModal2 = () => {
		setModal2(true);
		setMsg('');
		handleClickAdvanced();
	}
	  
	const hideModal2 = () => {
		setModal2(false);
		handleStop();
	}

	const getParameterByName = (name, url) => {
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}


	const topupAmount = (val) => {
		if (val > 0) {
			setBalance(balance + Number(val));
			let item = {
				datetime : new Date().toLocaleString(),
				amount: val
			}
			setTopupHistory(prevArray => [...prevArray, item])
			setMsg('added $' + val);
			hideModal1(false);
		} else {
			alert('Enter valid amount.')
		}
	}

	const updateBalance = (product, price) => {
		if ( product && typeof Number(price) === 'number' ) {
			if ( balance >= Number(price)) {
				setBalance(balance - Number(price));
				let item = {
					datetime : new Date().toLocaleString(),
					product : product,
					price: price
				}
				setTransHistory(prevArray => [...prevArray, item])
				setMsg('deducted $' + price);
			} else {
				setMsg('insufficient balance.')
			}
		} else {
			setMsg('payment failed.');
		}
	}

	const toggleList = (val) => {
		setList(val);
	}

	return (
		<div className={styles.container}>

			<div className={styles.wrapper}>

				<div className={styles.header}>
					Payment
				</div>

				<div className={styles.card}>
					<div className={styles.walletheader}>
						My eWallet
					</div>
					<div className={styles.dollar}>
						{balance.toFixed(2)}
					</div>

					<div className={styles.message}>
						{ msg &&
							<Message msg={msg} />
						}
					</div>
				
				</div>

				<div className={styles.action}>
					<button onClick={showModal2} className={styles.button}>Scan &amp; Pay</button>
					<button onClick={showModal1} className={styles.button}>Top Up</button>
				</div>

				<hr className={styles.line} size="1" color="#d9d9d9" />

				<div className={styles.header}>
					History
				</div>

				<div className={styles.action}>
					<button onClick={()=>toggleList('trans')} className={`${styles.button} ${list === 'trans' ?  styles.green : ''}`}>Transaction</button>
					<button onClick={()=>toggleList('topup')} className={`${styles.button} ${list === 'topup' ?  styles.green : ''}`}>Top Up</button>
				</div>

				<div className={`${styles.card} ${styles.overflow}`}>
					<div className={styles.historyheader}>Latest</div>
					<ul>
						{ list === 'trans' ?
							transhistory.reverse().map( (item, i) =>
								<li key={i}>{item.datetime} - bought {item.product} @ ${item.price}</li>
							)
							:
							topuphistory.reverse().map( (item, i) =>
								<li key={i}>{item.datetime} - top up ${item.amount}</li>
							)
						}
					</ul>
				</div>

			</div>

			{/** MODAL **/}
			 
			<div className={`${styles.modal} ${modal1 ? styles.show : ""}`} >

				<div className={styles.modalheader}> 
					<div onClick={hideModal1} className={styles.closeicon}>
						<FontAwesomeIcon icon={faAngleLeft} />
					</div>
					<div className={styles.modaltitle}>
						Top Up
					</div>
					<div>
					
					</div>
				</div>

				<div className={styles.modalinput}>
					<input className={styles.input} type="number" placeholder="Top Amount" value={topup} onChange={(e) => setTopup(e.target.value)}/>
					<button className={styles.button} onClick={() => topupAmount(topup)}>Confirm</button>
				</div>	

			</div>

			<div className={`${styles.modal} ${modal2 ? styles.show : ""}`} >

				<div className={styles.modalheader}> 
					<div onClick={hideModal2} className={styles.closeicon}>
						<FontAwesomeIcon icon={faAngleLeft} />
					</div>
					<div className={styles.modaltitle}>
						Scan &amp; Pay
					</div>
					<div>
					
					</div>
				</div>

				<div className={styles.modalinput}>
					<div id="reader" className={styles.camera} />
					<div className={styles.result}>{result}</div>
				</div>	

			</div>


		</div>
	);
}

export default EWallet;