import { COLORS } from "@/constants/theme";
import { useScaleAnimation } from "@/utils/animations";
import { Task } from "@/utils/db/types";
import useTasksStore from "@/utils/store";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, TouchableHighlight } from "react-native";
import Animated from "react-native-reanimated";
import { RowMap } from "react-native-swipe-list-view";
const HiddenItem = ({
	item,
	index,
	rowMap,
}: {
	item: Task;
	index: number;
	rowMap: RowMap<Task>;
}) => {
	const { animatedStyle } = useScaleAnimation({ delay: 500 });
	const db = useSQLiteContext();
	const { handleCompletion, handleDelete } = useTasksStore();

	const completeTask = async () => {
		try {
			!item.completed && (await handleCompletion(db, item.id, true));

			if (rowMap[item.id]) {
				rowMap[item.id].closeRow(); // Close the row using the task's id
			}
		} catch (error) {
			throw error;
		}
	};

	const deleteTask = async () => {
		try {
			item.completed && (await handleDelete(db, item.id));

			if (rowMap[item.id]) {
				rowMap[item.id].closeRow(); // Close the row using the task's id
			}
		} catch (error) {
			throw error;
		}
	};

	return (
		<TouchableHighlight
			onPress={item.completed ? deleteTask : completeTask}
			style={{
				flex: 1,
				width: 180,
				alignSelf: "flex-end",
				borderRadius: 20,
				overflow: "hidden",
			}}>
			<Animated.View
				style={[
					animatedStyle,
					{
						flex: 1,
						backgroundColor: item.completed ? COLORS.red : COLORS.lime,
						borderRadius: 20,
						justifyContent: "center",
						alignItems: "center",
					},
				]}>
				{item.completed ? (
					<FontAwesome5
						name="trash"
						size={24}
						color={item.completed ? COLORS.light : COLORS.dark}
					/>
				) : (
					<FontAwesome5
						name="check"
						size={24}
						color={item.completed ? COLORS.light : COLORS.dark}
					/>
				)}

				<Text
					style={{
						fontSize: 20,
						textAlign: "center",
						color: item.completed ? COLORS.light : COLORS.dark,
					}}>
					{item.completed ? "Delete this task" : "Mark this as complete"}
				</Text>
			</Animated.View>
		</TouchableHighlight>
	);
};
export default HiddenItem;
