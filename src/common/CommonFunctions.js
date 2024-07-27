import { format } from 'date-fns';
import React from 'react';

export const convertUserName = (userName) => {
    let convertedUserName = userName != undefined ? userName.charAt(0).toUpperCase() + userName.slice(1) : "";
    return convertedUserName;
}

export const transFormDate = (date) => {
    console.log(date.substring(0,10))

    let newDate = date != undefined && new Date(date);
    let transFormedDate;
    if (isNaN(newDate.getTime())) {
        // Date is invalid
        alert("invalid date");
        return
      } else {
        // Format the date using date-fns
        transFormedDate = format(date, 'dd/MM/yyyy');
      }
    return transFormedDate;
}