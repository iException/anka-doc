function search (e) {
    location.pathname = `/?q=${e.content.value}`
    return false
}
