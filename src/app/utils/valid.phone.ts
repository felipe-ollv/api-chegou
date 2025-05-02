
export function isValidPhone(phone: string) {
    const regex = /^[1-9]{2}9\d{8}$/;
    return regex.test(phone);
}