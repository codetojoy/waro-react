
export const log = (message) => {
    console.log(`TRACER ${message}`);
}

export const logObj = (message, obj) => {
    console.log(`TRACER ${message} obj:`);
    console.log(obj);
}
