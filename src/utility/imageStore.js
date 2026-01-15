// Lightweight IndexedDB helpers for storing form images across login redirects

const DB_NAME = "eventFormDB";
const DB_VERSION = 1;
const STORE_NAME = "images";
const KEY = "pendingImages";

function openDb() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function tx(db, mode = "readonly") {
    return db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
}

export async function saveFormImages(imagesPayload) {
    try {
        const db = await openDb();
        await new Promise((resolve, reject) => {
            const store = tx(db, "readwrite");
            const request = store.put(imagesPayload, KEY);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch (_) {
        // ignore persistence failures
    }
}

export async function restoreFormImages() {
    try {
        const db = await openDb();
        const data = await new Promise((resolve, reject) => {
            const store = tx(db, "readonly");
            const request = store.get(KEY);
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
        return data;
    } catch (_) {
        return null;
    }
}

export async function clearFormImages() {
    try {
        const db = await openDb();
        await new Promise((resolve, reject) => {
            const store = tx(db, "readwrite");
            const request = store.delete(KEY);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch (_) {
        // ignore
    }
}


