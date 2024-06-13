import { SQLiteDatabase } from "expo-sqlite/next";
import { Task } from "./types";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
	const DATABASE_VERSION = 1;
	let result = await db.getFirstAsync<{
		user_version: number;
	}>("PRAGMA user_version");
	let currentDbVersion = result?.user_version ?? 0;

	if (currentDbVersion >= DATABASE_VERSION) {
		console.log("Already on latest db");

		return;
	}
	if (currentDbVersion === 0) {
		const result = await db.execAsync(`
  	PRAGMA journal_mode = 'wal';
	CREATE TABLE tasks (
		id INTEGER PRIMARY KEY,
		title TEXT NOT NULL,
		description TEXT,
		completed BOOLEAN NOT NULL DEFAULT 0,
		createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TABLE tags (
		id INTEGER PRIMARY KEY,
		name TEXT NOT NULL UNIQUE
	);

	CREATE TABLE task_tags (
		task_id INTEGER,
		tag_id INTEGER,
		FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
		FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE,
		PRIMARY KEY (task_id, tag_id)
	);
  `);
		console.log(result);

		currentDbVersion = 1;
	}

	// 	await db.execAsync(`
	// 		INSERT INTO tasks (title, description, completed, createdAt) VALUES
	//     ('Complete project', 'Finish the coding project by the end of the week', 0, DATETIME('now')),
	//     ('Meeting with client', 'Discuss project requirements with the client', 0, DATETIME('now')),
	//     ('Prepare presentation', 'Create slides for the upcoming meeting', 0, DATETIME('now')),
	//     ('Review code', 'Review the code submitted by team members', 0, DATETIME('now'));

	// -- Inserting tags
	// INSERT INTO tags (name) VALUES
	//     ('Work'),
	//     ('Meeting'),
	//     ('Presentation'),
	//     ('Code Review');

	// -- Associating tasks with tags
	// INSERT INTO task_tags (task_id, tag_id) VALUES
	//     (1, 1), -- Complete project -> Work
	//     (2, 1), -- Meeting with client -> Work
	//     (2, 2), -- Meeting with client -> Meeting
	//     (3, 1), -- Prepare presentation -> Work
	//     (3, 3), -- Prepare presentation -> Presentation
	//     (4, 1), -- Review code -> Work
	//     (4, 4); -- Review code -> Code Review`);
	await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export const getTasks = async (db: SQLiteDatabase): Promise<Task[]> => {
	const tasks = await db.getAllAsync<Task>(`
			SELECT t.*, GROUP_CONCAT(tags.name) AS tags
			FROM tasks t
			LEFT JOIN task_tags ON t.id = task_tags.task_id
			LEFT JOIN tags ON task_tags.tag_id = tags.id
			GROUP BY t.id;
		`);

	return tasks;
};
export const getTasksByCompletion = async (
	db: SQLiteDatabase,
	complete: boolean
): Promise<Task[]> => {
	const tasks = await db.getAllAsync<Task>(`
    SELECT t.*, GROUP_CONCAT(tags.name) AS tags
    FROM tasks t
    LEFT JOIN task_tags ON t.id = task_tags.task_id
    LEFT JOIN tags ON task_tags.tag_id = tags.id
    WHERE t.completed = ${complete ? 1 : 0} -- Use 1 for true and 0 for false
    GROUP BY t.id;
`);

	return tasks;
};
