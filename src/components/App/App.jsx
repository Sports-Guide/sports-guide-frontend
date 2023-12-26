import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Main } from '../Main/Main';
import { Profile } from '../Profile/Profile';

import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export function App() {
	return (
		<div className="app">
			<div className="page__container">
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/signin" element={<Login />} />
						<Route path="/signup" element={<Register />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
