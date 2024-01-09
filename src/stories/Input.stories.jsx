import { Input } from '../components/Input/Input';

export default {
	title: 'UI/Input',
	component: Input,
};

export const Search = () => <Input placeholder="Поиск" />;

export const Email = () => <Input placeholder="Email" />;

export const Name = () => <Input placeholder="Ваше имя" />;

export const Password = () => <Input placeholder="Введите пароль" />;
