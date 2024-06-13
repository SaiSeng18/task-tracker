import { CARD_CONTAINER, COLORS } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const WeekView = () => {
	return (
		<View
			style={[
				CARD_CONTAINER,
				{ backgroundColor: COLORS.light, marginBottom: 20 },
			]}>
			<Text style={{ marginBottom: 16, fontSize: 20 }}>Start of the week</Text>
			<View style={styles.container}>
				{Array(7)
					.fill(null)
					.map((_, i) => (
						<Pressable
							key={i}
							style={[styles.dayButton, { backgroundColor: COLORS.dark }]}>
							<Text style={{ color: COLORS.light }}>17</Text>
							<Text style={{ color: COLORS.light }}>Sun</Text>
						</Pressable>
					))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 0,
	},
	dayButton: {
		paddingVertical: 14,
		paddingHorizontal: 8,
		fontSize: 12,
		alignItems: "center",
		borderRadius: 50,
	},
});
