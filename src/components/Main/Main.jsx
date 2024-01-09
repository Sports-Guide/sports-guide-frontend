import './Main.scss';
import { Form } from '../Form/Form';
import MapComponent from '../Map/Map';
import { SearchControl } from '../SearchControl/SearchControl';

export function Main() {
	return (
		<main>
			<Form label="Найти" />
			<MapComponent className="map-container_place_main">
				<SearchControl />
			</MapComponent>
		</main>
	);
}
