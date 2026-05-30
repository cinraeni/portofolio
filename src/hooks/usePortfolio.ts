'use client'

import { useEffect, useState } from 'react'
import {
  fetchCertificates,
  fetchProjects,
  fetchTechStacks,
} from '@/lib/portfolioService'

/* ============================================
   STATIC DATA FALLBACK — Cindy Anggraeni CV
   ============================================ */

const staticProjects = [
  {
    id: 'homi',
    title: 'Homi — Housing Management System',
    description:
      'Homi adalah platform manajemen residensial modern berbasis Multi-Tenant & Multi-Database. Aplikasi ini dirancang khusus untuk menjembatani pengelola perumahan dan warga melalui otomasi layanan, transparansi data, dan pengalaman mobile yang premium. Homi dikembangkan sebagai solusi untuk mengatasi masalah rendahnya kolektibilitas iuran dan kurangnya transparansi pengelolaan dana lingkungan di tingkat RT/RW atau cluster perumahan. Dengan menerapkan arsitektur Database-per-Tenant isolation, aplikasi ini menjamin keamanan dan privasi data setiap perumahan secara terisolasi hingga 100%.',
    image_url: '/assets/homi.png',
    live_url: '',
    created_at: '2025-08-01',
  },
  {
    id: 'lumina',
    title: 'Lumina — AI Pothole Detection System',
    description:
      'Lumina adalah sebuah aplikasi mobile berbasis Android yang dirancang untuk memudahkan pengguna dalam melaporkan suatu masalah atau insiden di lingkungan sekitar (seperti infrastruktur rusak, masalah fasilitas umum, atau masalah lingkungan) yang diperkaya dengan fitur pemrosesan gambar. Dengan Lumina, pengguna dapat mengambil foto, mendeteksi atau memproses foto tersebut untuk mengidentifikasi masalah, dan menyertakan titik lokasi yang akurat menggunakan peta interaktif sebelum mengirimkan laporannya. Aplikasi ini bertujuan untuk menjadi jembatan yang responsif dalam menindaklanjuti berbagai masalah di lapangan secara real-time dan transparan.',
    image_url: '/assets/Lumina.png',
    live_url: '',
    created_at: '2025-02-01',
  },
  {
    id: 'verdant',
    title: 'Verdant — Platform Booking Ticket Wisata',
    description:
      'Aplikasi booking tiket tempat wisata secara digital. Desain UI/UX, interactive prototype, dan implementasi antarmuka mobile. Project Massive MSIB - Infinite Learning.',
    image_url: '/assets/verdant.png',
    live_url: '',
    created_at: '2024-09-01',
  },
  {
    id: 'clarity',
    title: 'Clarity — Data Driven Look',
    description:
      'Website visualisasi data aktivitas International Office Polibatam. Meraih Juara 1 kategori Aplikasi Web dan Mobile pada PBL Expo Polibatam 2024.',
    image_url: '',
    live_url: '',
    created_at: '2024-02-01',
  },
  {
    id: 'yoobudget',
    title: 'YooBudget — Budget Buddy',
    description:
      'Website pengelolaan keuangan pribadi untuk mencatat pemasukan, pengeluaran, dan anggaran. Desain UI/UX dan interactive prototype menggunakan Figma.',
    image_url: '',
    live_url: '',
    created_at: '2023-08-01',
  },
]

const staticCertificates = [
  {
    id: 'cert-msib',
    title: 'MSIB Batch 7 — Android Mobile Development & UI/UX Design (Infinite Learning, 2024)',
    image_url: '',
  },
  {
    id: 'cert-internship',
    title: 'Certificate of Internship — Android Mobile Development & UI/UX Design (Infinite Learning, 2024)',
    image_url: '',
  },
  {
    id: 'cert-studi-independen',
    title: 'Sertifikat Kepesertaan — Studi Independen Bersertifikat Angkatan 7 (PT Kinema Systrans Multimedia, 2024)',
    image_url: '',
  },
  {
    id: 'cert-juara1',
    title: 'Juara 1 Kategori Aplikasi WEB & Mobile — PBL Expo Polibatam 2024',
    image_url: '',
  },
  {
    id: 'cert-bnsp',
    title: 'Sertifikat BNSP — Kompetensi Kualifikasi KKNI Level II Teknik Komputer dan Jaringan',
    image_url: '',
  },
  {
    id: 'cert-pkl',
    title: 'Sertifikat Praktik Kerja Lapangan — Dinas Sosial Kota Tanjungpinang (2021)',
    image_url: '',
  },
]

const staticTechStacks = [
  { id: 'html', name: 'HTML', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { id: 'css', name: 'CSS', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { id: 'javascript', name: 'JavaScript', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { id: 'kotlin', name: 'Kotlin', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
  { id: 'php', name: 'PHP', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { id: 'figma', name: 'Figma', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { id: 'canva', name: 'Canva', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
  { id: 'vscode', name: 'VS Code', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { id: 'android-studio', name: 'Android Studio', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg' },
  { id: 'git', name: 'Git', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
]

/* ============================================ */

export default function usePortfolio() {
  const [projects, setProjects] = useState<any[]>(staticProjects)
  const [certificates, setCertificates] =
    useState<any[]>(staticCertificates)
  const [techStacks, setTechStacks] =
    useState<any[]>(staticTechStacks)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadPortfolio()
  }, [])

  const loadPortfolio = async () => {
    try {
      const [
        projectsData,
        certificatesData,
        techStacksData,
      ] = await Promise.all([
        fetchProjects(),
        fetchCertificates(),
        fetchTechStacks(),
      ])

      // Only override static data if Supabase returns actual data
      if (projectsData && projectsData.length > 0) {
        setProjects(projectsData)
      }
      if (certificatesData && certificatesData.length > 0) {
        setCertificates(certificatesData)
      }
      if (techStacksData && techStacksData.length > 0) {
        setTechStacks(techStacksData)
      }
    } catch {
      // Supabase not configured — keep static data
    }

    setLoading(false)
  }

  return {
    projects,
    certificates,
    techStacks,
    loading,
  }
}