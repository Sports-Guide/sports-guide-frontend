import { Icon } from 'leaflet';
import customIconImage from '../../images/location.png';

const customIcon = new Icon({
	iconUrl: customIconImage,
	iconSize: [38, 38],
});

export default customIcon;
