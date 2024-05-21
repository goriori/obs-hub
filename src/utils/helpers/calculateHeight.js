export const calculateHeight = (heightWindow) => {
    if (heightWindow <= 800) return 270
    else if (heightWindow < 1080) return 405
    else return 540
}