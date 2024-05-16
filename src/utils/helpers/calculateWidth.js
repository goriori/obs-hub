export const calculateWidth = (widthWindow) => {
    if (widthWindow <= 1600) return 520
    else if (widthWindow <= 1800) return 720
    else return 960
}