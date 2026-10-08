import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { estimasiIQ } from '../utils/calculateWptScore'
import './SelesaiWPTpage.css'

const KATEGORI = [
  { label: 'Sangat rendah (0-9)', min: 0, max: 9 },
  { label: 'Rendah (10-15)', min: 10, max: 15 },
  { label: 'Rata-rata (16-24)', min: 16, max: 24 },
  { label: 'Di atas rata-rata (25-31)', min: 25, max: 31 },
  { label: 'Tinggi (32-50)', min: 32, max: 50 },
]
const BATAS_JABATAN = 22
const SKOR_MAKSIMAL = 50

function BellCurveChart({ skor }) {
  const width = 520
  const height = 220
  const padding = 30
  const mean = 20
  const stdDev = 8
  const points = []
  for (let x = 0; x <= SKOR_MAKSIMAL; x++) {
    const y = Math.exp(-((x - mean) ** 2) / (2 * stdDev ** 2))
    points.push({ x, y })
  }
  const maxY = Math.max(...points.map((p) => p.y))
  const toSvgX = (x) => padding + (x / SKOR_MAKSIMAL) * (width - padding * 2)
  const toSvgY = (y) => height - padding - (y / maxY) * (height - padding * 2 - 20)
  const pathPoints = points.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ')
  const areaPath = `M${toSvgX(0)},${height - padding} L${pathPoints} L${toSvgX(SKOR_MAKSIMAL)},${
    height - padding
  } Z`
  const batasX = toSvgX(BATAS_JABATAN)
  const skorX = toSvgX(skor)
  const skorY = toSvgY(Math.exp(-((skor - mean) ** 2) / (2 * stdDev ** 2)))

  return (
    <svg viewBox={`0 0 ${width} ${height + 30}`} className="bellcurve-svg">
      <path d={areaPath} className="bellcurve-area" />
      <polyline points={pathPoints} className="bellcurve-line" />
      <line x1={batasX} y1={padding - 10} x2={batasX} y2={height - padding} className="bellcurve-threshold-line" />
      <text x={batasX} y={padding - 16} textAnchor="middle" className="bellcurve-threshold-label">
        Batas jabatan {BATAS_JABATAN}
      </text>
      <line x1={skorX} y1={padding - 10} x2={skorX} y2={height - padding} className="bellcurve-score-line" />
      <circle cx={skorX} cy={skorY} r="5" className="bellcurve-score-dot" />
      <text x={skorX} y={padding - 16} textAnchor="middle" className="bellcurve-score-label">
        Kandidat {skor}
      </text>
      {[0, 10, 20, 30, 40, 50].map((tick) => (
        <text key={tick} x={toSvgX(tick)} y={height - padding + 20} textAnchor="middle" className="bellcurve-axis-label">
          {tick}
        </text>
      ))}
    </svg>
  )
}

function CategoryScale({ skor }) {
  const activeIndex = KATEGORI.findIndex((k) => skor >= k.min && skor <= k.max)
  return (
    <div className="scale-wrap">
      <div className="scale-bar">
        {KATEGORI.map((_, i) => (
          <div key={i} className={`scale-segment ${i === activeIndex ? 'active' : ''}`} />
        ))}
      </div>
      <div className="scale-labels">
        {KATEGORI.map((k, i) => (
          <span key={i} className={i === activeIndex ? 'active-label' : ''}>
            {k.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function SelesaiWPTpage() {
  const [hasil, setHasil] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('wptHasil')
    if (saved) {
      setHasil(JSON.parse(saved))
    }
  }, [])

  if (!hasil) {
    return (
      <div className="selesaiwpt-container">
        <div className="selesaiwpt-card">
          <p>Belum ada hasil test WPT yang tersimpan.</p>
          <button className="selesaiwpt-button" onClick={() => navigate('/SoalWPT')}>
            Kembali ke Halaman Test
          </button>
        </div>
      </div>
    )
  }

  const { jawabanBenar, soalDijawab } = hasil
  const ketepatan = soalDijawab > 0 ? Math.round((jawabanBenar / soalDijawab) * 100) : 0
  const kategoriAktif =
    KATEGORI.find((k) => jawabanBenar >= k.min && jawabanBenar <= k.max) || KATEGORI[0]
  const selisihBatas = jawabanBenar - BATAS_JABATAN
  const iq = estimasiIQ(jawabanBenar)

  return (
    <div className="selesaiwpt-container">
      <div className="selesaiwpt-card">
        <h1 className="selesaiwpt-title">WPT: kemampuan kognitif umum</h1>
        <p className="selesaiwpt-subtitle">
          50 soal dalam 12 menit. Skor tertinggi {SKOR_MAKSIMAL}.
        </p>

        <div className="selesaiwpt-body">
          <div className="selesaiwpt-chart-col">
            <BellCurveChart skor={jawabanBenar} />
            <CategoryScale skor={jawabanBenar} />
          </div>

          <div className="selesaiwpt-stats-col">
            <div className="selesaiwpt-stat-row">
              <span>Soal dijawab</span>
              <strong>{soalDijawab} dari 50</strong>
            </div>
            <div className="selesaiwpt-stat-row">
              <span>Jawaban benar</span>
              <strong>{jawabanBenar}</strong>
            </div>
            <div className="selesaiwpt-stat-row">
              <span>Ketepatan</span>
              <strong>{ketepatan}%</strong>
            </div>
            <div className="selesaiwpt-stat-row">
              <span>Estimasi IQ (WAIS)</span>
              <strong>{iq ?? '—'}</strong>
            </div>
            <div className="selesaiwpt-stat-row">
              <span>Kategori</span>
              <strong>{kategoriAktif.label.split(' (')[0]}</strong>
            </div>
            <div className="selesaiwpt-stat-row">
              <span>Batas minimal jabatan</span>
              <strong className="selesaiwpt-highlight">
                {BATAS_JABATAN} ({selisihBatas >= 0 ? 'terpenuhi' : 'belum terpenuhi'},{' '}
                {selisihBatas >= 0 ? '+' : ''}
                {selisihBatas})
              </strong>
            </div>

            <p className="selesaiwpt-narrative">
              Kandidat mengerjakan {soalDijawab} soal dengan ketepatan {ketepatan}%. Hasil ini
              dihitung dari kunci jawaban resmi WPT — jawaban berupa isian bebas (pecahan atau
              deretan angka) dicocokkan secara otomatis dan mungkin perlu ditinjau ulang bila
              formatnya berbeda dari kunci.
            </p>
          </div>
        </div>

        <button className="selesaiwpt-button" onClick={() => navigate('/Dashboard')}>
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  )
}

export default SelesaiWPTpage