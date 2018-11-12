function search (e) {
    window.location.replace(`${window.location.href}/book?q=${e.content.value}`)
    return false
}
