import { configureStore } from '@reduxjs/toolkit'

import { email, currentUser, userDetail } from 'store/modules/user'
import { chats } from 'store/modules/game'

export default configureStore({
  reducer: {
    email: email.reducer,
    currentUser: currentUser.reducer,
    userDetail: userDetail.reducer,
    chats: chats.reducer,
  },
})
