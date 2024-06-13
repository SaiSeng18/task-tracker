import { COLORS } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export const Header = () => {
	return (
		<View style={styles.header}>
			<View style={{ flex: 1, flexDirection: "column" }}>
				<Text style={styles.title}>Hi 👋🏻 Daniel</Text>
				<Text style={styles.title}>Welcome Back</Text>
			</View>

			<View
				style={{
					height: 50,
					width: 50,
					backgroundColor: "#fff",
					borderRadius: 50,
				}}></View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: COLORS.light,
	},
});
