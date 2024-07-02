


export const loadFile = (accept) => {
    return new Promise((resolve, reject) => {
        let file
        const formLoadElement = document.createElement('input')
        formLoadElement.setAttribute('type', 'file')
        formLoadElement.setAttribute('accept', accept)
        formLoadElement.click()
        const listenerId = formLoadElement.onchange = e => {
            file = e.target.files[0]
            if (!file) reject({error: 'file is undefined'})
            resolve(file)
            formLoadElement.removeEventListener('change', listenerId)
        }
    })
}