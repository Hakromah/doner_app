import Image from 'next/legacy/image';
import styles from '../styles/Footer.module.css';
import React from 'react';

const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<Image src="/img/bg.png" objectFit="contain" alt="" layout="fill" />
			</div>
			<div className={styles.item}>
				<div className={styles.card}>
					<h2 className={styles.motto}>
						YEAH, WE DID IT, THE DÖNER SİTE IS ONLİNE
					</h2>
				</div>
				<div className={styles.card}>
					<h1 className={styles.title}>FIND OUR MAIN RESTAURANT HERE</h1>
					<p className={styles.text}>
						Ladin Sokak No:14 P.K.1005 Bahçelievler / İSTANBUL
						+905335046621
					</p>
					<p className={styles.text}>
						Kuyumcukent AVM Ladin Sokak No:5 P.K.1005 Bahçelievler /
						SAMSUN +905335068899
					</p>
					<p className={styles.text}>
						Merkez Mah Ladin sk No:4 P.K.1005 Bahçelievler / Ankara
						+905335552221
					</p>
					<p className={styles.text}>
						AVM Yenibosna Merkez Mahallesi Ladin Sokak No:4 P.K.1005
						Bahçelievler / Ankara +905335552221
					</p>
				</div>
				<div className={styles.card}>
					<h1 className={styles.title}>WORKING HOURS</h1>
					<p className={styles.text}>
						MONDAY - FRIDAY
						<br /> 9:00 am - 22:00
					</p>
					<p className={styles.text}>
						SATURDAY - SUNDAY
						<br /> 12:00 - 24:00
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
