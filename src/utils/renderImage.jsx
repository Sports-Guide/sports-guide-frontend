import noImage from '../images/noImage.jpeg';

export const renderImage = (area) => {
	// console.log(area);
	if (area.images.length > 0) {
		return area.images[0].image;
	}
	return noImage;
};

export const renderImageForSportsGround = (area) => {
	if (area.images.length > 0) {
		return area.images;
	}
	return [{ id: 'default', image: noImage }];
};
