import React, { useState } from 'react';
import styles from '../styles/OrderDetail.module.css';

const OrderDetail = ({ total, createOrder, offTheCash }) => {
	const [customer, setCustomer] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');

	const handleClick = () => {
		createOrder({ customer, address, phone, total, method: 0 });
		setCustomer('');
		setPhone('');
		setAddress('');
	};
	return (
		<div className={styles.container2}>
			<div className={styles.wrapper}>
				<span className={styles.close} onClick={offTheCash}>
					X
				</span>

				<h1 className={`${styles.title} text-3xl font-black`}>
					You will pay $12 after delivery
				</h1>
				<div className={styles.item}>
					<label className={styles.label}>Name Surname</label>
					<input
						type="text"
						placeholder="Hassan Kromah"
						className={`${styles.input} border-2 border-gray-300`}
						onChange={(e) => setCustomer(e.target.value)}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Phone Number:</label>
					<input
						type="text"
						className={`${styles.input} border-2 border-gray-300`}
						placeholder="+90 5033 508 38 61"
						onChange={(e) => setPhone(e.target.value)}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Address:</label>
					<textarea
						rows={4}
						type="text"
						className={`${styles.textarea} border-2 border-gray-300`}
						placeholder="16 Gelincik sk Siyavuşpaşa Mh"
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<button className={styles.button} onClick={handleClick}>
					Order
				</button>
			</div>
		</div>
	);
};

export default OrderDetail;
