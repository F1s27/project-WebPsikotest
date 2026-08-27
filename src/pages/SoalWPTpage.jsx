import { useNavigate } from 'react-router-dom'
import './PetunjukPAPIpage.css'

function PetunjukPAPIpage() {
  const navigate = useNavigate()

  const apaYangDiukur = [
    'Gaya kepemimpinan dan cara mengambil keputusan.',
    'Preferensi bekerja sendiri vs. dalam kelompok.',
    'Cara merespons tekanan, perubahan, dan rutinitas kerja.',
    '20 dimensi kepribadian yang relevan dengan dunia kerja.',
  ]

  const aturan = [
    <>Setiap nomor terdiri dari dua pernyataan — pilih satu yang <b>paling</b> menggambarkan dirimu.</>,
    'Tidak ada batas waktu ketat, tapi jawablah secara spontan tanpa berpikir terlalu lama.',
    'Semua 40 nomor wajib dijawab — test tidak bisa dikirim jika ada yang kosong.',
    'Kamu bisa kembali ke nomor sebelumnya untuk mengubah jawaban.',
    'Jawab berdasarkan kondisi nyata dirimu, bukan yang dianggap ideal atau diharapkan orang lain.',
  ]

  const handleMulai = () => {
    navigate('/SoalPAPI/test')
  }

  return (
    <div className="petunjuk-container">
      <p className="petunjuk-label">Personality and Preference Inventory</p>
      <h1 className="petunjuk-title">Petunjuk Pengerjaan</h1>
      <p className="petunjuk-desc">
        Baca petunjuk ini sampai selesai sebelum menekan tombol mulai. Tidak ada
        jawaban benar atau salah pada test ini.
      </p>

      <div className="petunjuk-stats">
        <div className="petunjuk-stat-box">
          <p className="petunjuk-stat-number">40</p>
          <p className="petunjuk-stat-label">Pasangan</p>
        </div>
        <div className="petunjuk-stat-box">
          <p className="petunjuk-stat-number">±20</p>
          <p className="petunjuk-stat-label">Menit</p>
        </div>
        <div className="petunjuk-stat-box">
          <p className="petunjuk-stat-number">1x</p>
          <p className="petunjuk-stat-label">Kesempatan</p>
        </div>
        <div className="petunjuk-stat-box">
          <p className="petunjuk-stat-number">A/B</p>
          <p className="petunjuk-stat-label">Forced-Choice</p>
        </div>
      </div>

      <div className="petunjuk-notice">
        <p className="petunjuk-notice-title">Tidak ada jawaban benar atau salah</p>
        <p className="petunjuk-notice-desc">
          Test ini mengukur gaya kerja dan kepribadian, bukan kemampuan. Jawablah
          sejujur mungkin sesuai dirimu sehari-hari.
        </p>
      </div>

      <div className="petunjuk-card">
        <div className="petunjuk-card-heading">
          <span className="petunjuk-number">1</span>
          <h2>Apa yang diukur</h2>
        </div>
        <ul className="petunjuk-list">
          {apaYangDiukur.map((text, i) => (
            <li key={i} className="petunjuk-list-item">
              <span className="petunjuk-dash">—</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="petunjuk-card">
        <div className="petunjuk-card-heading">
          <span className="petunjuk-number">2</span>
          <h2>Aturan pengerjaan</h2>
        </div>
        <ul className="petunjuk-list">
          {aturan.map((text, i) => (
            <li key={i} className="petunjuk-list-item">
              <span className="petunjuk-dash">—</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="petunjuk-card">
        <div className="petunjuk-card-heading">
          <span className="petunjuk-number">3</span>
          <h2>Contoh soal</h2>
        </div>

        <div className="petunjuk-example-box">
          <label className="petunjuk-radio-option selected">
            <input type="radio" name="contoh" defaultChecked readOnly />
            <span>Saya suka mengambil alih ketika kelompok butuh arahan.</span>
          </label>

          <p className="petunjuk-atau">ATAU</p>

          <label className="petunjuk-radio-option">
            <input type="radio" name="contoh" readOnly />
            <span>Saya lebih nyaman mengikuti arahan orang lain.</span>
          </label>

          <p className="petunjuk-example-note">
            ✓ Pilih salah satu yang paling sesuai — di sini dipilih pernyataan
            pertama sebagai contoh
          </p>
        </div>
      </div>

      <button className="petunjuk-button" onClick={handleMulai}>
        Mulai Sekarang
      </button>
    </div>
  )
}

export default PetunjukPAPIpage