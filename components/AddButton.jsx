import React from 'react';
import styles from '../styles/Add.module.css';

const AddButton = ({ setClose }) => {
	return (
		<div onClick={() => setClose(false)} className={styles.mainAddButton}>
			<h1>Add new Döner</h1>
		</div>
	);
};

export default AddButton;
