import Add from '@/components/Add';
import AddButton from '@/components/AddButton';
import DonerList from '@/components/DonerList';
import Sliderhome from '@/components/Sliderhome';
import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';

export default function Home({ donerList, admin }) {
	//to display admin page for adding products
	const [close, setClose] = useState(true);

	return (
		<div className="styles.container">
			<Head>
				<title>Döner ordering website</title>
				<meta name="description" content="Best döner site in Istanbul" />
			</Head>
			<Sliderhome />
			{admin && <AddButton setClose={setClose} />}
			<DonerList donerList={donerList} />
			{!close && <Add setClose={setClose} />}
		</div>
	);
}

//fetching data from MONGODB by doing severside rendering
export const getServerSideProps = async (ctx) => {
	//to add item by admin
	const myCookie = ctx.req?.cookies || '';
	let admin = false;
	if (myCookie.token === process.env.TOKEN) {
		admin = true;
	}

	const res = await axios.get('http://localhost:3000/api/products');
	return {
		props: {
			donerList: res.data,
			admin,
		},
	};
};
