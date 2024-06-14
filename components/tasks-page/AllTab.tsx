import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";

import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";

type TabProps = "all" | "completed" | "in progress" | "uncompleted";

type Tab = {
	title: string;
	value: TabProps;
};

export const AllTab = () => {
	return <></>;
};

const styles = StyleSheet.create({
	container: {},
});
