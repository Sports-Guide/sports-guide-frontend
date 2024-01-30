import { Form } from '../components/Form/Form';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';
import FormTitle from '../components/FormTitle/FormTitle';

export default {
	title: 'UI/Form',
	component: Form,
};

const Template = (args) => (
	<Form {...args}>
		<FormTitle label="Вход" />
		<Input placeholder="Введите имя" />
		<Input placeholder="Введите пароль" type="password" />
		<Button type="submit" label="Войти" />
	</Form>
);

export const Default = Template.bind({});
Default.args = {};
