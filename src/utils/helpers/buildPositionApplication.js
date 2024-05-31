export const buildPositionApplication = (position, positionApplication, resolutionApplication) => {
    console.log(position, positionApplication, resolutionApplication)
    return {
        x: (position.x * positionApplication.width) / resolutionApplication[0] || 0,
        y: (position.y * positionApplication.height) / resolutionApplication[1] || 0,
        width: (position.width * positionApplication.width) / resolutionApplication[0] || 0,
        height: (position.height * positionApplication.height) / resolutionApplication[1] || 0
    }
}