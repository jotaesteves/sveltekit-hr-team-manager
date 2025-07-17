import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Define User interface
export interface User {
	id: number | null;
	name: string;
	email: string;
	role: string;
	department: string;
}

// Define store state interface
interface UserStoreState {
	users: User[];
	formUser: User;
	formMode: 'add' | 'edit';
	showForm: boolean;
	userToDelete: User | null;
	showDeleteConfirm: boolean;
}

// Initial sample data
const initialUsers: User[] = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john@example.com',
		role: 'Developer',
		department: 'Engineering'
	},
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', department: 'UX/UI' },
	{
		id: 3,
		name: 'Mike Johnson',
		email: 'mike@example.com',
		role: 'Manager',
		department: 'Operations'
	}
];

// Create empty user object
function createEmptyUser(): User {
	return { id: null, name: '', email: '', role: '', department: '' };
}

// Default initial state
const defaultState: UserStoreState = {
	users: initialUsers,
	formUser: createEmptyUser(),
	formMode: 'add',
	showForm: false,
	userToDelete: null,
	showDeleteConfirm: false
};

// Get initial state from localStorage or use default
function getInitialState(): UserStoreState {
	if (browser) {
		try {
			const savedState = localStorage.getItem('userStoreState');
			if (savedState) {
				const parsedState = JSON.parse(savedState) as UserStoreState;
				return {
					...defaultState,
					users: parsedState.users || defaultState.users
				};
			}
		} catch (error) {
			console.error('Error loading state from localStorage:', error);
		}
	}
	return defaultState;
}

// Create the store
const initialState = getInitialState();
const baseStore = writable<UserStoreState>(initialState);

// Helper to save state to localStorage
function saveToLocalStorage(state: UserStoreState): UserStoreState {
	if (browser) {
		try {
			localStorage.setItem('userStoreState', JSON.stringify(state));
		} catch (error) {
			console.error('Error saving state to localStorage:', error);
		}
	}
	return state;
}

// Export the store with methods
export const userStore = {
	subscribe: baseStore.subscribe,
	set: baseStore.set,
	update: baseStore.update,

	addUser: () => {
		baseStore.update((state) => ({
			...state,
			formMode: 'add' as const,
			formUser: createEmptyUser(),
			showForm: true
		}));
	},

	editUser: (user: User) => {
		baseStore.update((state) => ({
			...state,
			formMode: 'edit' as const,
			formUser: { ...user },
			showForm: true
		}));
	},

	saveUser: () => {
		baseStore.update((state) => {
			let newState;
			if (state.formMode === 'add') {
				const newId = Math.max(0, ...state.users.map((u) => u.id ?? 0)) + 1;
				const newUser = { ...state.formUser, id: newId };
				newState = {
					...state,
					users: [...state.users, newUser],
					showForm: false
				};
			} else {
				const updatedUsers = state.users.map((u) =>
					u.id === state.formUser.id ? state.formUser : u
				);
				newState = {
					...state,
					users: updatedUsers,
					showForm: false
				};
			}
			return saveToLocalStorage(newState);
		});
	},

	confirmDelete: (user: User) => {
		baseStore.update((state) => ({
			...state,
			userToDelete: user,
			showDeleteConfirm: true
		}));
	},

	deleteUser: () => {
		baseStore.update((state) => {
			if (state.userToDelete) {
				const newState = {
					...state,
					users: state.users.filter((u) => u.id !== state.userToDelete?.id),
					showDeleteConfirm: false,
					userToDelete: null
				};
				return saveToLocalStorage(newState);
			}
			return state;
		});
	},

	cancel: () => {
		baseStore.update((state) => ({
			...state,
			showForm: false,
			showDeleteConfirm: false
		}));
	},

	updateFormUser: (user: User) => {
		baseStore.update((state) => ({
			...state,
			formUser: user
		}));
	},

	resetStore: () => {
		baseStore.set(defaultState);
		saveToLocalStorage(defaultState);
	}
};
