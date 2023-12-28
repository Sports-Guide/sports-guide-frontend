import './Main.scss';
import { Form } from '../Form/Form';
import MapComponent from '../Map/Map';

export function Main() {
	return (
		<main>
			<Form label="Найти" />
			<MapComponent className="map-container_place_main" />
		</main>
	);
}
