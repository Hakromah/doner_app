import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [error, setError] = useState(null);
	const router = useRouter();

	const handleClick = async () => {
		try {
			await axios.post('http://localhost:3000/api/login', {
				username,
				password,
			});
			router.push('/admin');
		} catch (error) {
			setError(true);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1 className="mb-5 font-sans font-bold text-3xl">
					Admin Dashboard
				</h1>
				<input
					type="text"
					placeholder="username"
					className={styles.input}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					className={styles.input}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={handleClick} className={styles.button}>
					Sign In
				</button>
				{error && <span className={styles.error}>Wrong Credentials!</span>}
			</div>
		</div>
	);
};

export default Login;
