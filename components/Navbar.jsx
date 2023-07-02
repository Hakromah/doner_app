import { useSelector } from 'react-redux';
import styles from '../styles/Navbar.module.css';
import Image from 'next/legacy/image';
import Link from 'next/link';

const Navbar = () => {
	const quantity = useSelector((state) => state.cart.quantity);
	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<div
					className={`${styles.callBtn} flex items-center justify-center relative`}
				>
					<Image
						src="/img/telephone.png"
						alt=""
						className={`${styles.phone} `}
						width={50}
						height={50}
					/>
				</div>
				<div className={styles.texts}>
					<div className={styles.text}>ORDER NOW!</div>
					<div className={styles.text}>0212 345 42 52</div>
				</div>
			</div>
			<div className={styles.item}>
				<ul className={styles.list}>
					<Link href="/" passHref className={styles.listItem}>
						Homepage
					</Link>
					<li className={styles.listItem}>Products</li>
					<li className={styles.listItem}>Menu</li>
					<li className={styles.listItem}>
						<Link href="/" passHref>
							<div
								className="flex justify-center items-center
							w-14 h-14 rounded-full shadow-lg relative"
							>
								<Image
									src="/img/logo2.jpg"
									alt=""
									layout="fill"
									objectFit="cover"
								/>
							</div>
						</Link>
					</li>
					<li className={styles.listItem}>Events</li>
					<li className={styles.listItem}>Blog</li>
					<li className={styles.listItem}>Contact</li>
				</ul>
			</div>
			<Link href="/cart" passHref>
				<div className={styles.item}>
					<div className={styles.cart}>
						<Image src="/img/cart.png" alt="" width="30" height="30" />
						<div className={styles.counter}>{quantity}</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Navbar;
