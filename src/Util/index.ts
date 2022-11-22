
// function that transform a list of key-index to a list of values
export const keysIndexToList = (object: any, key: string) => {
    const tab: any[] = []
    let index: number = 1
    while(object){
        
        if(object[key + index] === undefined) break;
        if(object[key + index] !== "") tab.push(object[key + index])
        delete object[key + index]
        index++
    }
    return tab
}