import React, { useState } from 'react';
import styles from '../../styles/Admin.module.css';
import Image from 'next/legacy/image';
import axios from 'axios';

const Index = ({ orders, products }) => {
	const [donerList, setDonerList] = useState(products);
	const [orderList, setOrderList] = useState(orders);
	const status = ['preparing', 'on the way', 'delivered'];

	const handleDelete = async (id) => {
		try {
			// const res = await axios.delete(
			// 	'http://localhost:3000/api/products/' + id
			// );
			setDonerList(donerList.filter((doner) => doner._id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	//Edit status
	const handleStatus = async (id) => {
		//find the item to the edited
		const item = orderList.filter((order) => order._id === id);
		const currentStatus = item.status;
		try {
			const res = await axios.put('http://localhost:3000/api/orders/' + id, {
				status: currentStatus + 1,
			});
			setOrderList([
				res.data,
				...orderList.filter((order) => order._id !== id),
			]);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<h1 className={styles.title}>Products</h1>
				<section className={styles.table}>
					<div className={styles.trTitleTop}>
						<div className="text-center">Image</div>
						<div className="text-center">Id</div>
						<div className="text-center">Title</div>
						<div className="text-center">Price</div>
						<div className="text-center">Action</div>
					</div>
					{donerList &&
						donerList.map((product) => (
							<div className={`${styles.tdTitleTop}`} key={product._id}>
								<div>
									<Image
										src={product.img}
										width={70}
										height={70}
										objectFit="contain"
										alt=""
									/>
								</div>
								<div className="p-2">{product._id.slice(0, 5)}...</div>
								<div className="p-2">{product.title}</div>
								<div className="p-2">${product.prices[0]}</div>
								<div className="m-5 gap-2">
									<button className={`${styles.button} p-2`}>
										Edit
									</button>
									<button
										className={`${styles.button} p-2`}
										onClick={() => handleDelete(product._id)}
									>
										Delete
									</button>
								</div>
							</div>
						))}
				</section>
			</div>
			<div className={styles.item}>
				<h1 className={styles.title}>Orders</h1>
				<section className={styles.table}>
					<div className={styles.trTitleDown}>
						<div className="text-center">Id</div>
						<div className="text-center">Customer</div>
						<div className="text-center">Total</div>
						<div className="text-center">Payment</div>
						<div className="text-center">Status</div>
						<div className="text-center">Action</div>
					</div>
					{/* edit by admin */}
					{orderList &&
						orderList.map((order) => (
							<div className={styles.tdTitleDown} key={order._id}>
								<div className="text-center">
									{order._id.slice(0, 5)}...
								</div>
								<div className="text-center">{order.customer}</div>
								<div className="text-center">${order.prices[0]}</div>
								<div className="text-center">
									{order.method === 0 ? (
										<span>cash</span>
									) : (
										<span>paid</span>
									)}
								</div>
								<div className="text-center">
									{status[order.status]}
								</div>
								<div className="text-center">
									<button
										className={`${styles.button} p-2`}
										onClick={() => handleStatus(order._id)}
									>
										Next stage
									</button>
								</div>
							</div>
						))}
				</section>
			</div>
		</div>
	);
};

export const getServerSideProps = async (ctx) => {
	const myCookie = ctx.req?.cookies || '';

	if (myCookie.token !== process.env.TOKEN) {
		return {
			redirect: {
				destination: '/admin/login',
				permanent: false,
			},
		};
	}

	const productRes = await axios.get('http://localhost:3000/api/products');
	const orderRes = await axios.get('http://localhost:3000/api/orders');

	return {
		props: {
			products: productRes.data,
			orders: orderRes.data,
		},
	};
};

export default Index;
