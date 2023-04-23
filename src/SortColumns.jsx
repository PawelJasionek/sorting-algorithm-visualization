
let changeColumnsFunction;

export default function sortColumns(algorithm, oldColumns, changeColumns){

    changeColumnsFunction = changeColumns;

    switch (algorithm){
        case "selectionSort":
            selectionSort(oldColumns)
            break;
    }

}

function selectionSort(oldColumns){
    for(let i=0; i < oldColumns.length-1; i++){
        for(let j=i; j<oldColumns.length-1; j++){
            if(oldColumns[j] > oldColumns[j+1]){
                const temp = oldColumns[j+1]
                oldColumns[j+1] = oldColumns[j]
                oldColumns[j] = temp
                changeColumnsFunction(oldColumns);

            }
        }
    }
}
