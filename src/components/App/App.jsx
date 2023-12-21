import './App.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Main } from '../Main/Main';

export function App() {
	return (
		<div className="app">
			<Header />
			<Main />
			<Footer />
		</div>
	);
}

export default App;
