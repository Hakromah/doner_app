import styles from '../../styles/Order.module.css';
import Image from 'next/legacy/image';
import axios from 'axios';

const Order = ({ order }) => {
	const status = order.status;
	const statusClass = (index) => {
		if (index - status < 1) return styles.done;
		if (index - status === 1) return styles.inProgress;
		if (index - status > 1) return styles.undone;
	};

	return (
		<div className={styles.container}>
			{/* left */}
			<div className={styles.left}>
				<div className={styles.row}>
					<section className={styles.section}>
						<div className={styles.tr}>
							<div className="text-start">order ID</div>
							<div className="text-start">Customer</div>
							<div className="text-start">Address</div>
							<div className="text-start">Total</div>
						</div>
						<div className={styles.trItems}>
							<div className={styles.id}>{order._id}</div>
							<div className={styles.name}>{order.customer}</div>
							<div className={styles.address}>{order.address}</div>
							<div className={styles.total}>${order.total}</div>
						</div>
					</section>
				</div>
				{/* STATUS ROWS */}
				<div className={styles.row}>
					{/* status 1 */}
					<div className={statusClass(0)}>
						<Image src="/img/paid.png" width={20} height={40} alt="" />
						<span>Payment</span>
						<div className={styles.checkedIcon}>
							<Image
								className={styles.checkedIcon}
								src="/img/checked.png"
								width={20}
								height={20}
								alt=""
							/>
						</div>
					</div>
					{/* status 2 */}
					<div className={statusClass(1)}>
						<Image src="/img/bake.png" width={20} height={40} alt="" />
						<span>Preparing</span>
						<div className={styles.checkedIcon}>
							<Image
								className={styles.checkedIcon}
								src="/img/checked.png"
								width={20}
								height={20}
								alt=""
							/>
						</div>
					</div>
					{/* status 3 */}
					<div className={statusClass(2)}>
						<Image src="/img/bike.png" width={20} height={40} alt="" />
						<span>On the way</span>
						<div className={styles.checkedIcon}>
							<Image
								className={styles.checkedIcon}
								src="/img/checked.png"
								width={20}
								height={20}
								alt=""
							/>
						</div>
					</div>
					{/* status 4 */}
					<div className={statusClass(3)}>
						<Image
							src="/img/delivered.png"
							width={20}
							height={40}
							alt=""
						/>
						<span>Delivered</span>
						<div className={styles.checkedIcon}>
							<Image
								className={styles.checkedIcon}
								src="/img/checked.png"
								width={20}
								height={20}
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
			{/* right */}
			<div className={styles.right}>
				<div className={styles.wrapper}>
					<h2 className={styles.title}>CART TOTAL</h2>
					<div className={styles.totalText}>
						<b className={`${styles.totalTextTitle} mr-5`}>Subtotal:</b>
						$55.60
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Discount:</b>$0.00
					</div>
					<div className={`${styles.totalText} text-xl font-bold mt-8`}>
						<b className={styles.totalTextTitle}>Total:</b>$55.60
					</div>
					<button disabled={true} className={styles.button}>
						PAID
					</button>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({ params }) => {
	const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
	return {
		props: { order: res.data },
	};
};

export default Order;
