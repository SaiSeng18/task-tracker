import { COLORS } from "@/constants/theme";
import React, { useEffect, useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View,
} from "react-native";
import {
	getTasks,
	getTasksByCompletion,
	updateTaskCompletion,
} from "@/utils/db";
import { useSQLiteContext } from "expo-sqlite/build";
import { Task } from "@/utils/db/types";
import { TaskCard } from "./TaskCard";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { useScaleAnimation } from "@/utils/animations";
import Animated from "react-native-reanimated";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import useTasksStore from "@/utils/store";

export const TasksContainer = () => {
	const db = useSQLiteContext();

	const { activeTab, tasks, fetchAll, fetchCompleted, fetchInProgress } =
		useTasksStore();

	useEffect(() => {
		fetchAll(db);
	}, []);

	console.log(tasks);

	return (
		<View style={styles.container}>
			<View style={styles.tabContainer}>
				<Pressable
					style={[
						styles.tab,
						{
							backgroundColor: activeTab === "all" ? COLORS.light : COLORS.dark,
						},
					]}
					onPress={() => fetchAll(db)}>
					<Text style={{ color: activeTab === "all" ? COLORS.dark : COLORS.light }}>
						All
					</Text>
				</Pressable>

				<Pressable
					style={[
						styles.tab,
						{
							backgroundColor: activeTab === "completed" ? COLORS.light : COLORS.dark,
						},
					]}
					onPress={() => fetchCompleted(db)}>
					<Text
						style={{ color: activeTab === "completed" ? COLORS.dark : COLORS.light }}>
						Completed
					</Text>
				</Pressable>

				<Pressable
					style={[
						styles.tab,
						{
							backgroundColor:
								activeTab === "in progress" ? COLORS.light : COLORS.dark,
						},
					]}
					onPress={() => fetchInProgress(db)}>
					<Text
						style={{
							color: activeTab === "in progress" ? COLORS.dark : COLORS.light,
						}}>
						In Progress
					</Text>
				</Pressable>
			</View>

			{tasks.length === 0 ? (
				<View style={styles.noTasksContainer}>
					<Text style={styles.noTasksText}>No tasks found</Text>
					<Text style={styles.noTasksText}>Complete or Add more task</Text>
				</View>
			) : (
				<SwipeListView
					data={tasks}
					keyExtractor={(item, index) => item.id.toString()}
					ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
					renderItem={({ item, index }) => <TaskCard task={item} index={index} />}
					renderHiddenItem={(data, rowMap) => (
						<HiddenItem index={data.index} item={data.item} rowMap={rowMap} />
					)}
					rightOpenValue={-200}
				/>
			)}
		</View>
	);
};

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
	const { handleCompletion } = useTasksStore();

	const handleComplete = async () => {
		try {
			await handleCompletion(db, item.id, true);
			if (rowMap[item.id]) {
				rowMap[item.id].closeRow(); // Close the row using the task's id
			}
		} catch (error) {
			throw error;
		}
	};

	return (
		<TouchableHighlight
			onPress={handleComplete}
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
					Mark this as complete
				</Text>
			</Animated.View>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		paddingHorizontal: 8,
	},
	tabContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 8,
		marginBottom: 8,
	},
	tab: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: 40,
		borderRadius: 20,
	},
	tabText: {
		fontSize: 8,
	},
	pagerView: {
		flex: 1,
		padding: 16,
	},
	page: {
		flex: 1,
	},
	noTasksContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.light,
		borderRadius: 20,
	},
	noTasksText: {
		color: COLORS.dark,
		fontSize: 18,
	},
});
