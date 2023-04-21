
let changeColumnsFunction;

export default function sortColumns(algorithm, columns, changeColumns){

    changeColumnsFunction = changeColumns;

    switch (algorithm){
        case "selectionSort":
            selectionSort(columns)
            break;
    }

}

function selectionSort(columns){
    for(let i=0; i < columns.length-1; i++){
        for(let j=i; j<columns.length-1; j++){
            if(columns[j] > columns[j+1]){
                const temp = columns[j+1]
                columns[j+1] = columns[j]
                columns[j] = temp
                changeColumnsFunction(columns);

            }
        }
    }
}
