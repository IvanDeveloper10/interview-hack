'use client'

import { initializeApp, getApps } from 'firebase/app'
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDQrR18rtITwpCmGA38hfM3bGzw3jrlM0w',
  authDomain: 'interview-hack.firebaseapp.com',
  projectId: 'interview-hack',
  storageBucket: 'interview-hack.firebasestorage.app',
  messagingSenderId: '713924242890',
  appId: '1:713924242890:web:7d0406fd8b79de2646b333'
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

let authPromise: Promise<User> | null = null

export function ensureAnonAuth(): Promise<User> {
  if (auth.currentUser) return Promise.resolve(auth.currentUser)
  if (authPromise) return authPromise
  authPromise = new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
      if (user) resolve(user)
    })
    signInAnonymously(auth).catch(reject)
  })

  return authPromise
}