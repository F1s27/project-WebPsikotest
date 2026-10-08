import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TestWPTpage.css'
import wptData from '../data/bank_soal_wpt.json'
import { calculateWptScore } from '../utils/calculateWptScore'

const soalWPT = wptData.questions
const DURASI_MENIT = wptData.test.duration_minutes || 12

function TestWPTpage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [sisaDetik, setSisaDetik] = useState(DURASI_MENIT * 60)
  const navigate = useNavigate()

  const total = soalWPT.length
  const currentSoal = soalWPT[currentIndex]
  const selected = answers[currentSoal.id] || ''

  useEffect(() => {
    if (sisaDetik <= 0) {
      handleSelesai()
      return
    }
    const timer = setTimeout(() => setSisaDetik((s) => s - 1), 1000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sisaDetik])

  const formatWaktu = (detik) => {
    const m = Math.floor(detik / 60)
    const s = detik % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleSelect = (value) => {
    setAnswers({ ...answers, [currentSoal.id]: value })
  }

 const handleSelesai = () => {
  const hasil = calculateWptScore(answers)
  localStorage.setItem('wptAnswers', JSON.stringify(answers))
  localStorage.setItem('wptHasil', JSON.stringify(hasil))
  navigate('/SoalWPT/selesai')
}

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      handleSelesai()
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const renderJawabanInput = () => {
    if (currentSoal.options && currentSoal.options.length > 0) {
      return (
        <div className="wpt-options">
          {currentSoal.options.map((opt) => (
            <label
              key={opt.key}
              className={`wpt-option ${selected === opt.key ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name={`soal-${currentSoal.id}`}
                checked={selected === opt.key}
                onChange={() => handleSelect(opt.key)}
              />
              <span>{opt.text}</span>
            </label>
          ))}
        </div>
      )
    }

    return (
      <div className="wpt-shortanswer-wrap">
        <input
          type="text"
          className="wpt-shortanswer-input"
          placeholder="Ketik jawabanmu di sini..."
          value={selected}
          onChange={(e) => handleSelect(e.target.value)}
        />
      </div>
    )
  }

  return (
    <div className="wpt-container">
      <div className="wpt-header">
        <p className="wpt-nomor">
          NOMOR {currentIndex + 1} DARI {total}
        </p>
        <p className={`wpt-timer ${sisaDetik <= 60 ? 'warning' : ''}`}>
          ⏱ {formatWaktu(sisaDetik)}
        </p>
      </div>

      <div className="wpt-card">
        <p className="wpt-question">{currentSoal.question}</p>

        {currentSoal.image && (
          <div className="wpt-image-wrap">
            <img
              src={`/${currentSoal.image}`}
              alt={`Gambar soal nomor ${currentSoal.number}`}
              className="wpt-image"
            />
          </div>
        )}
        
        {currentSoal.pairs && (
          <div className="wpt-pairs">
            {currentSoal.pairs.map((pair, i) => (
              <div key={i} className="wpt-pair-row">
                <span>{pair[0]}</span>
                <span>{pair[1]}</span>
              </div>
            ))}
          </div>
        )}

        {renderJawabanInput()}

        <div className="wpt-nav">
          <button className="wpt-btn-prev" onClick={handlePrev} disabled={currentIndex === 0}>
            ← Sebelumnya
          </button>
          <button className="wpt-btn-next" onClick={handleNext}>
            {currentIndex === total - 1 ? 'Selesai' : 'Selanjutnya →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TestWPTpage