// SHA-256 hash (built into the browser). Same idea as PHP's password_hash():
// we store the hash, never the real password.
export async function hashPassword(password) {
  if (window.crypto?.subtle) {
    const bytes = new TextEncoder().encode(password)
    const buf = await window.crypto.subtle.digest('SHA-256', bytes)
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
  }
  return btoa(unescape(encodeURIComponent(password))) // fallback for very old browsers
}

export const money = (n) => `$${Number(n).toFixed(2)}`

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

export const nextId = (list) => list.reduce((max, item) => Math.max(max, item.id), 0) + 1

// Admin image upload: no server, so we shrink the picture and keep it as text (data URL).
export function fileToDataUrl(file, maxSize = 500) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/webp', 0.85))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
