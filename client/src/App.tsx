import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

// pages
import Main from 'pages/Main/Main'
import Mypage from 'pages/Mypage/Mypage'
import Signup from 'pages/Signup/Signup'
import Paint from 'pages/Paint/Paint'
import GameList from 'pages/GameList/GameList'
import GamePlay from 'pages/GamePlay/GamePlay'
import GameResult from 'pages/GameResult/GameResult'
import DealList from 'pages/DealList/DealList'
import DealDetail from 'pages/DealDetail/DealDetail'
import DealRegister from 'pages/DealRegister/DealRegister'
import Rank from 'pages/Rank/Rank'
import Vote from 'pages/Vote/Vote'
import FAQ from 'pages/FAQ/FAQ'
import NotFound404 from 'pages/NotFound404/NotFound404'

import 'App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage/:userId" element={<Mypage />} />
        <Route path="/signup" element={<Signup signup={true} />} />
        <Route path="/profileEdit" element={<Signup signup={false} />} />
        <Route path="/paint" element={<Paint />} />
        <Route path="/game" element={<GameList />} />
        <Route path="/game/:gameId" element={<GamePlay />} />
        <Route path="/game/:gameId/result" element={<GameResult />} /> {/* 필요 없을 수도 */}
        <Route path="/deal" element={<DealList />} />
        <Route path="/deal/:dealId" element={<DealDetail />} />
        <Route path="/deal/register" element={<DealRegister />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  )
}
