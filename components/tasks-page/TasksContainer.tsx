import { COLORS } from "@/constants/theme";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { getTasks, getTasksByCompletion } from "@/utils/db";
import { useSQLiteContext } from "expo-sqlite/build";
import { Task } from "@/utils/db/types";
import { TaskCard } from "./TaskCard";

export const TasksContainer = () => {
	const tabs = [
		{ title: "All", value: "all", function: () => fetchAll() },
		{ title: "Completed", value: "completed", function: () => fetchCompleted() },
		{
			title: "In Progress",
			value: "in progress",
			function: () => fetchInProgress(),
		},
	];
	const [activeTab, setActiveTab] = useState(tabs[0].value);
	const [tasks, setTasks] = useState<Task[]>([]);

	const db = useSQLiteContext();

	useEffect(() => {
		fetchAll();
	}, []);

	const fetchAll = async () => {
		const data = await getTasks(db);
		setTasks(data);
		setActiveTab("all");
	};

	const fetchCompleted = async () => {
		const data = await getTasksByCompletion(db, true);
		setTasks(data);
		setActiveTab("completed");
	};

	const fetchInProgress = async () => {
		const data = await getTasksByCompletion(db, false);
		setTasks(data);
		setActiveTab("in progress");
	};
	console.log(tasks);

	return (
		<View style={styles.container}>
			<View style={styles.tabContainer}>
				{tabs.map((tab) => (
					<Pressable
						key={tab.value}
						style={[
							styles.tab,
							{
								backgroundColor: tab.value === activeTab ? COLORS.light : COLORS.dark,
							},
						]}
						onPress={tab.function}>
						<Text
							style={{ color: tab.value === activeTab ? COLORS.dark : COLORS.light }}>
							{tab.title}
						</Text>
					</Pressable>
				))}
			</View>

			{/* {Array(5)
				.fill(null)
				.map((_, index) => (
					<Task key={index} />
				))} */}
			{tasks.length === 0 && (
				<View
					style={{
						height: "100%",
					}}>
					<Text style={{ color: COLORS.light, fontSize: 24 }}>No tasks found</Text>
				</View>
			)}

			<FlatList
				data={tasks}
				ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
				renderItem={({ item, index }) => <TaskCard task={item} index={index} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		paddingHorizontal: 10,
	},
	tabContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 16,
		marginBottom: 20,
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
});
