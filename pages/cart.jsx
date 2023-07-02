import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Cart.module.css';
import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import { deleteProduct, reset } from '@/redux/cartSlice';
import OrderDetail from '@/components/OrderDetail';

const Cart = () => {
	//to display paypal button on checkout click
	const cart = useSelector((state) => state.cart);
	const [open, setOpen] = useState(false);
	const [cash, setCash] = useState();
	const amount = cart.total;
	const currency = 'USD';
	const style = { layout: 'vertical' };
	const dispatch = useDispatch();
	const router = useRouter();
	const offTheCash = () => {
		setCash(false);
	};

	const createOrder = async (data) => {
		try {
			const res = await axios.post('http://localhost:3000/api/orders', data);
			res.status === 201 && router.push('/orders/' + res.data._id);
			dispatch(reset());
		} catch (error) {
			console.log(error);
		}
	};

	//Deleting by user,

	// Custom component to wrap the PayPalButtons and handle currency changes
	const ButtonWrapper = ({ currency, showSpinner }) => {
		// usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
		// This is the main reason to wrap the PayPalButtons in a new component
		const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
		useEffect(() => {
			dispatch({
				type: 'resetOptions',
				value: {
					...options,
					currency: currency,
				},
			});
		}, [currency, showSpinner]);

		return (
			<>
				{showSpinner && isPending && <div className="spinner" />}
				<PayPalButtons
					style={style}
					disabled={false}
					forceReRender={[amount, currency, style]}
					fundingSource={undefined}
					createOrder={(data, actions) => {
						return actions.order
							.create({
								purchase_units: [
									{
										amount: {
											currency_code: currency,
											value: amount,
										},
									},
								],
							})
							.then((orderId) => {
								// Your code here after create the order
								return orderId;
							});
					}}
					onApprove={function (data, actions) {
						return actions.order.capture().then(function (details) {
							const shipping = details.purchase_units[0].shipping;
							createOrder({
								customer: shipping.name.full_name,
								address: shipping.address.address_line_1,
								total: cart.total,
								method: 1,
							});
						});
					}}
				/>
			</>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<section className={styles.section}>
					<div className={styles.tr}>
						<div className="text-center">Product</div>
						<div className="text-center">Name</div>
						<div className="text-center">Extras</div>
						<div className="text-center">Price</div>
						<div className="text-center">Quantity</div>
						<div className="text-center">Total</div>
					</div>
					{/* map the product details added to the cart */}
					{cart.products &&
						cart.products.map((product) => (
							<div className={styles.trItems} key={product._id}>
								<div className={styles.imageContainer}>
									<Image
										src={product.img}
										layout="fill"
										objectFit="contain"
										alt=""
									/>
								</div>
								<div className={styles.name}>{product.title}</div>
								<div
									className={`${styles.extras} flex flex-col text-start pl-14`}
								>
									{product.extras.map((extra) => (
										<span key={extra._id}>- {extra.text} </span>
									))}
								</div>
								<div className={`${styles.price} text-center`}>
									${product.price}
								</div>
								<div className={`${styles.quantity} text-center`}>
									{product.quantity}
								</div>
								<div className={`${styles.total} text-center`}>
									${product.price * product.quantity}
								</div>
								{/* delete in the cart */}
								<button
									className={`${styles.button} p-2`}
									onClick={() => {
										dispatch(deleteProduct(product._id));
									}}
								>
									Delete
								</button>
							</div>
						))}
				</section>
			</div>
			{/* right part */}
			<div className={`${styles.right} ml-8`}>
				<div className={styles.wrapper}>
					<h2 className={styles.title}>CART TOTAL</h2>
					<div className={styles.totalText}>
						<b className={`${styles.totalTextTitle} mr-5`}>Subtotal:</b>
						{Number(cart.total)}
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Discount:</b>$0.00
					</div>
					<div className={`${styles.totalText} text-xl font-bold`}>
						<b className={styles.totalTextTitle}>Total:</b>
						{Number(cart.total)}
					</div>
					{/* paypal button display */}
					{open ? (
						<div className={styles.paymentMethods}>
							<button
								popovertarget="popover"
								className={styles.pmethod}
								onClick={() => setCash(true)}
							>
								CASH ON DELIVERY
							</button>
							<PayPalScriptProvider
								options={{
									clientId:
										'AfENnSThnEQCub2R4wjJUonPWnEjU1yI5GJwwJErLQZ50pr2XbjVTJfMS-KxNtjiwkgHtIHz3I2x9CNZ', //client ID
									components: 'buttons',
									currency: 'USD',
									//disableFunding: 'credit,card,p24', //is to hide the other payment options under paypal btn
								}}
							>
								<ButtonWrapper
									currency={currency}
									showSpinner={false}
								/>
							</PayPalScriptProvider>
						</div>
					) : (
						<button
							onClick={() => setOpen(true)}
							className={styles.button}
						>
							CHECKOUT NOW!
						</button>
					)}
				</div>
			</div>
			{cash && (
				<OrderDetail
					total={cart.total}
					createOrder={createOrder}
					offTheCash={offTheCash}
				/>
			)}
		</div>
	);
};

export default Cart;
