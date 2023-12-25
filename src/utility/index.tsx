export const getStorageItem = (name: string): string | null => localStorage.getItem(name)
export const setStorageItem = (name: string, value: string) => localStorage.setItem(name, value)
export const removeStorageItem = (name: string) => localStorage.removeItem(name)

export enum roles {
    ALL = "ALL",
}

export const capitalizeFirstLetter = (text: string) => text.toLowerCase().charAt(0).toUpperCase() + text.toLowerCase().slice(1);

export const debounce = (func: Function, wait: number): Function => {
    let timeout: number | any;
    return (...args: any) => {
        const context = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
}