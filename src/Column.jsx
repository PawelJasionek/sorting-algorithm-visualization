import React from "react"

export default function Column({value, isCurrent, isLowest}){
    const styles={
        height: `${value*2}%`,
        backgroundColor: isLowest? "green" : (isCurrent ? "red" : "black")
    }

    return (
        <div className="column" style={styles}>
        </div>
    )
}