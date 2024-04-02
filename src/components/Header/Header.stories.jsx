import { Header } from './Header';

export default {
	title: 'Header',
	component: Header,
	argTypes: {},
};

const Template = () => <Header />;

export const UnAuth = Template.bind({});

// export const Secondary = Template.bind({});
// Secondary.args = {
// 	label: 'Button',
// 	type: 'button',
// 	btnStyle: 'secondary',
// 	size: 'small',
// 	disabled: false,
// 	endIcon: <SearchImg />,
// };
