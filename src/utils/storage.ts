interface IExpiryItem<T> {
    expiry: number;
    value: T | null;
}

export const setWithExpiry = <T>(key: string, value: T, expiry: number): void => {
    const item: IExpiryItem<T> = {
        expiry,
        value,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = <T>(key: string): T | null => {
    const itemStr = localStorage.getItem(key);

    // if the item doesn't exist, return null
    if (!itemStr) {
        return null;
    }
    let item: IExpiryItem<T> = { expiry: 0, value: null };
    try {
        item = JSON.parse(itemStr);
    } catch (e) {
        return null;
    }

    if (!item.expiry || !item.value) {
        return null;
    }

    // compare the expiry time of the item with the current time
    if (!item.value || Math.floor(Date.now() / 1000) > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
};
