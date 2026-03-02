export function formatDate(date : Date, formateType: string) {
    let formatedDate = formateType;

    let hours = date.getHours();
    if (formateType.includes("n") || formateType.includes("N"))
    {   
        if (hours > 12) hours -= 12;
        else if (hours == 0) hours = 12;
    }

    // y-mm-dd hh:ii:ss

    // Seconds, Minutes, Hours
    formatedDate = formatedDate.replace("ss", date.getSeconds().toString().padStart(2, "0"));
    formatedDate = formatedDate.replace("s", date.getSeconds().toString());
    formatedDate = formatedDate.replace("ii", date.getMinutes().toString().padStart(2, "0"));
    formatedDate = formatedDate.replace("i", date.getMinutes().toString());
    formatedDate = formatedDate.replace("hh", hours.toString().padStart(2, "0"));
    formatedDate = formatedDate.replace("h", hours.toString());

    // Day, Month, Year, Meridiem
    formatedDate = formatedDate.replace("dd", date.getDate().toString().padStart(2, "0"));
    formatedDate = formatedDate.replace("d", date.getDate().toString());
    formatedDate = formatedDate.replace("mm", (date.getMonth() + 1).toString().padStart(2, "0"));
    formatedDate = formatedDate.replace("m", (date.getMonth() + 1).toString());
    formatedDate = formatedDate.replace("y", date.getFullYear().toString());
    formatedDate = formatedDate.replace("n", (date.getHours() > 12 ? "pm" : "am"));
    formatedDate = formatedDate.replace("N", (date.getHours() > 12 ? "PM" : "AM"));

    return formatedDate;
}