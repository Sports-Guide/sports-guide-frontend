import Search from '../../svg/Search';
import { Button } from './Button';

export default {
	title: 'UI/Button',
	component: Button,
	argTypes: {
		label: { control: 'text' },
		type: {
			control: 'select',
			options: ['button', 'submit', 'reset'],
		},
		btnStyle: {
			control: 'select',
			options: ['primary', 'secondary', 'flat'],
		},
		size: {
			control: 'select',
			options: ['big', 'small'],
		},
		disabled: { control: 'boolean' },
		onClick: { action: 'clicked' },
	},
};

const Template = (args) => (
	<Button {...args}>
		<Search />
	</Button>
);

export const Default = Template.bind({});
Default.args = {
	label: 'Button',
	type: 'button',
	btnStyle: 'primary',
	size: 'big',
	disabled: false,
	startIcon: true,
};
