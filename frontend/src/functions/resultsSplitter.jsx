export default function ResultSpliter(resultString){
    let firstSide = ''
    let secondSide = ''
    
    if(resultString[1] === '+' || resultString[1] === '-') {
        firstSide = `${resultString[0]}${resultString[1]}`
    } else {
        firstSide = `${resultString[0]}`
    }

    if(resultString[5] === '0'){
        secondSide = `${resultString[4]}${resultString[5]}`
    }

    if(resultString[4] === '0' && resultString[3] !== '('){
        secondSide = `${resultString[3]}${resultString[4]}`
    }     
    
    if(resultString[5] === ')'){
        secondSide = `${resultString[4]}`
    }

    return {
        firstSide, secondSide
    }
}
