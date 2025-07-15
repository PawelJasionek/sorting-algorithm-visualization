import React from "react"

export default function Column({ value, isCurrent = false, isLowest = false, isPivot = false}) {
    const styles = {
        height: `${value * 2}%`,
        backgroundColor: isPivot ? "white" : isLowest ? "green" : (isCurrent ? "red" : "black")

    }

    return (
        <div className="column" style={styles}>
        </div>
    )
}