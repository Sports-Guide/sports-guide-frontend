import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Main } from '../Main/Main';
import { Profile } from '../Profile/Profile';
import { Card } from '../Card/Card';

export function App() {
	return (
		<div className="app">
			<div className="page__container">
				<Header />
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/card" element={<Card />} />
				</Routes>
				<Footer />
			</div>
		</div>
	);
}

export default App;
