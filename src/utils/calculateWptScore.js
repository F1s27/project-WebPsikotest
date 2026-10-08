import answerKey from '../data/wptAnswerKey.json'

/**
 * Menyamakan format jawaban supaya lebih toleran terhadap variasi penulisan
 * (spasi, koma vs titik, huruf besar/kecil). Tidak bisa menjamin 100% akurat
 * untuk jawaban isian bebas yang bisa ditulis dalam beberapa bentuk berbeda
 * (misal pecahan "1/4" vs desimal "0.25").
 */
function normalisasi(jawaban) {
  if (jawaban === undefined || jawaban === null) return ''
  return String(jawaban)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
}

/**
 * Menghitung skor mentah WPT dengan membandingkan jawaban peserta terhadap
 * kunci jawaban resmi.
 * @param {Object} answers - { "1": "4", "2": "2", ... } key = nomor soal (string/angka)
 * @returns {{ jawabanBenar: number, soalDijawab: number, detail: Array }}
 */
export function calculateWptScore(answers) {
  let jawabanBenar = 0
  let soalDijawab = 0
  const detail = []

  Object.keys(answerKey).forEach((nomor) => {
    const jawabanUser = answers[nomor]
    const sudahDijawab = jawabanUser !== undefined && jawabanUser !== ''
    if (sudahDijawab) soalDijawab += 1

    const benar =
      sudahDijawab && normalisasi(jawabanUser) === normalisasi(answerKey[nomor])
    if (benar) jawabanBenar += 1

    detail.push({ nomor: Number(nomor), jawabanUser: jawabanUser || '', benar })
  })

  return { jawabanBenar, soalDijawab, detail }
}

/**
 * Tabel konversi skor mentah WPT -> estimasi WAIS Full Scale IQ dan GATB "G".
 * PERHATIAN: tabel ini diketik ulang dari gambar tabel 2 kolom berdampingan.
 * Baris 1-22 cukup yakin terbaca benar; baris 23-44 (terutama 36-44) BERPOTENSI
 * tertukar urutannya saat dibaca dari gambar dan WAJIB diverifikasi ulang
 * terhadap sumber aslinya sebelum dipakai untuk keputusan apa pun.
 */
export const wptToIqTable = {
  1: 59, 2: 61, 3: 64, 4: 67, 5: 69, 6: 71, 7: 73, 8: 75, 9: 78, 10: 80,
  11: 81, 12: 83, 13: 86, 14: 88, 15: 90, 16: 93, 17: 95, 18: 97, 19: 98, 20: 102,
  21: 104, 22: 106, 23: 108, 24: 111, 25: 113, 26: 116, 27: 119, 28: 121, 29: 123, 30: 126,
  31: 128, 32: 130, 33: 132, 34: 134, 35: 136, 36: 140, 37: 132, 38: 134, 39: 136, 40: 138,
  41: 142, 42: 142, 43: 143, 44: 146,
}

export function estimasiIQ(skor) {
  return wptToIqTable[skor] ?? null
}