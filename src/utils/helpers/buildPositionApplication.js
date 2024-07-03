export const buildPositionApplication = (position, resolutionApplication, mainScreenPosition) => {
    return {
        x: position.x * (mainScreenPosition.width / Number(resolutionApplication[0])) || 0,
        y: position.y * (mainScreenPosition.height / Number(resolutionApplication[1])) || 0,
        width: position.width * (mainScreenPosition.width / Number(resolutionApplication[0])) || 0,
        height: position.height * (mainScreenPosition.height / Number(resolutionApplication[1])) || 0
    }
}