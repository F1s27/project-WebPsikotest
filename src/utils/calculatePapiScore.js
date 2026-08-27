import scoringKeyData from '../data/papiScoringKey.json'

/**
 * Menghitung skor PAPI Kostick per dimensi.
 * @param {Object} answers - objek jawaban, contoh: { 1: 'A', 2: 'B', 3: 'A', ... }
 *                            key = nomor soal, value = 'A' atau 'B'
 * @returns {Array} daftar skor per dimensi, contoh:
 *   [{ code: 'N', group: 'Work Direction', name: '...', score: 6, maxScore: 9 }, ...]
 */
export function calculatePapiScore(answers) {
  return scoringKeyData.dimensions.map((dimensi) => {
    let score = 0

    dimensi.keys.forEach((key) => {
      const [nomorSoal, kodePilihan] = key.split('.')
      const jawabanUser = answers[nomorSoal]
      const pilihanCocok = kodePilihan === '1' ? 'A' : 'B'

      if (jawabanUser === pilihanCocok) {
        score += 1
      }
    })

    return {
      code: dimensi.code,
      group: dimensi.group,
      name: dimensi.name,
      score,
      maxScore: dimensi.keys.length,
    }
  })
}