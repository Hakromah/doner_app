import image from '../public/img/pizza.png';
import pizza1 from '../public/img/pizza1.png';
import image1 from '../public/img/restaurant1.png';
import image2 from '../public/img/restaurant2.png';
import station from '../public/img/station.png';

// Mongo1 pass: vSizURg1oHhVAqWp / KyAKxHAQIawP1GMP
// mongodb+srv://kkromah12:KyAKxHAQIawP1GMP@cluster0.odbbbo9.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://kkromah12:<password>@cluster0.odbbbo9.mongodb.net/

const slider = [
	{
		title: 'Here is your best döner site',
		discount: 'up to 40% discount',
		image: image,
	},
	{
		title: 'Durum tarz dönerlerimiz ',
		discount: 'up to 50% discount',
		image: image1,
	},
	{
		title: 'Porsio tarz dönerlerimiz',
		discount: 'up to 20% discount',
		image: image2,
	},
	{
		title: 'Porsio tarz dönerlerimiz',
		discount: 'up to 20% discount',
		image: pizza1,
	},
	{
		title: 'HERE IS A BEAUTIFUL VIEW OF OUR RESTAURANT',
		discount: 'up to 20% discount',
		image: station,
	},
];

export default slider;
