export interface ITask {
    id: string;
    title: string;
    creationDate: string;
    description: string;
    complated: boolean;
    totalTime: string;
}

export interface IProject {
    id: string;
    title: string;
    description: string;
    notes: string;
    creationDate: string;
    totalTime: string;
    complated: boolean;
    tasks: ITask[];
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    projects: IProject[];
}