





[3,7,10]


export const toggleLikeFnc = (pid: number) => {
    const stLikes = localStorage.getItem('likes')
    if (stLikes) {
        // daha önceden dizi var, çıkar
        const arr = JSON.parse(stLikes) as number[]
        const index = arr.findIndex(item => item === pid)
        if (index > -1) {
            // var diziden çıkar
            arr.splice(index, 1)
            localStorage.setItem('likes', JSON.stringify(arr))
        }else {
            // yok diziye ekle
            arr.push(pid)
            localStorage.setItem('likes', JSON.stringify(arr))
        }
    }else {
        // daha önceden dizi yok, oluştur
        const arr = [pid]
        localStorage.setItem('likes', JSON.stringify(arr))
    }
}

export const likesArr = () => {
    const stLikes = localStorage.getItem('likes')
    if (stLikes) {
        return JSON.parse(stLikes) as number[]
    }
    return []
}