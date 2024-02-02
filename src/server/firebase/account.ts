import { setDoc, doc } from "firebase/firestore"
import { db } from "@/libs/db"
import { type NewUserPayload } from "@resource/account"



export const createUserAccount = async (user: NewUserPayload) => {

  const Err = (err: Error) => {
    return [0, err.message]
  }
  const Ok = () => {
    return [1, 'success']
  }

  if (user) {
    const { email, userId, accountType } = user
    await setDoc(doc(db, 'users', userId), {
      userId,
      email,
      accountType,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    }).then(Ok, Err)
  } else {
    return 'Unable to read payload.'
  }
}
