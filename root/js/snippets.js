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

function placeWord (wordsArr) { 
    for (let i = 0; i < wordsArr.length; i++) {
        let thisWord = wordsArr[i]
        thisWord.startPos = randomBoardSquare(boardSize)
        if (clearBoardEdges(thisWord))  {
            console.log ()
        }
    }
}

// object based initBoard -->
function initBoard () {
    return {
    x0: {y: undefined,
        y1: undefined,
        y2: undefined,
        y3: undefined,
        y4: undefined,
        y5: undefined,
        y6: undefined,
        y7: undefined,
        y8: undefined
        },
    x1: {y0: undefined,
        y1: undefined,
        y2: undefined,
        y3: undefined,
        y4: undefined,
        y5: undefined,
        y6: undefined,
        y7: undefined,
        y8: undefined
        },
    x2: {y0: undefined,
        y1: undefined,
        y2: undefined,
        y3: undefined,
        y4: undefined,
        y5: undefined,
        y6: undefined,
        y7: undefined,
        y8: undefined
        },
    x3: {y0: undefined,
        y1: undefined,
        y2: undefined,
        y3: undefined,
        y4: undefined,
        y5: undefined,
        y6: undefined,
        y7: undefined,
        y8: undefined
    },
    x4: {y0: undefined,
        y1: undefined,
        y2: undefined,
        y3: undefined,
        y4: undefined,
        y5: undefined,
        y6: undefined,
        y7: undefined,
        y8: undefined
        },
    x5: {y0: undefined,
        y1: undefined,
        y2: undefined,
        y3: undefined,
        y4: undefined,
        y5: undefined,
        y6: undefined,
        y7: undefined,
        y8: undefined
        },
    x6: {y0: undefined,
        y1: undefined,
        y2: undefined,
        y3: undefined,
        y4: undefined,
        y5: undefined,
        y6: undefined,
        y7: undefined,
        y8: undefined
        },
    x7: {y0: undefined,
        y1: undefined,
        y2: undefined,
        y3: undefined,
        y4: undefined,
        y5: undefined,
        y6: undefined,
        y7: undefined,
        y8: undefined
        },
    x8: {y0: undefined,
        y1: undefined,
        y2: undefined,
        y3: undefined,
        y4: undefined,
        y5: undefined,
        y6: undefined,
        y7: undefined,
        y8: undefined
        }
    }
}
