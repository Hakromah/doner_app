import React from 'react';
import styles from '../styles/DonerCard.module.css';
import Image from 'next/legacy/image';
import Link from 'next/link';

const DonerCard = ({ doner }) => {
	return (
		<div className={styles.container}>
			<Link href={`/product/${doner._id}`}>
				<Image src={doner.img} alt="" width="500" height="500" />
			</Link>
			<h1 className={styles.title}>{doner.title}</h1>
			<span className={styles.price}>${doner.prices[0]}</span>
			<p className={styles.descrip}>{doner.descrip}</p>
		</div>
	);
};

export default DonerCard;
