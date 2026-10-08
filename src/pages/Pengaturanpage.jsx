import { useState } from 'react'
import './Pengaturanpage.css'

const TABS = ['Profil klinik', 'Pengguna & akses', 'Soal & skoring', 'Notifikasi', 'Keamanan']

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`toggle-switch ${checked ? 'on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle-knob" />
    </button>
  )
}

function ProfilKlinikTab() {
  const [namaKlinik, setNamaKlinik] = useState('Klinika Psikologi Terapan')
  const [email, setEmail] = useState('admin@klinika.id')
  const [telepon, setTelepon] = useState('(031) 555-0182')
  const [zonaWaktu, setZonaWaktu] = useState('WIB (UTC+7)')
  const [alamat, setAlamat] = useState('Jl. Raya Darmo No. 12, Surabaya, Jawa Timur')

  return (
    <div className="pengaturan-card">
      <h2 className="pengaturan-card-title">Identitas klinik</h2>
      <p className="pengaturan-card-desc">
        Digunakan pada kop laporan hasil tes dan halaman login peserta.
      </p>

      <div className="pengaturan-logo-row">
        <div className="pengaturan-logo-box">KL</div>
        <div>
          <button className="pengaturan-btn-outline">Ganti logo</button>
          <p className="pengaturan-hint">PNG atau SVG, maksimal 2 MB</p>
        </div>
      </div>

      <div className="pengaturan-grid-2">
        <div className="pengaturan-field">
          <label>Nama klinik</label>
          <input value={namaKlinik} onChange={(e) => setNamaKlinik(e.target.value)} />
        </div>
        <div className="pengaturan-field">
          <label>Email kontak</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="pengaturan-field">
          <label>Nomor telepon</label>
          <input value={telepon} onChange={(e) => setTelepon(e.target.value)} />
        </div>
        <div className="pengaturan-field">
          <label>Zona waktu</label>
          <select value={zonaWaktu} onChange={(e) => setZonaWaktu(e.target.value)}>
            <option>WIB (UTC+7)</option>
            <option>WITA (UTC+8)</option>
            <option>WIT (UTC+9)</option>
          </select>
        </div>
      </div>

      <div className="pengaturan-field pengaturan-field-full">
        <label>Alamat</label>
        <textarea rows={3} value={alamat} onChange={(e) => setAlamat(e.target.value)} />
      </div>

      <div className="pengaturan-actions">
        <button className="pengaturan-btn-outline">Batalkan</button>
        <button className="pengaturan-btn-primary">Simpan perubahan</button>
      </div>
    </div>
  )
}

function PenggunaAksesTab() {
  const users = [
    { initial: 'RS', nama: 'Rani Setiawan', isYou: true, peran: 'Admin utama', status: 'Aktif' },
    { initial: 'HW', nama: 'Hendra Wijaya', isYou: false, peran: 'Reviewer', status: 'Aktif' },
    { initial: 'MP', nama: 'Maria Pratiwi', isYou: false, peran: 'Reviewer', status: 'Menunggu undangan' },
  ]

  return (
    <div className="pengaturan-card">
      <div className="pengaturan-card-header-row">
        <div>
          <h2 className="pengaturan-card-title">Pengguna & akses</h2>
          <p className="pengaturan-card-desc">
            Admin dapat mengelola soal dan peserta. Reviewer hanya dapat meninjau hasil.
          </p>
        </div>
        <button className="pengaturan-btn-primary">Undang pengguna</button>
      </div>

      <table className="pengaturan-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Peran</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.nama}>
              <td>
                <div className="pengaturan-user-cell">
                  <span className="pengaturan-avatar">{u.initial}</span>
                  <span>
                    {u.nama} {u.isYou && <span className="pengaturan-you">(Anda)</span>}
                  </span>
                </div>
              </td>
              <td>{u.peran}</td>
              <td>
                <span
                  className={`pengaturan-status-badge ${
                    u.status === 'Aktif' ? 'aktif' : 'pending'
                  }`}
                >
                  ● {u.status}
                </span>
              </td>
              <td className="pengaturan-table-action">
                {u.status === 'Aktif' && !u.isYou && (
                  <button className="pengaturan-link-danger">Hapus akses</button>
                )}
                {u.status === 'Menunggu undangan' && (
                  <button className="pengaturan-link-danger">Batalkan</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SoalSkoringTab() {
  const [wptJumlahSoal, setWptJumlahSoal] = useState(50)
  const [wptBatasWaktu, setWptBatasWaktu] = useState(12)
  const [wptSkorMin, setWptSkorMin] = useState(24)
  const [wptAcak, setWptAcak] = useState('Aktif')

  const [papiJumlah, setPapiJumlah] = useState(90)
  const [papiBatasWaktu, setPapiBatasWaktu] = useState(25)
  const [papiReviewManual, setPapiReviewManual] = useState(true)

  return (
    <>
      <div className="pengaturan-card">
        <h2 className="pengaturan-card-title">Aturan tes WPT</h2>
        <p className="pengaturan-card-desc">Batas waktu dan ambang kelulusan otomatis.</p>

        <div className="pengaturan-grid-2">
          <div className="pengaturan-field">
            <label>Jumlah soal</label>
            <input
              type="number"
              value={wptJumlahSoal}
              onChange={(e) => setWptJumlahSoal(e.target.value)}
            />
          </div>
          <div className="pengaturan-field">
            <label>Batas waktu (menit)</label>
            <input
              type="number"
              value={wptBatasWaktu}
              onChange={(e) => setWptBatasWaktu(e.target.value)}
            />
          </div>
          <div className="pengaturan-field">
            <label>Skor minimum lulus</label>
            <input
              type="number"
              value={wptSkorMin}
              onChange={(e) => setWptSkorMin(e.target.value)}
            />
          </div>
          <div className="pengaturan-field">
            <label>Acak urutan soal</label>
            <select value={wptAcak} onChange={(e) => setWptAcak(e.target.value)}>
              <option>Aktif</option>
              <option>Nonaktif</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pengaturan-card">
        <h2 className="pengaturan-card-title">Aturan tes PAPI</h2>
        <p className="pengaturan-card-desc">Format pasangan pernyataan dan dimensi yang dinilai.</p>

        <div className="pengaturan-grid-2">
          <div className="pengaturan-field">
            <label>Jumlah pasangan pernyataan</label>
            <input
              type="number"
              value={papiJumlah}
              onChange={(e) => setPapiJumlah(e.target.value)}
            />
          </div>
          <div className="pengaturan-field">
            <label>Batas waktu (menit)</label>
            <input
              type="number"
              value={papiBatasWaktu}
              onChange={(e) => setPapiBatasWaktu(e.target.value)}
            />
          </div>
        </div>

        <div className="pengaturan-toggle-row">
          <div>
            <p className="pengaturan-toggle-title">Wajibkan review manual sebelum hasil dikirim</p>
            <p className="pengaturan-toggle-desc">
              Hasil PAPI tidak akan terlihat oleh peserta sampai ditinjau reviewer.
            </p>
          </div>
          <ToggleSwitch checked={papiReviewManual} onChange={setPapiReviewManual} />
        </div>

        <div className="pengaturan-actions">
          <button className="pengaturan-btn-outline">Batalkan</button>
          <button className="pengaturan-btn-primary">Simpan perubahan</button>
        </div>
      </div>
    </>
  )
}

function NotifikasiTab() {
  const [peserta, setPeserta] = useState(true)
  const [hasilReview, setHasilReview] = useState(true)
  const [ringkasan, setRingkasan] = useState(false)
  const [whatsapp, setWhatsapp] = useState(false)

  const items = [
    {
      title: 'Peserta menyelesaikan WPT atau PAPI',
      desc: 'Kirim email ke admin setiap kali satu tes selesai dikerjakan.',
      value: peserta,
      set: setPeserta,
    },
    {
      title: 'Hasil menunggu review',
      desc: 'Ingatkan reviewer bila ada hasil yang belum ditinjau lebih dari 24 jam.',
      value: hasilReview,
      set: setHasilReview,
    },
    {
      title: 'Ringkasan mingguan',
      desc: 'Rekap jumlah peserta dan status tes setiap Senin pagi.',
      value: ringkasan,
      set: setRingkasan,
    },
    {
      title: 'Notifikasi WhatsApp',
      desc: 'Selain email, kirim juga notifikasi ke nomor WhatsApp admin utama.',
      value: whatsapp,
      set: setWhatsapp,
    },
  ]

  return (
    <div className="pengaturan-card">
      <h2 className="pengaturan-card-title">Notifikasi</h2>
      <p className="pengaturan-card-desc">Atur kapan tim Anda menerima pemberitahuan.</p>

      {items.map((item, i) => (
        <div key={i} className="pengaturan-toggle-row bordered">
          <div>
            <p className="pengaturan-toggle-title">{item.title}</p>
            <p className="pengaturan-toggle-desc">{item.desc}</p>
          </div>
          <ToggleSwitch checked={item.value} onChange={item.set} />
        </div>
      ))}

      <div className="pengaturan-actions">
        <button className="pengaturan-btn-primary">Simpan perubahan</button>
      </div>
    </div>
  )
}

function KeamananTab() {
  const [sandiSaatIni, setSandiSaatIni] = useState('')
  const [sandiBaru, setSandiBaru] = useState('')
  const [otp, setOtp] = useState(true)
  const [autoLogout, setAutoLogout] = useState(true)

  return (
    <>
      <div className="pengaturan-card">
        <h2 className="pengaturan-card-title">Ubah kata sandi</h2>

        <div className="pengaturan-grid-2">
          <div className="pengaturan-field">
            <label>Kata sandi saat ini</label>
            <input
              type="password"
              value={sandiSaatIni}
              onChange={(e) => setSandiSaatIni(e.target.value)}
            />
          </div>
          <div className="pengaturan-field">
            <label>Kata sandi baru</label>
            <input
              type="password"
              placeholder="Minimal 8 karakter"
              value={sandiBaru}
              onChange={(e) => setSandiBaru(e.target.value)}
            />
          </div>
        </div>

        <div className="pengaturan-actions">
          <button className="pengaturan-btn-primary">Perbarui kata sandi</button>
        </div>
      </div>

      <div className="pengaturan-card">
        <h2 className="pengaturan-card-title">Sesi & akses masuk</h2>

        <div className="pengaturan-toggle-row bordered">
          <div>
            <p className="pengaturan-toggle-title">Verifikasi dua langkah</p>
            <p className="pengaturan-toggle-desc">
              Wajibkan kode OTP setiap kali admin masuk dari perangkat baru.
            </p>
          </div>
          <ToggleSwitch checked={otp} onChange={setOtp} />
        </div>

        <div className="pengaturan-toggle-row bordered">
          <div>
            <p className="pengaturan-toggle-title">Keluar otomatis setelah tidak aktif</p>
            <p className="pengaturan-toggle-desc">
              Sesi akan berakhir otomatis setelah 30 menit tanpa aktivitas.
            </p>
          </div>
          <ToggleSwitch checked={autoLogout} onChange={setAutoLogout} />
        </div>
      </div>
    </>
  )
}

function Pengaturanpage() {
  const [activeTab, setActiveTab] = useState('Profil klinik')

  return (
    <div className="pengaturan-container">
      <h1 className="pengaturan-title">Pengaturan</h1>
      <p className="pengaturan-subtitle">
        Kelola profil klinik, pengguna, notifikasi, dan aturan skoring.
      </p>

      <div className="pengaturan-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`pengaturan-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Profil klinik' && <ProfilKlinikTab />}
      {activeTab === 'Pengguna & akses' && <PenggunaAksesTab />}
      {activeTab === 'Soal & skoring' && <SoalSkoringTab />}
      {activeTab === 'Notifikasi' && <NotifikasiTab />}
      {activeTab === 'Keamanan' && <KeamananTab />}
    </div>
  )
}

export default Pengaturanpage