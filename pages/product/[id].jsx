import React from 'react';
import styles from '../../styles/Product.module.css';
import Image from 'next/legacy/image';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/cartSlice';

const Product = ({ doner }) => {
	const [price, setPrice] = useState(doner.prices[0]);
	const [size, setSize] = useState(0);
	const [extras, setExtras] = useState([]);
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();

	//update price when extraOption is checked
	const changePrice = (number) => {
		setPrice(price + number);
	};

	const handleSize = (sizeIndex) => {
		const difference = doner.prices[sizeIndex] - doner.prices[size];
		setSize(sizeIndex);
		changePrice(difference);
	};

	const handleChange = (e, option) => {
		const ckecked = e.target.checked;
		if (ckecked) {
			changePrice(option.price);
			setExtras((prev) => [...prev, option]);
		} else {
			changePrice(-option.price);
			setExtras(extras.filter((extra) => extra._id !== option._id));
		}
	};

	const handleClick = () => {
		dispatch(addProduct({...doner, extras, price, quantity}));
	};

	return (
		<div className={styles.container}>
			{/* left part */}
			<div className={styles.left}>
				<div className={styles.imgContainer}>
					<Image
						src={doner.img}
						layout="fill"
						objectFit="contain"
						alt=""
						className="rounded-full"
					/>
				</div>
			</div>
			{/* right part */}
			<div className={styles.right}>
				<h1 className={styles.title}>{doner.title}</h1>
				<span className={styles.price}>${price}</span>
				<p className={styles.descrip}>{doner.descrip}</p>
				<h3 className={styles.choose}>Choose the size</h3>
				<div className={styles.sizes}>
					<div className={styles.size} onClick={() => handleSize(0)}>
						<Image src="/img/size.png" layout="fill" alt="" />
						<span className={styles.number}>Small</span>
					</div>
					<div className={styles.size} onClick={() => handleSize(1)}>
						<Image src="/img/size.png" layout="fill" alt="" />
						<span className={styles.number}>Medium</span>
					</div>
					<div className={styles.size} onClick={() => handleSize(2)}>
						<Image src="/img/size.png" layout="fill" alt="" />
						<span className={styles.number}>Large</span>
					</div>
				</div>
				{/* Additional part Ingredients */}
				<h3 className={styles.choose}>Choose additional ingredients</h3>
				<div className={styles.ingredients}>
					{doner.extraOption.map((option) => (
						<div className={styles.option} key={option._id}>
							<input
								type="checkbox"
								id="double"
								name="double"
								className={styles.checkbox}
								onChange={(e) => handleChange(e, option)}
							/>
							<label htmlFor="double" className={styles.label}>
								{option.text}
							</label>
						</div>
					))}
				</div>
				<div className={styles.add}>
					<input
						onChange={(e) => setQuantity(e.target.value)}
						type="number"
						defaultValue={1}
						className={styles.quantity}
					/>
					<button className={styles.button} onClick={handleClick}>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

//fetching data from MONGODB by doing severside rendering
//after here we should create our api endpoint file in the api->products folder

export const getServerSideProps = async ({ params }) => {
	const res = await axios.get(
		`http://localhost:3000/api/products/${params.id}`
	);
	return {
		props: {
			doner: res.data,
		},
	};
};

export default Product;
