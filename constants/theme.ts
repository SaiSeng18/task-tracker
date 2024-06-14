import { ImageStyle, TextStyle, ViewStyle } from "react-native";

const COLORS = {
	dark: "#202020",
	light: "#ffffff",
	gray: "#eaeaea",
	lime: "#cfe9bf",
	lightYellow: "#ffeba8",
	cyan: "#b8e7ef",
	red: "#d11a2a",
	blue: "#3985d0",
};

const SPACING = {
	small: 8,
	medium: 16,
	large: 24,
};

const BORDER_RADIUS = {
	small: 8,
	medium: 16,
	large: 24,
};

const FONT_SIZE = {
	small: 12,
	medium: 16,
	large: 24,
};

const CARD_CONTAINER: ViewStyle | TextStyle | ImageStyle = {
	height: "auto",
	width: "100%",
	padding: 16,
	borderRadius: 20,
};

export { COLORS, BORDER_RADIUS, FONT_SIZE, SPACING, CARD_CONTAINER };
