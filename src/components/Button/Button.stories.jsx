import PhotoIcon from '../svg/PhotoIcon';
import SearchIcon from '../svg/SearchIcon';
import { Button } from './Button';

export default {
	title: 'UI/Button',
	component: Button,
	argTypes: {
		label: { control: 'text' },
		type: {
			control: 'radio',
			options: ['button', 'submit', 'reset'],
		},
		btnStyle: {
			control: 'radio',
			options: ['primary', 'secondary', 'flat'],
		},
		size: {
			control: 'radio',
			options: ['big', 'small'],
		},
		iconPosition: {
			control: 'radio',
			options: ['start', 'end'],
		},
		disabled: { control: 'boolean' },
		onClick: { action: 'clicked' },
		ariaLabel: { control: 'text' },
	},
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: 'Button',
	type: 'button',
	btnStyle: 'primary',
	size: 'big',
	disabled: false,
	startIcon: <SearchIcon />,
};

export const Secondary = Template.bind({});
Secondary.args = {
	label: 'Button',
	type: 'button',
	btnStyle: 'secondary',
	size: 'small',
	disabled: false,
	endIcon: <SearchIcon />,
};

export const Flat = Template.bind({});
Flat.args = {
	label: 'Button',
	type: 'button',
	btnStyle: 'flat',
	size: 'small',
	disabled: false,
	startIcon: <SearchIcon />,
};

export const СustomAddPhoto = Template.bind({});
СustomAddPhoto.args = {
	label: 'Добавить фото',
	disabled: false,
	customStyle: 'btn-add-photo',
	startIcon: <PhotoIcon />,
};

export const СustomAddPhotoSmall = Template.bind({});
СustomAddPhotoSmall.args = {
	disabled: false,
	customStyle: 'btn-add-photo-small',
	startIcon: <PhotoIcon />,
};
