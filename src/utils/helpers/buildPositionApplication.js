export const buildPositionApplication = (position, resolutionApplication, mainScreenPosition) => {
    console.log(position, resolutionApplication, mainScreenPosition)
    console.log({
        x: position.x * (mainScreenPosition.width / Number(resolutionApplication[0])),
        y: (mainScreenPosition.height / Number(resolutionApplication[1])),
        width: position.width * (mainScreenPosition.width / Number(resolutionApplication[0])),
        height: position.height * (mainScreenPosition.height / Number(resolutionApplication[1]))
    })

    return {
        x: position.x * (mainScreenPosition.width / Number(resolutionApplication[0])) || 0,
        y: (mainScreenPosition.height / Number(resolutionApplication[1])) || 0,
        width: position.width * (mainScreenPosition.width / Number(resolutionApplication[0])) || 0,
        height: position.height * (mainScreenPosition.height / Number(resolutionApplication[1])) || 0
    }
}