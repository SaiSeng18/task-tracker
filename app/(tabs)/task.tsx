import { TasksContainer } from "@/components/tasks-page/TasksContainer";
import { WeekView } from "@/components/tasks-page/WeekView";
import { Icon } from "@/constants/icons";
import { COLORS, SPACING } from "@/constants/theme";
import { useRouter } from "expo-router";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

const Tasks = () => {
	const router = useRouter();

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: COLORS.dark,
			}}>
			<View style={styles.container}>
				<View
					style={{
						width: "100%",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						paddingVertical: 8,
					}}>
					<Icon name="logo" size={50} color={COLORS.light} />

					<Pressable
						onPress={() => router.push("/new-task")}
						style={{
							paddingHorizontal: 10,
							backgroundColor: COLORS.light,
							flexDirection: "row",
							alignItems: "center",
							gap: 8,
							height: 35,
							borderRadius: 35 / 2,
						}}>
						<Entypo name="plus" size={20} color={COLORS.dark} />
						<Text style={{ color: COLORS.dark, fontSize: 10 }}>Add Tasks</Text>
					</Pressable>
				</View>
				<WeekView />
			</View>
			<TasksContainer />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// height: "100%",
		padding: SPACING.small,
		gap: 8,
		// backgroundColor: "white",
	},
});

export default Tasks;
