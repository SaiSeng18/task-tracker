export interface Task {
	id: number;
	title: string;
	description?: string | null;
	completed: boolean;
	createdAt: string; // Assuming ISO 8601 format for TIMESTAMP
	tags?: string;
}

export interface Tag {
	id: number;
	name: string;
}

export interface TaskTag {
	task_id: number;
	tag_id: number;
}
