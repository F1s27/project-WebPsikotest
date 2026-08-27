import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SelesaiPAPIpage.css'

function RadarChart({ data }) {
  const size = 500
  const center = size / 2
  const maxRadius = size / 2 - 60
  const levels = 4

  const angleStep = (2 * Math.PI) / data.length

  const getPoint = (index, ratio) => {
    const angle = angleStep * index - Math.PI / 2
    const r = maxRadius * ratio
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    }
  }

  const scorePoints = data
    .map((d, i) => {
      const ratio = d.maxScore > 0 ? d.score / d.maxScore : 0
      const p = getPoint(i, ratio)
      return `${p.x},${p.y}`
    })
    .join(' ')

  const gridPolygons = Array.from({ length: levels }, (_, levelIndex) => {
    const ratio = (levelIndex + 1) / levels
    return data
      .map((_, i) => {
        const p = getPoint(i, ratio)
        return `${p.x},${p.y}`
      })
      .join(' ')
  })

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="radar-svg">
      {gridPolygons.map((points, i) => (
        <polygon key={i} points={points} className="radar-grid" />
      ))}

      {data.map((_, i) => {
        const p = getPoint(i, 1)
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            className="radar-axis-line"
          />
        )
      })}

      <polygon points={scorePoints} className="radar-score-area" />

      {data.map((d, i) => {
        const ratio = d.maxScore > 0 ? d.score / d.maxScore : 0
        const p = getPoint(i, ratio)
        return <circle key={i} cx={p.x} cy={p.y} r="4" className="radar-score-dot" />
      })}

      {data.map((d, i) => {
        const p = getPoint(i, 1.14)
        return (
          <text key={i} x={p.x} y={p.y} className="radar-label" textAnchor="middle" dominantBaseline="middle">
            {d.code}
          </text>
        )
      })}
    </svg>
  )
}

function SelesaiPAPIpage() {
  const [scores, setScores] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('papiScores')
    if (saved) {
      setScores(JSON.parse(saved))
    }
  }, [])

  if (!scores) {
    return (
      <div className="selesai-container">
        <div className="selesai-empty">
          <p>Belum ada hasil test yang tersimpan.</p>
          <button className="selesai-button" onClick={() => navigate('/SoalPAPI')}>
            Kembali ke Halaman Test
          </button>
        </div>
      </div>
    )
  }

  const grouped = scores.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {})

  return (
    <div className="selesai-container">
      <p className="selesai-label">Personality and Preference Inventory</p>
      <h1 className="selesai-title">Hasil Test PAPI</h1>
      <p className="selesai-desc">
        Berikut adalah ringkasan hasil test kepribadian berdasarkan 20 dimensi PAPI Kostick.
      </p>

      <div className="selesai-chart-card">
        <RadarChart data={scores} />
      </div>

      {Object.entries(grouped).map(([groupName, items]) => (
        <div key={groupName} className="selesai-card">
          <h2 className="selesai-group-title">{groupName}</h2>
          <div className="selesai-score-list">
            {items.map((item) => {
              const percent = item.maxScore > 0 ? Math.round((item.score / item.maxScore) * 100) : 0
              return (
                <div key={item.code} className="selesai-score-row">
                  <div className="selesai-score-info">
                    <span className="selesai-score-code">{item.code}</span>
                    <span className="selesai-score-name">{item.name}</span>
                  </div>
                  <div className="selesai-score-bar-wrap">
                    <div className="selesai-score-bar-track">
                      <div
                        className="selesai-score-bar-fill"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="selesai-score-value">
                      {item.score}/{item.maxScore}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <button className="selesai-button" onClick={() => navigate('/Dashboard')}>
        Kembali ke Dashboard
      </button>
    </div>
  )
}

export default SelesaiPAPIpage