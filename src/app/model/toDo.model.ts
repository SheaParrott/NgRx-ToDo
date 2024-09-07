export type ToDo = {
    id: string;
    title: string;
    completed: boolean;
}

export type ToDosFilter = "all" | "pending" | "completed"