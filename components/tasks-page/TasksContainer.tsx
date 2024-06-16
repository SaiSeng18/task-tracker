import { COLORS } from "@/constants/theme";
import React, { useEffect } from "react";
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite/build";
import { Task } from "@/utils/db/types";
import { TaskCard } from "./TaskCard";
import { SwipeListView } from "react-native-swipe-list-view";
import useTasksStore from "@/utils/store";
import HiddenItem from "./HiddenItem";

export const TasksContainer = () => {
	const db = useSQLiteContext();

	const loading = useTasksStore((state) => state.loading);
	const activeTab = useTasksStore((state) => state.activeTab);
	const tasks = useTasksStore((state) => state.tasks);
	const completedTasks = useTasksStore((state) => state.completedTasks);
	const uncompletedTasks = useTasksStore((state) => state.uncompletedTasks);
	const fetchAll = useTasksStore((state) => state.fetchAll);
	const fetchCompleted = useTasksStore((state) => state.fetchCompleted);
	const fetchInProgress = useTasksStore((state) => state.fetchInProgress);

	useEffect(() => {
		fetchAll(db);
	}, []);

	const getTasks = (): Task[] => {
		switch (activeTab) {
			case "all":
				return tasks;
			case "completed":
				return completedTasks;
			case "in progress":
				return uncompletedTasks;
			default:
				return tasks;
		}
	};

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

			{loading ? (
				<ActivityIndicator size="large" color={COLORS.light} />
			) : tasks.length === 0 ? (
				<View style={styles.noTasksContainer}>
					<Text style={styles.noTasksText}>No tasks found</Text>
					<Text style={styles.noTasksText}>Complete or Add more task</Text>
				</View>
			) : (
				<SwipeListView
					data={getTasks()}
					keyExtractor={(item, index) => item.id.toString()}
					ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
					renderItem={({ item, index }) => <TaskCard task={item} index={index} />}
					renderHiddenItem={(data, rowMap) => (
						<HiddenItem index={data.index} item={data.item} rowMap={rowMap} />
					)}
					rightOpenValue={-200}
					disableRightSwipe
				/>
			)}
		</View>
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
