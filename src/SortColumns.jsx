
let changeColumnsFunction;

let sleep = (ms) =>{
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default function sortColumns(algorithm, oldColumns, changeColumns){

    changeColumnsFunction = changeColumns;
    switch (algorithm){
        case "selectionSort":
            selectionSort(oldColumns)
            break;
        case "bubbleSort":
            bubbleSort(oldColumns)
            break;
        case "quickSort":
            quickSort(oldColumns)
            break;    
    }

}



async function selectionSort(oldColumns){
    for(let i=0; i < oldColumns.length-1; i++){
        let lowest = i;
        oldColumns[i].isLowest = true;

        for(let j=i+1; j<oldColumns.length; j++){
            oldColumns[j].isCurrent = true;
            changeColumnsFunction(oldColumns)
            await sleep(1);
            if(oldColumns[j].value < oldColumns[lowest].value){
                oldColumns[lowest].isLowest = false;
                lowest = j
                oldColumns[lowest].isLowest = true;
                oldColumns[i].isLowest = false;
                oldColumns[i].isCurrent = true;    
                changeColumnsFunction(oldColumns)   
            }

            oldColumns[j].isCurrent = false;
        }

        if(oldColumns[i].value != oldColumns[lowest].value) {
                [oldColumns[i], oldColumns[lowest]] = [oldColumns[lowest], oldColumns[i]]
                oldColumns[i].isLowest = false;
                await sleep(10);

                changeColumnsFunction(oldColumns)
    }

    oldColumns[i].isLowest = false;
    oldColumns[i].isCurrent = false;
    changeColumnsFunction(oldColumns)


    }
    oldColumns[i].isCurrent = false;
}

async function bubbleSort(oldColumns){
    for(let i=0; i < oldColumns.length; i++){
        for(let j=0; j<oldColumns.length-i-1; j++){
            oldColumns[j+1].isLowest = false
            oldColumns[j].isLowest = false
            oldColumns[j].isCurrent = true
            oldColumns[j+1].isCurrent = true
            changeColumnsFunction(oldColumns)
            await sleep(1);
            if(oldColumns[j].value > oldColumns[j+1].value){
                
                oldColumns[j+1].isLowest = true
                oldColumns[j+1].isCurrent = false
                changeColumnsFunction(oldColumns)
                
                await sleep(10);

                [oldColumns[j+1], oldColumns[j]] = [oldColumns[j], oldColumns[j+1]]
                
                changeColumnsFunction(oldColumns)                  
                await sleep(1);
    
 
            }else{
                await sleep(10);
                [oldColumns[j].isLowest, oldColumns[j].isCurrent] = [true, false]
                changeColumnsFunction(oldColumns)
                await sleep(1);   
            }
            
        oldColumns[j+1].isCurrent = false
        oldColumns[j+1].isLowest = false
        oldColumns[j].isCurrent = false
        oldColumns[j].isLowest = false
        changeColumnsFunction(oldColumns)
        await sleep(1);


        }
        
        
    }
}

async function quickSort(oldColumns){

    if(oldColumns.length <= 1){
        return oldColumns;
    }

    let pivot = oldColumns[0];
    let leftArr = [];
    let rightArr = [];

    for(let i=1; i< oldColumns.length; i++){
        pivot.isCurrent = true;
        oldColumns[i].isCurrent = true;
        changeColumnsFunction(oldColumns);
        await sleep(10);

        if(oldColumns[i].value<pivot.value){
            oldColumns[i].isLowest = true;
            changeColumnsFunction(oldColumns);
            await sleep(10);

            leftArr.push(oldColumns[i])
        }else{
            pivot.isLowest = true;
            changeColumnsFunction(oldColumns);
            await sleep(10);

            rightArr.push(oldColumns[i])
        }

        pivot.isCurrent = false;
        pivot.isLowest = false;
        oldColumns[i].isCurrent = false;
        oldColumns[i].isLowest = false;
        changeColumnsFunction(oldColumns);

    }

    changeColumnsFunction([...leftArr, pivot, ...rightArr]);


    return [... await quickSort(leftArr), pivot, ... await quickSort(rightArr)];
}
