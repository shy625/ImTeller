import { configureStore } from '@reduxjs/toolkit'

import { currentUser, userDetail } from './modules/user'

export default configureStore({
  reducer: {
    currentUser: currentUser.reducer,
    userDetail: userDetail.reducer,
  },
})
