export const setWithExpiry = <T>(key: string, value: T, expiry: number): void => {
    const item = {
        expiry,
        value: value,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = <T>(key: string): T | null => {
    const itemStr = localStorage.getItem(key);

    // if the item doesn't exist, return null
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);

    // compare the expiry time of the item with the current time
    if (Math.floor(Date.now() / 1000) > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
};
