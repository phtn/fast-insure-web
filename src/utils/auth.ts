import { auth } from "@/libs/db"
import { onAuthStateChanged } from "firebase/auth"

export const isAuthed = () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      return true
    }
  })
  return false
}
