import React from "react"

export default function Column({number}){
    const styles={
        height: `${number*2}%`
    }
console.log(number)

    return (
        <div className="column" style={styles}>
                {number}
        </div>
    )
}