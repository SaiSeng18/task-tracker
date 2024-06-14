import create from "zustand";
import {
	getTasks,
	getTasksByCompletion,
	addTask as addTaskToDB,
} from "@/utils/db";
import { useSQLiteContext } from "expo-sqlite/build";
import { Task } from "@/utils/db/types";

interface TasksStore {
	tasks: Task[];
	fetchAll: () => Promise<void>;
	fetchCompleted: () => Promise<void>;
	fetchInProgress: () => Promise<void>;
	addTask: (
		title: string,
		description: string,
		completed: boolean,
		tags: string[]
	) => Promise<void>;
}
const db = useSQLiteContext();
const useTasksStore = create<TasksStore>((set, get) => ({
	tasks: [],
	fetchAll: async () => {
		const data = await getTasks(db);
		set({ tasks: data });
	},
	fetchCompleted: async () => {
		const data = await getTasksByCompletion(db, true);
		set({ tasks: data });
	},
	fetchInProgress: async () => {
		const data = await getTasksByCompletion(db, false);
		set({ tasks: data });
	},
	addTask: async (title, description, completed, tags) => {
		await addTaskToDB(db, title, description, completed, tags);
		get().fetchAll();
	},
}));

export default useTasksStore;
