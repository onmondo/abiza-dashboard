export const computeFilteredList = (list, searchKeys, query) => {

    console.log("computeFilteredList triggered")
    return list.filter(item =>
        searchKeys.some(searchKey => {
            if (Array.isArray(item[searchKey])) {
                return item[searchKey].join(",").toLowerCase().includes(query)
            } else {
                return item[searchKey].toLowerCase().includes(query)
            }
        })
    )
}