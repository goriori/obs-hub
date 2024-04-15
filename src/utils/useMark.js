export const useStrong = () => {
  const useStrongText = (originalValue, searchString) => {
    let textToSearch = searchString
    textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(`${textToSearch}`, 'gi')
    return originalValue.replace(pattern, (match) => `<mark>${match}</mark>`)
  }
  return { useStrongText }
}
