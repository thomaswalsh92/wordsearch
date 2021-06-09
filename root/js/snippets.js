function createBoard () {
    let result = {}

    for (i = 0; i < boardSize; i++) {
        console.log(i)
        Object.defineProperty(result, `x${i}`, {})
    }
    for (j = 0; j < boardSize; j++) {
        let thisRow = result.rows[j]
        for (k = 0; k < boardSize; k++) { 
            thisRow.push(k)
        }
    } 
    return result
}