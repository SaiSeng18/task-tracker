import { COLORS, SPACING } from "@/constants/theme";
import {
	View,
	Text,
	ScrollView,
	TextInput,
	StyleSheet,
	Pressable,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import { Icon } from "@/constants/icons";
import { useRouter } from "expo-router";
// import { addTask } from "@/utils/db";
// import { useSQLiteContext } from "expo-sqlite";
import useTasksStore from "@/utils/store";
import { useSQLiteContext } from "expo-sqlite";

const NewTask = () => {
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState("");
	const router = useRouter();
	const [task, setTask] = useState({
		title: "",
		description: "",
		completed: false,
		tags,
	});

	const addTask = useTasksStore((state) => state.addTask);

	useEffect(() => {
		setTask((prevTask) => ({
			...prevTask,
			tags: tags,
		}));
	}, [tags]);

	const addTag = () => {
		if (!tagInput) return;
		setTags([...tags, tagInput]);
		setTagInput("");
	};

	const deleteTag = (index: number) => {
		const newTags = [...tags];
		newTags.splice(index, 1);
		setTags(newTags);
	};

	const db = useSQLiteContext();

	const handleAddTask = async () => {
		try {
			await addTask(db, task.title, task.description, task.completed, task.tags);

			router.navigate("/task");
		} catch (error) {
			throw error;
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150}>
			<ScrollView
				style={{ backgroundColor: COLORS.dark, flex: 1, padding: SPACING.small }}>
				<View
					style={{
						width: "100%",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						paddingVertical: 16,
						marginBottom: 20,
					}}>
					<Icon name="logo" size={50} color={COLORS.light} />

					<Text style={{ color: COLORS.light, fontSize: 16 }}>Create New Task</Text>
				</View>
				<View style={{ width: "100%", gap: 20 }}>
					<View style={{ gap: 10 }}>
						<Text style={{ fontSize: 18, color: COLORS.light }}>Title</Text>
						<TextInput
							style={styles.textInput}
							onChangeText={(text) => setTask({ ...task, title: text })}
						/>
					</View>
					<View style={{ gap: 10 }}>
						<Text style={{ fontSize: 18, color: COLORS.light }}>Description</Text>
						<TextInput
							style={[styles.textInput, { textAlignVertical: "top", height: 120 }]}
							multiline={true}
							numberOfLines={4}
							onChangeText={(text) => setTask({ ...task, description: text })}
						/>
					</View>
					<View>
						<View style={{ gap: 10, marginBottom: 10 }}>
							<Text style={{ fontSize: 18, color: COLORS.light }}>Tag</Text>
							<View style={{ flexDirection: "row", gap: 10 }}>
								<TextInput
									style={styles.textInput}
									onChangeText={setTagInput}
									value={tagInput}
								/>
								<Pressable
									onPress={addTag}
									style={{
										justifyContent: "center",
										alignItems: "center",
										width: 70,
										backgroundColor: COLORS.lime,
										borderRadius: 10,
									}}>
									<Ionicons name="add" size={32} color={COLORS.dark} />
								</Pressable>
							</View>
						</View>
						{tags.length > 0 && (
							<View
								style={{ flex: 1, flexWrap: "wrap", flexDirection: "row", gap: 10 }}>
								{tags.map((tag, i) => (
									<View style={styles.tag} key={i}>
										<Text style={{ fontSize: 18 }}>{tag}</Text>
										<Pressable onPress={() => deleteTag(i)}>
											<Entypo name="cross" size={24} color={COLORS.dark} />
										</Pressable>
									</View>
								))}
							</View>
						)}
					</View>

					<Pressable
						onPress={handleAddTask}
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							height: 50,
							backgroundColor: COLORS.lime,
							borderRadius: 10,
							gap: 10,
						}}>
						<Ionicons name="add-outline" size={32} color={COLORS.dark} />
						<Text style={{ fontSize: 18 }}>Add Task</Text>
					</Pressable>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
export default NewTask;

const styles = StyleSheet.create({
	textInput: {
		backgroundColor: COLORS.light,
		borderRadius: 10,
		padding: 10,
		color: COLORS.dark,
		flex: 1,
	},
	tag: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 10,
		backgroundColor: COLORS.lime,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
		flexShrink: 1,
	},
});
