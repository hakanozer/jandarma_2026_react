import { decrypt, encrypt } from "./dataCrypto"

export const toggleLikeFnc = (pid: number) => {
    const stLikes = localStorage.getItem('likes')
    try {
        if (stLikes) {
            // daha önceden dizi var, çıkar
            const arr = JSON.parse( decrypt(stLikes) ) as number[]
            const index = arr.findIndex(item => item === pid)
            if (index > -1) {
                // var diziden çıkar
                arr.splice(index, 1)
                localStorage.setItem('likes', encrypt(JSON.stringify(arr)) )
            }else {
                // yok diziye ekle
                arr.push(pid)
                localStorage.setItem('likes', encrypt(JSON.stringify(arr)) )
            }
        }else {
            // daha önceden dizi yok, oluştur
            const arr = [pid]
            localStorage.setItem('likes', encrypt(JSON.stringify(arr)) )
        }
    }catch {
        localStorage.removeItem('likes')
        window.location.reload()
    }
}

export const likesArr = () => {
    try {
        const stLikes = localStorage.getItem('likes')
        if (stLikes) {
            return JSON.parse(decrypt(stLikes)) as number[]
        }
    }catch {
        localStorage.removeItem('likes')
        window.location.reload()
    }
    return []
}