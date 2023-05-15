const minSMSValue = 100000;
const maxSMSValue = 999999;

export const generateSMSCode = () => {
    return Math.floor(Math.random() * (maxSMSValue - minSMSValue + 1) + minSMSValue)
}