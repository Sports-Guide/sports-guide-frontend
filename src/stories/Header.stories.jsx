import { Header } from '../components/Header/Header';

export default {
	title: 'Basic/Header',
	component: Header,
};

export const onLogIn = () => <Header loggedIn={false} />;

export const onLogOut = () => <Header loggedIn />;
