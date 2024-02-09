import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
			<FaChevronLeft className="arrow" onClick={handleLeftClick} />
			<div className="slider-window">
				<div
					className="images-container"
					style={{
						transform: `translateX(${offset}px)`,
					}}
				>
					{images}
				</div>
			</div>
			<FaChevronRight className="arrow" onClick={handleRightClick} />
		</div>
	);
}

Slider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Slider;
