export const dateTimeConverter = (dateTimeString) => {
    const array = dateTimeString.split("T");
    const unformattedDateOnly = new Date(array[0]);
    
    const month = String(unformattedDateOnly.getMonth() + 1).padStart(2, "0");
    const day = String(unformattedDateOnly.getDate()).padStart(2, "0");
    const year = unformattedDateOnly.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
}