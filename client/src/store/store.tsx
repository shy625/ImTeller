import { configureStore } from '@reduxjs/toolkit'

import { currentUser } from './modules/user'

export default configureStore({
  reducer: {
    currentUser: currentUser.reducer,
  },
})
