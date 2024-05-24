import noImage from '../images/noImage.jpg';

interface Image {
	id: number | string;
	url?: string;
	image?: string;
}

interface Area {
	images: Image[];
}

export const renderImage = (area: Area): string | undefined => {
	if (area.images.length > 0) {
		return area.images[0].image;
	}
	return noImage;
};

export const renderImageForSportsGround = (area: Area): Image[] => {
	if (area.images.length > 0) {
		return area.images;
	}
	return [{ id: 'default', image: noImage }];
};
