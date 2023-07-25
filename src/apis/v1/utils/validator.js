const validVal = (obj) => {
    if (obj === undefined || obj === null || obj === '' || obj.length == 0) {
        return false;
    }
    return true;
};
