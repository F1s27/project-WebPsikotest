import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SoalPAPIpage.css'

function SoalPAPIpage() {
  const [agreed, setAgreed] = useState(false)
  const navigate = useNavigate()

  const handleStart = () => {
    if (agreed) {
      navigate('/SoalPAPI/petunjuk')   
    }
  }

  const instruksi = [
    'Setiap nomor berisi dua pernyataan — pilih salah satu yang paling sesuai dengan dirimu.',
    'Tidak ada batas waktu ketat, tapi jawablah dengan spontan tanpa berpikir terlalu lama.',
    'Jawab berdasarkan kondisi dirimu sehari-hari, bukan yang dianggap ideal.',
    'Semua 40 nomor wajib dijawab sebelum test bisa dikirim.',
  ]

  return (
    <div className="papi-container">
      <div className="papi-card">
        <p className="papi-label">Personality and Preference Inventory</p>
        <h1 className="papi-title">Test PAPI</h1>
        

        <div className="papi-stats">
          <div className="papi-stat-box">
            <p className="papi-stat-number">90</p>
            <p className="papi-stat-label">Pasangan</p>
          </div>
          <div className="papi-stat-box">
            <p className="papi-stat-number">±20</p>
            <p className="papi-stat-label">Menit</p>
          </div>
          <div className="papi-stat-box">
            <p className="papi-stat-number">1x</p>
            <p className="papi-stat-label">Kesempatan</p>
          </div>
        </div>

        <ul className="papi-list">
          {instruksi.map((text, i) => (
            <li key={i} className="papi-list-item">
              <span className="papi-dash">—</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <label className="papi-checkbox-label">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>Saya sudah membaca instruksi dan siap memulai test ini.</span>
        </label>

        <button
          onClick={handleStart}
          disabled={!agreed}
          className="papi-button"
        >
          Mulai Test
        </button>
      </div>
    </div>
  )
}

export default SoalPAPIpage