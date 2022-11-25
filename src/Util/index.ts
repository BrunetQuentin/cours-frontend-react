import { LENGTHOFMESSAGE } from "../Components/Blog";
import { ArticleType } from "../Components/Blog/Article";

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

export const verifyArticle = (article: ArticleType) => {
    if (article.content.length < LENGTHOFMESSAGE) {
        alert('Le message doit faire au moins 140 caractères')
        return false
    } else if (article.author.length < 3) {
        alert('Le nom doit faire au moins 3 caractères')
        return false
    }

    return true
}