export const getStorageItem = (name: string): string | null => localStorage.getItem(name)
export const setStorageItem = (name: string, value: string) => localStorage.setItem(name, value)
export const removeStorageItem = (name: string) => localStorage.removeItem(name)

export enum roles {
    ALL = "ALL",
}

export const capitalizeFirstLetter = (text: string) => text.toLowerCase().charAt(0).toUpperCase() + text.toLowerCase().slice(1);