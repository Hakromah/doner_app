import React, { useEffect, useState } from 'react';
import styles from '../styles/Sliderhome.module.css';
import Image from 'next/legacy/image';
import slider from '@/apidata/SliderHomeData';

const Sliderhome = () => {
	// const [slides] = useState(slider);
	// const [index, setIndex] = useState(0);
	// const gotoPrevSlide = (direction) => {
	// 	if (direction === 'l') {
	// 		setIndex(index !== 0 ? slides - 1 : 2);
	// 	}
	// 	if (direction === 'r') {
	// 		setIndex(index !== 0 ? slides + 1 : 0);
	// 	}
	// };
	const [slides] = useState(slider);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (index === slides.length - 1) return setIndex(0);
			setIndex(index + 1);
		}, 5000);
		return () => clearInterval(timer);
	}, [index, slides.length]);

	//button click
	const gotoNextSlide = () => {
		if (index === slides.length - 1) return setIndex(0);
		setIndex(index + 1);
	};
	const gotoPrevSlide = () => {
		if (index === 0) return setIndex(slides.length - 1);
		setIndex(index - 1);
	};

	return (
		<div className={styles.container}>
			<div
				onClick={gotoPrevSlide}
				className={`${styles.arrowContainer} left-0 z-10 `}
			>
				<Image
					src="/img/arrowl.png"
					alt=""
					layout="fill"
					objectFit="contain"
				/>
			</div>
			<div
				className={`${styles.wrapper} flex w-full h-full `}
				style={{ transform: `translateX(${-100 * index}v)` }}
			>
				<div
					className={`${styles.imageContainer} w-[100vw] h-full relative `}
				>
					{slider.map((item, i) => {
						if (i === index) {
							return (
								<div
									key={i}
									className={`${styles.sliders} flex flex-col md:flex-row justify-center gap-4 md:gap-8 items-center  mt-20 `}
								>
									<div
										className={`${styles.textArea} grow-2 flex flex-col justify-center items-center ml-4`}
									>
										<h1 className="flex text-center text-white text-xl md:text-3xl font-bold flex-wrap">
											{item.title}
										</h1>
										<h2 className="text-white text-xl">
											{item.discount}
										</h2>
									</div>
									<div className="flex relative right-0 md:mr-16
									w-[300px] h-[200px] md:w-[500px]
									md:h-[400px] mb-5 md:pb-0">
										<Image
											src={item.image}
											alt=""
											layout='fill'
											objectFit='contain'
											className="rounded-lg"
										/>
									</div>
								</div>
							);
						}
					})}
				</div>
			</div>
			<div
				onClick={gotoNextSlide}
				className={`${styles.arrowContainer} right-0`}
			>
				<Image
					src="/img/arrowr.png"
					alt=""
					layout="fill"
					objectFit="contain"
				/>
			</div>
		</div>
	);
};

export default Sliderhome;
