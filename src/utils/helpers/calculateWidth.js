export const calculateWidth = (widthWindow, heightWindow) => {
    if (widthWindow <= 1600) return 480
    else if (widthWindow <= 1800) return 720
    else return 960
}