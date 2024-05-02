export class SourceDto {
    constructor(screen) {
        this[screen?.type] = {
            ...screen
        }
    }
}