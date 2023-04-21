import React from "react"

export default function Column({number}){
    const styles={
        height: `${number*2}%`
    }
    return (
        <div className="column" style={styles}>

        </div>
    )
}