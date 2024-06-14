import { create } from "zustand";
import {
	getTasks,
	getTasksByCompletion,
	addTask as addTaskToDB,
	updateTaskCompletion,
} from "@/utils/db";
import { SQLiteDatabase } from "expo-sqlite/build";
import { Task } from "@/utils/db/types";

interface TasksStore {
	tasks: Task[];
	fetchAll: (db: SQLiteDatabase) => Promise<void>;
	fetchCompleted: (db: SQLiteDatabase) => Promise<void>;
	fetchInProgress: (db: SQLiteDatabase) => Promise<void>;
	addTask: (
		db: SQLiteDatabase,
		title: string,
		description: string,
		completed: boolean,
		tags: string[]
	) => Promise<void>;
	handleCompletion: (
		db: SQLiteDatabase,
		id: number,
		completed: boolean
	) => Promise<void>;
	activeTab: "all" | "completed" | "in progress";
	setActiveTab: (tab: "all" | "completed" | "in progress") => void;
}
const useTasksStore = create<TasksStore>((set, get) => ({
	tasks: [],
	activeTab: "all",
	setActiveTab: (tab) => set({ activeTab: tab }),
	fetchAll: async (db) => {
		const data = await getTasks(db);
		set({ tasks: data });
		set({ activeTab: "all" });
	},
	fetchCompleted: async (db) => {
		const data = await getTasksByCompletion(db, true);
		set({ tasks: data });
		set({ activeTab: "completed" });
	},
	fetchInProgress: async (db) => {
		const data = await getTasksByCompletion(db, false);
		set({ tasks: data });
		set({ activeTab: "in progress" });
	},
	addTask: async (db, title, description, completed, tags) => {
		await addTaskToDB(db, title, description, completed, tags);
		get().fetchAll(db);
	},
	handleCompletion: async (db, id, completed) => {
		await updateTaskCompletion(db, id, completed);
		get().fetchCompleted(db);
	},
}));

export default useTasksStore;
