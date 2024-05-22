export const calculateHeight = (heightWindow, widthWindow) => {
    if (widthWindow <= 1600) return 270
    else if (widthWindow < 1800) return 405
    else return 540
}