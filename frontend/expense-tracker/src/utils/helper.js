import moment from "moment";
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}


export const getInitials = (fullName) => {
    if(!fullName) return '';
    const words = fullName.split(" ");
    let initials = "";
    for(let i = 0; i < Math.min(words.length, 2); i++){
        initials += words[i][0].toUpperCase();
    }
    return initials;
}

export const addThousandSeparator = (num) => {
    if(isNaN(num) || num === null) return "";
    
    const [integerPart , fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3}) + (?!\d))/g , ",");

    return fractionalPart
    ? `${formattedInteger}.${integerPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
    const charData = data.map((item) => ({
        month : item?.category,
        amount : item?.amount,
    }));
    return charData;
};

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) =>({
        month : moment(item?.date).format('Do MMM'),
        amount : item?.amount,
        source : item?.source,
    }));

    return chartData;
}

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) =>({
        month : moment(item?.date).format('Do MMM'),
        amount : item?.amount,
        category : item?.category,
    }));

    return chartData;
}