export const delay = (minimumTime = 500) => {
    return new Promise(resolve => setTimeout(resolve, minimumTime));
};

export const stallPromise = (promise: Promise<any>, minimumTime = 500) => {
    const timePromise = delay(minimumTime);
    return Promise.all([promise, timePromise]).then((results: any[]) => results[0]);
};