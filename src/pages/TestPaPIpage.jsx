import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TestPAPIpage.css'
import soalPAPIData from '../data/bank_soal_papi_kostick.json'
import { calculatePapiScore } from '../utils/calculatePapiScore'

const soalPAPI = soalPAPIData.items

function TestPAPIpage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const navigate = useNavigate()

  const total = soalPAPI.length
  const currentSoal = soalPAPI[currentIndex]
  const selected = answers[currentSoal.id]

  const pilihanA = currentSoal.choices[0]
  const pilihanB = currentSoal.choices[1]

  const handleSelect = (key) => {
    setAnswers({ ...answers, [currentSoal.id]: key })
  }

  const handleNext = () => {
  if (currentIndex < total - 1) {
    setCurrentIndex(currentIndex + 1)
  } else {
    // hitung skor dari semua jawaban
    const hasilSkor = calculatePapiScore(answers)

    // simpan sementara supaya bisa diakses halaman hasil
    localStorage.setItem('papiAnswers', JSON.stringify(answers))
    localStorage.setItem('papiScores', JSON.stringify(hasilSkor))

    navigate('/SoalPAPI/selesai')
  }
}

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="test-container">
      <div className="test-card">
        <p className="test-nomor">
          NOMOR {currentIndex + 1} DARI {total}
        </p>
        <p className="test-instruksi">Pilih pernyataan yang paling menggambarkan dirimu</p>

        <label className={`test-option ${selected === pilihanA.key ? 'selected' : ''}`}>
          <input
            type="radio"
            name={`soal-${currentSoal.id}`}
            checked={selected === pilihanA.key}
            onChange={() => handleSelect(pilihanA.key)}
          />
          <span>{pilihanA.text}</span>
        </label>

        <p className="test-atau">ATAU</p>

        <label className={`test-option ${selected === pilihanB.key ? 'selected' : ''}`}>
          <input
            type="radio"
            name={`soal-${currentSoal.id}`}
            checked={selected === pilihanB.key}
            onChange={() => handleSelect(pilihanB.key)}
          />
          <span>{pilihanB.text}</span>
        </label>

        <div className="test-nav">
          <button className="test-btn-prev" onClick={handlePrev} disabled={currentIndex === 0}>
            ← Sebelumnya
          </button>
          <button className="test-btn-next" onClick={handleNext} disabled={!selected}>
            {currentIndex === total - 1 ? 'Selesai' : 'Selanjutnya →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TestPAPIpage