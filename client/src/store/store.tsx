import { configureStore } from '@reduxjs/toolkit'

import { currentUser } from 'store/modules/user'
import { timer } from 'store/modules/game'

export default configureStore({
  reducer: {
    currentUser: currentUser.reducer,
    timer: timer.reducer,
  },
})
