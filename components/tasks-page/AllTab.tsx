import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import { Task } from "./TaskCard";
import React from "react";

type TabProps = "all" | "completed" | "in progress" | "uncompleted";

type Tab = {
	title: string;
	value: TabProps;
};

export const AllTab = () => {
	const tabs: Tab[] = [
		{ title: "All", value: "all" },
		{ title: "Completed", value: "completed" },
		{ title: "In Progress", value: "in progress" },
		{ title: "Uncompleted", value: "uncompleted" },
	];

	const { width } = useWindowDimensions();

	return (
		<View style={{ gap: 16, width, paddingHorizontal: 8 }}>
			{/* {Array(5)
				.fill(null)
				.map((_, index) => (
					<Task key={index} />
				))} */}

			<FlatList
				data={tabs}
				ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
				renderItem={(tab) => <Task />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});
