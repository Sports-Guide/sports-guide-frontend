import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Main } from '../Main/Main';
import { Profile } from '../Profile/Profile';
import { AreaApp } from '../Area/AreaApp';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { SportsGround } from '../SportsGround/SportsGround';

export function App() {
	const [isEditing, setIsEditing] = React.useState(false);

	const handleEditButtonClick = () => {
		setIsEditing(true);
	};

	const handleDeleteAccount = () => {
		console.log('Аккаунт удален');
	};

	const handleLogOut = () => {
		console.log('Вы вышли из аккаунта');
	};

	return (
		<div className="app">
			<BrowserRouter>
				<div className="page__container">
					<Header />
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/app-area" element={<AreaApp />} />
						<Route
							path="/profile"
							element={
								<Profile
									onEditProfile={handleEditButtonClick}
									isEditing={isEditing}
									onDelete={handleDeleteAccount}
									onLogOut={handleLogOut}
								/>
							}
						/>
						<Route path="/sports-ground" element={<SportsGround />} />
						<Route path="/signin" element={<Login />} />
						<Route path="/signup" element={<Register />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
					<Footer />
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
