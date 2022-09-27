/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { css } from '@emotion/react'

import art from 'actions/api/art'

import Layout from 'layout/layout'

export default function Paint() {
  // form 전송용
  const email = useSelector((state: any) => state.email)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const CANVAS_WIDTH = 800
  const CANVAS_HEIGHT = 800
  const location = useLocation()
  const { isNew } = location.state
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const colorRef = useRef(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState(5)
  const [color, setColor] = useState('')
  const [isFilling, setIsFilling] = useState(false)
  const [text, setText] = useState('')
  const [restore, setRestore] = useState([])
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    setCanvas(canvas)

    const context = canvas.getContext('2d')
    contextRef.current = context
    setCtx(contextRef.current)
  }, [])

  function start({ nativeEvent }) {
    setIsDrawing(true)
    ctx.beginPath()
    ctx.moveTo(nativeEvent.offsetX, nativeEvent.offsetY)
  }

  function draw({ nativeEvent }) {
    if (isDrawing) {
      ctx.lineCap = 'round'
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.lineTo(nativeEvent.offsetX, nativeEvent.offsetY)
      ctx.stroke()
      return
    }
  }
  // function onMove({ nativeEvent }) {
  //   if (isDrawing) {
  //     ctx.lineCap = 'round'
  //     ctx.lineWidth = lineWidth
  //     ctx.strokeStyle = color
  //     ctx.fillStyle = color
  //     ctx.lineTo(nativeEvent.offsetX, nativeEvent.offsetY)
  //     ctx.stroke()
  //     setRestore([...restore, ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)])
  //     setIndex(index + 1)
  //     console.log(restore)
  //     console.log(index)
  //     return
  //   }
  //   ctx.beginPath()
  //   ctx.moveTo(nativeEvent.offsetX, nativeEvent.offsetY)
  // }
  function onMouseDown() {
    setIsDrawing(true)
    ctx.beginPath()
  }
  function cancelPainting({ nativeEvent }) {
    if (isDrawing) {
      ctx.stroke()
      ctx.closePath()
      setIsDrawing(false)
    }
    if (nativeEvent.type != 'mouseout') {
      setRestore([...restore, ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)])
      setIndex(index + 1)
    }
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

    setRestore([])
    setIndex(-1)
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
  function undo() {
    if (index < 0) {
      eraseAll()
    } else {
      setRestore([...restore.slice(0, index)])
      setIndex(index - 1)
      ctx.putImageData(restore[index], 0, 0)
    }
  }
  function savePic() {
    let imgDataUrl = canvas.toDataURL('image/png')

    // 이미지 파일 다운로드용
    // const a = document.createElement('a')
    // a.href = imgDataUrl
    // a.download = 'MyFirstCanvas.png'
    // a.click()

    let imgData = atob(imgDataUrl.split(',')[1])
    let array = []
    for (let i = 0; i < imgData.length; i++) {
      array.push(imgData.charCodeAt(i))
    }
    let imgFile = new File([new Uint8Array(array)], 'picture', { type: 'image/png' })

    const data: any = new FormData()

    data.append('email', email)
    data.append('paintTitle', title)
    data.append('content', content)
    data.append('paintImage', imgFile)

    art.paintCreate(data)
  }
  return (
    <Layout>
      <main>
        <h1>여긴 Paint</h1>
        <div css={center}>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="작품의 제목을 입력해주세요"
          />
          <input
            onChange={(e) => setContent(e.target.value)}
            placeholder="작품의 설명을 입력해주세요"
          />

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
          <button onClick={undo}>취소</button>
          <button onClick={savePic}>그림 저장</button>
          <canvas
            ref={canvasRef}
            css={canvasStyle}
            onMouseMove={draw}
            onMouseDown={start}
            onMouseUp={cancelPainting}
            onMouseLeave={cancelPainting}
            onClick={onCanvasClick}
            // onDoubleClick={onDoubleClick}
          ></canvas>
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
