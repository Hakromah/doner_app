import React from 'react';
import styles from '../styles/DonerList.module.css';
import DonerCard from './DonerCard';
const DonerList = ({ donerList }) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				This is one of the best Döner site in town
			</h1>
			<p className={styles.descrip}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dolor
				voluptas vel incidunt minus nihil, voluptatum sed dolorum tempore.
				Maxime cumque voluptatibus recusandae harum, porro animi consectetur
				id nobis, possimus nam modi quam labore culpa.
			</p>
			<div className={styles.wrapper}>
				{donerList.map((doner) => (
					<DonerCard key={doner._id} doner={doner} />
				))}
			</div>
		</div>
	);
};

export default DonerList;
