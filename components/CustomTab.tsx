import { Icon } from "@/constants/icons";
import { COLORS } from "@/constants/theme";
import { View, Text, StyleSheet } from "react-native";

const CustomTab = ({
	focused,
	icon = "logo",
	isIcon = false,
	text,
}: {
	focused: boolean;
	icon?: string;
	isIcon?: boolean;
	text?: string;
}) => {
	return (
		<View
			style={[
				styles.nav,
				{
					backgroundColor: focused ? COLORS.light : COLORS.dark,
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
				},
			]}>
			{isIcon ? (
				<Icon name={icon} size={20} color={focused ? COLORS.dark : COLORS.light} />
			) : (
				<Text
					style={{
						color: focused ? COLORS.dark : COLORS.light,
						fontSize: 16,
						width: "100%",
						textAlign: "center",
					}}>
					{text}
				</Text>
			)}
		</View>
	);
};
export default CustomTab;

const styles = StyleSheet.create({
	nav: {
		height: 45,

		textAlign: "center",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},
});
