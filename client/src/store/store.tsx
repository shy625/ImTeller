import { configureStore } from '@reduxjs/toolkit'

import { email, currentUser, userDetail } from './modules/user'

export default configureStore({
  reducer: {
    email: email.reducer,
    currentUser: currentUser.reducer,
    userDetail: userDetail.reducer,
  },
})
