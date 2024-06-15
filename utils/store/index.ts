import { create } from "zustand";
import {
	getTasks,
	getTasksByCompletion,
	addTask as addTaskToDB,
	updateTaskCompletion,
	deleteTask,
} from "@/utils/db";
import { SQLiteDatabase } from "expo-sqlite/build";
import { Task } from "@/utils/db/types";

interface TasksStore {
	tasks: Task[];
	loading: boolean;
	activeTab: "all" | "completed" | "in progress";
	setActiveTab: (tab: "all" | "completed" | "in progress") => void;
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
	handleDelete: (db: SQLiteDatabase, id: number) => Promise<void>;
}
const useTasksStore = create<TasksStore>((set, get) => ({
	tasks: [],
	loading: false,
	activeTab: "all",
	setActiveTab: (tab) => set({ activeTab: tab }),
	fetchAll: async (db) => {
		set({ loading: true });
		const data = await getTasks(db);
		set({ tasks: data, loading: false });
		set({ activeTab: "all" });
	},
	fetchCompleted: async (db) => {
		set({ loading: true });
		const data = await getTasksByCompletion(db, true);
		set({ tasks: data, loading: false });
		set({ activeTab: "completed" });
	},
	fetchInProgress: async (db) => {
		set({ loading: true });
		const data = await getTasksByCompletion(db, false);
		set({ tasks: data, loading: false });
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
	handleDelete: async (db, id) => {
		await deleteTask(db, id);
		get().fetchAll(db);
	},
}));

export default useTasksStore;
