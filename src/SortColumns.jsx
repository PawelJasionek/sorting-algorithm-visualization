
let changeColumnsFunction;
let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms * 200

    ))
}

export default async function sortColumns(algorithm, oldColumns, changeColumns) {

    changeColumnsFunction = changeColumns;
    switch (algorithm) {
        case "selectionSort":
            await selectionSort(oldColumns)
            break;
        case "bubbleSort":
            await bubbleSort(oldColumns)
            break;
        case "quickSort":
            await quickSort(oldColumns)
            break;
        case "insertionSort":
            await insertionSort(oldColumns);
            break;
        case "mergeSort":
            await mergeSort(oldColumns);
            break;
    }

}



async function selectionSort(oldColumns) {
    for (let i = 0; i < oldColumns.length - 1; i++) {
        let lowest = i;
        oldColumns[i].isLowest = true;

        for (let j = i + 1; j < oldColumns.length; j++) {
            oldColumns[j].isCurrent = true;
            changeColumnsFunction([...oldColumns])
            await sleep(1);
            if (oldColumns[j].value < oldColumns[lowest].value) {
                oldColumns[lowest].isLowest = false;
                lowest = j
                oldColumns[lowest].isLowest = true;
                oldColumns[i].isLowest = false;
                oldColumns[i].isCurrent = true;
                changeColumnsFunction([...oldColumns])
            }

            oldColumns[j].isCurrent = false;
        }

        if (oldColumns[i].value != oldColumns[lowest].value) {
            [oldColumns[i], oldColumns[lowest]] = [oldColumns[lowest], oldColumns[i]]
            oldColumns[i].isLowest = false;
            await sleep(1);

            changeColumnsFunction([...oldColumns])
        }

        oldColumns[i].isLowest = false;
        oldColumns[i].isCurrent = false;
        oldColumns[lowest].isCurrent = false;
        changeColumnsFunction([...oldColumns])

        oldColumns[i].isCurrent = false;
    }

}

async function bubbleSort(oldColumns) {
    for (let i = 0; i < oldColumns.length; i++) {
        for (let j = 0; j < oldColumns.length - i - 1; j++) {
            oldColumns[j + 1].isLowest = false
            oldColumns[j].isLowest = false
            oldColumns[j].isCurrent = true
            oldColumns[j + 1].isCurrent = true
            changeColumnsFunction([...oldColumns])
            await sleep(1);
            if (oldColumns[j].value > oldColumns[j + 1].value) {

                oldColumns[j + 1].isLowest = true
                oldColumns[j + 1].isCurrent = false
                changeColumnsFunction([...oldColumns])

                await sleep(1);

                [oldColumns[j + 1], oldColumns[j]] = [oldColumns[j], oldColumns[j + 1]]

                changeColumnsFunction([...oldColumns])
                await sleep(1);


            } else {
                await sleep(1);
                [oldColumns[j].isLowest, oldColumns[j].isCurrent] = [true, false]
                changeColumnsFunction([...oldColumns])
                await sleep(1);
            }

            oldColumns[j + 1].isCurrent = false
            oldColumns[j + 1].isLowest = false
            oldColumns[j].isCurrent = false
            oldColumns[j].isLowest = false
            changeColumnsFunction([...oldColumns])
            await sleep(1);


        }


    }
}

async function quickSort(oldColumns, start = 0, end = oldColumns.length - 1) {
    if (start >= end) return;


    let pivotIndex = start;
    const pivotValue = oldColumns[pivotIndex].value;
    oldColumns[pivotIndex].isPivot = true;

    changeColumnsFunction(oldColumns.map(c => ({ ...c })));
    await sleep(1);

    let i = start + 1;

    for (let j = start + 1; j <= end; j++) {
        oldColumns[j].isCurrent = true;
        oldColumns[i].isCurrent = true;
        changeColumnsFunction(oldColumns.map(c => ({ ...c })));
        await sleep(1);

        if (oldColumns[j].value < pivotValue) {
            oldColumns[j].isLowest = true;
            changeColumnsFunction(oldColumns.map(c => ({ ...c })));
            await sleep(1);

            [oldColumns[i], oldColumns[j]] = [oldColumns[j], oldColumns[i]];


            changeColumnsFunction(oldColumns.map(c => ({ ...c })));
            await sleep(1);

            oldColumns[i].isCurrent = false;
            oldColumns[i].isLowest = false;
            i++;
        }

        oldColumns[j].isCurrent = false;
        oldColumns[j].isLowest = false;


    }


    const newPivotIndex = oldColumns.length == 2 ? i : i - 1;
    oldColumns[pivotIndex].isPivot = false;

    [oldColumns[pivotIndex], oldColumns[newPivotIndex]] = [oldColumns[newPivotIndex], oldColumns[pivotIndex]];

    changeColumnsFunction(oldColumns.map(c => ({ ...c.isCurrent = false })));
    await sleep(1);


    await quickSort(oldColumns, start, newPivotIndex - 1);

    await quickSort(oldColumns, newPivotIndex + 1, end)

}


async function insertionSort(oldColumns) {

    for (let i = 1; i < oldColumns.length; i++) {
        let key = { ...oldColumns[i] };
        let j = i - 1;
        oldColumns[i].isCurrent = true;
        if (j >= 0) oldColumns[j].isCurrent = true;
        changeColumnsFunction([...oldColumns]);
        await sleep(3);

        while (j >= 0 && oldColumns[j].value > key.value) {

            oldColumns[j].isCurrent = true;
            oldColumns[j + 1] = { ...oldColumns[j] };
            oldColumns[j].value = 0;
            changeColumnsFunction([...oldColumns]);
            await sleep(1);

            j--;
            oldColumns = oldColumns.map(col => ({ ...col, isCurrent: false, isLowest: false }));
            changeColumnsFunction([...oldColumns]);

        }

        j >= 0 && (oldColumns[j].isLowest = true);
        changeColumnsFunction([...oldColumns])
        await sleep(3);

        oldColumns[j + 1] = { ...key };
        oldColumns = oldColumns.map(col => ({ ...col, isCurrent: false, isLowest: false }));
        changeColumnsFunction([...oldColumns]);
        await sleep(1);

    }
}

async function mergeSort(columns, start = 0, end = columns.length - 1) {

    if (start >= end) return;
    let mid = Math.floor(start + (end - start) / 2);
    await mergeSort(columns, start, mid);
    await mergeSort(columns, mid + 1, end);
    await merge(columns, start, mid, end);



    async function merge(columns, start, mid, end) {
        let merged = [];
        let i = start;
        let j = mid + 1;

        while (i <= mid && j <= end) {
            columns[i].isCurrent = true;
            columns[j].isCurrent = true;
            changeColumnsFunction([...columns]);
            await sleep(1);

            if (columns[i].value < columns[j].value) {
                columns[i].isLowest = true;
                changeColumnsFunction([...columns]);
                await sleep(1);
                merged.push(columns[i]);
                i++;
            } else {
                columns[j].isLowest = true;
                changeColumnsFunction([...columns]);
                await sleep(1);
                merged.push(columns[j]);
                j++;
            }
            columns.forEach(col => {
                col.isCurrent = false
                col.isLowest = false
            });
        }

        while (i <= mid) {
            merged.push(columns[i]);
            i++;
        }

        while (j <= end) {
            merged.push(columns[j]);
            j++;
        }

        for (let i = 0; i < merged.length; i++) {
            columns[start + i] = merged[i];
            columns[start + i].isCurrent = true;
            changeColumnsFunction([...columns]);
            await sleep(1);
            columns[start + i].isCurrent = false;
        }
    }



}
