import { CARD_CONTAINER, COLORS } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Task } from "@/utils/db/types";
import { useScaleAnimation } from "@/utils/animations";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";

export const TaskCard = ({ task, index }: { task: Task; index: number }) => {
	const { animatedStyle } = useScaleAnimation({ delay: 100 * index });
	const router = useRouter();

	return (
		<Animated.View
			style={[
				CARD_CONTAINER,
				animatedStyle,
				{ backgroundColor: task.completed ? COLORS.lime : COLORS.lightYellow },
			]}>
			<View style={styles.head}>
				<Text>Calendar</Text>
				<View style={{ flexDirection: "row", gap: 8 }}>
					<Pressable
						onPress={() => router.navigate(`/edit-task/${task.id}`)}
						style={[styles.iconButton, { backgroundColor: COLORS.dark }]}>
						<Entypo name="pencil" size={15} color={COLORS.light} />
					</Pressable>
				</View>
			</View>

			<View style={{ flexDirection: "column" }}>
				<Text style={styles.contentTitle}>{task.title}</Text>
				<Text style={styles.contentDescription}>{task.description}</Text>
			</View>

			<View
				style={{
					height: 1,
					width: "100%",
					backgroundColor: COLORS.gray,
					marginVertical: 16,
				}}
			/>

			<View style={styles.tagContainer}>
				{task.tags?.split(",").map((tag, index) => (
					<Text key={index}>#{tag}</Text>
				))}

				{/* <Text>#renovation</Text>
				<Text>#planning</Text> */}
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	head: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	iconButton: {
		height: 45,
		width: 45,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 45 / 2,
	},
	contentTitle: {
		fontSize: 20,
	},
	contentDescription: { fontSize: 32 },
	tagContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 20,
	},
});
