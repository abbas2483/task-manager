import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyDCl4t1UqFtb7pQZTdl0I7h2bINTzIZYSA",
  authDomain: "task-manager-733d3.firebaseapp.com",
  projectId: "task-manager-733d3",
  storageBucket: "task-manager-733d3.firebasestorage.app",
  messagingSenderId: "665875948755",
  appId: "1:665875948755:web:0d5d9358a221d204126026",
  measurementId: "G-8TKP463XHQ"
}

// Initialize Firebase (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize services
export const auth = getAuth(app)
export const db = getFirestore(app)

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' 
  ? isSupported().then(yes => yes ? getAnalytics(app) : null)
  : null

export default app
