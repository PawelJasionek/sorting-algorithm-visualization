import React from "react"

export default function Column({value}){
    const styles={
        height: `${value*2}%`
    }
console.log(value)

    return (
        <div className="column" style={styles}>
                {value}
        </div>
    )
}