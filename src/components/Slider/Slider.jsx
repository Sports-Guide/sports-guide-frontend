import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import './Slider.scss';
import { IMG_WIDTH } from '../../constants/SliderConstants';

export function Slider({ children }) {
	const [images, setImages] = React.useState([]);
	const [offset, setOffset] = React.useState(0);

	const handleLeftClick = () => {
		setOffset((currentOffset) => {
			const newOffset = currentOffset + IMG_WIDTH;
			return Math.min(newOffset, 0);
		});
	};

	const handleRightClick = () => {
		setOffset((currentOffset) => {
			const newOffset = currentOffset - IMG_WIDTH;
			const maxOffset = -(IMG_WIDTH * (images.length - 1));
			return Math.max(newOffset, maxOffset);
		});
	};

	React.useEffect(() => {
		setImages(
			Children.map(children, (child) =>
				cloneElement(child, {
					style: {
						height: '100%',
						minWidth: `${IMG_WIDTH}px`,
						maxWidth: `${IMG_WIDTH}px`,
					},
				})
			)
		);
	}, [children]);

	return (
		<div className="slider-container">
			<div className="slider-window">
				<Button
					type="button"
					customStyle="arrow arrow-left"
					onClick={handleLeftClick}
					ariaLabel="Кнопка перемещения слайдера влево"
				/>
				<div
					className="images-container"
					style={{
						transform: `translateX(${offset}px)`,
					}}
				>
					{images}
				</div>
				<Button
					type="button"
					customStyle="arrow arrow-right"
					onClick={handleRightClick}
					ariaLabel="Кнопка перемещения слайдера вправо"
				/>
			</div>
		</div>
	);
}

Slider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Slider;
