/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { css } from '@emotion/react'

import Layout from 'layout/layout'

export default function Paint() {
  const CANVAS_WIDTH = 800
  const CANVAS_HEIGHT = 800
  const location = useLocation()
  const { isNew } = location.state
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const colorRef = useRef(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState(5)
  const [color, setColor] = useState('')
  const [isFilling, setIsFilling] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT

    const context = canvas.getContext('2d')
    contextRef.current = context
    setCtx(contextRef.current)
  }, [])

  function onMove({ nativeEvent }) {
    if (isDrawing) {
      ctx.lineCap = 'round'
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.lineTo(nativeEvent.offsetX, nativeEvent.offsetY)
      ctx.stroke()
      return
    }
    ctx.beginPath()
    ctx.moveTo(nativeEvent.offsetX, nativeEvent.offsetY)
  }
  function onMouseDown() {
    setIsDrawing(true)
  }
  function cancelPainting() {
    setIsDrawing(false)
  }
  function onCanvasClick() {
    if (isFilling) {
      ctx.fillStyle = color
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }
  }
  function eraseAll() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }
  function eraseStroke() {
    setColor('white')
    setIsFilling(false)
  }
  function onDoubleClick({ nativeEvent }) {
    if (text) {
      ctx.save()
      ctx.lineWidth = 1
      ctx.fillStyle = color
      ctx.fillText(text, nativeEvent.offsetX, nativeEvent.offsetY)
      ctx.restore()
      setIsDrawing(false)
    }
  }
  return (
    <Layout>
      <main>
        <h1>여긴 Paint</h1>
        <div css={center}>
          <canvas
            ref={canvasRef}
            css={canvasStyle}
            onMouseMove={onMove}
            onMouseDown={onMouseDown}
            onMouseUp={cancelPainting}
            onMouseLeave={cancelPainting}
            onClick={onCanvasClick}
            // onDoubleClick={onDoubleClick}
          ></canvas>
          <input
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
            type="range"
            min="1"
            max="100"
          />
          <div>{lineWidth}</div>
          <input onChange={(e) => setColor(e.target.value)} type="color" ref={colorRef} />
          <div className="palette">
            {colorMap.map((_, i) => (
              <div
                css={colorDot}
                key={i}
                style={{ backgroundColor: colorMap[i].color }}
                onClick={() => [
                  setColor(colorMap[i].color),
                  (colorRef.current.value = colorMap[i].color),
                ]}
              ></div>
            ))}
          </div>
          {isFilling ? (
            <button onClick={() => setIsFilling(!isFilling)}>그리기 모드</button>
          ) : (
            <button onClick={() => setIsFilling(!isFilling)}>채우기 모드</button>
          )}
          <button onClick={eraseAll}>모두 지우기</button>
          <button onClick={eraseStroke}>지우개</button>
          <button>그림 저장</button>
          {/* <input
            type="text"
            placeholder="내용을 적고 더블 클릭해주세요"
            onChange={(e) => setText(e.target.value)}
          /> */}
        </div>
      </main>
    </Layout>
  )
}
const center = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
const canvasStyle = css({
  width: '800px',
  height: '800px',
  border: '5px solid black',
  backgroundColor: 'white',
})
const colorDot = css({
  width: 20,
  height: 20,
  cursor: 'pointer',
})
const colorMap = [
  {
    id: 1,
    color: '#55efc4',
  },
  {
    id: 2,
    color: '#00b894',
  },
  {
    id: 3,
    color: '#81ecec',
  },
  {
    id: 4,
    color: '#00cec9',
  },
  {
    id: 5,
    color: '#74b9ff',
  },
  {
    id: 6,
    color: '#0984e3',
  },
  {
    id: 7,
    color: '#a29bfe',
  },
  {
    id: 8,
    color: '#6c5ce7',
  },
  {
    id: 9,
    color: '#dfe6e9',
  },
  {
    id: 10,
    color: '#b2bec3',
  },
  {
    id: 11,
    color: '#ffeaa7',
  },
  {
    id: 12,
    color: '#fdcb6e',
  },
  {
    id: 13,
    color: '#fab1a0',
  },
  {
    id: 14,
    color: '#e17055',
  },
  {
    id: 15,
    color: '#ff7675',
  },
  {
    id: 16,
    color: '#d63031',
  },
  {
    id: 17,
    color: '#fd79a8',
  },
  {
    id: 18,
    color: '#e84393',
  },
  {
    id: 19,
    color: '#636e72',
  },
  {
    id: 20,
    color: '#2d3436',
  },
]
