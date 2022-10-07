import { css } from '@emotion/react'
import gameFAQ1 from 'assets/image/gameFAQ1.webp'
import gameFAQ4 from 'assets/image/gameFAQ4.webp'
import gameFAQ3 from 'assets/image/gameFAQ3.webp'

const GameDetail = () => {
	return (
		<div css={Box}>
			<div css={Data}>
				<p>&nbsp;</p>
				<h3>[게임 정보]</h3>
				<p>1. 인원: 3-8인</p>
				<p>2. 기본 카드: 74장</p>
				<p>3. 승리조건</p>
				<p>
					<li>1. 라운드: 정해진 라운드가 끝나면 게임이 종료</li>
					<li>2. 점수: 목표 점수에 도달하는 유저가 생기면 게임이 종료</li>
				</p>

				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<h3>[게임하기]</h3>
				<p>상단의 게임 탭을 누르고, 새로운 방을 만들거나 이미 존재하는 방에 참여합니다.</p>

				<p>&nbsp;</p>
				<img src={gameFAQ1} />
				<p>&nbsp;</p>

				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<h3>[게임 방법]</h3>
				<p>
					<li>한라운드에서 모든 유저는 돌아가면서 텔러가 됩니다.</li>
					<li>
						텔러는 본인의 카드 중 하나를 선택한 뒤, 카드에 어울리는 적절한 작품명을 작성하여
						제출합니다.
					</li>
					<li>
						다른 유저들은 텔러가 작성한 작품명만을 본 뒤, 본인의 카드 중 해당 작품명에 가장 어울리는
						카드를 선택합니다.
					</li>
					<li>
						카드 선택 시간이 종료되면 유저들은 텔러를 포함한 모든 유저들이 제출한 카드를 확인합니다.
					</li>
					<li>제출된 카드 중 텔러가 제출한 카드를 추측하여 선택합니다.</li>
					<li>선택 시간이 종료되면 선택 결과에 따라 점수를 부여합니다.</li>
				</p>

				<p>&nbsp;</p>
				<img src={gameFAQ4} width={'400px'} />
				<p>&nbsp;</p>

				<p>&nbsp;</p>
				<p>&nbsp;</p>

				<h3>[아이템 사용]</h3>
				<p>
					<li>
						텔러와 유저가 카드를 제출하는 시간에 우측 아이템 버튼을 더블클릭하여 자유롭게 아이템을
						사용할 수 있습니다.
					</li>
					<li>
						사용하는 아이템은 총 6가지가 존재하며, [카드 미리 받기] 아이템을 제외한 나머지 아이템은
						한 턴에 하나의 아이템만 적용됩니다.
					</li>
					<li>[카드 미리 받기] 아이템의 경우 즉시 적용됩니다.</li>
					<li>
						점수 관련 아이템은 점수 계산 시점에 적용되고, 나머지 선택 방해 아이템은 카드 선택 시점에
						적용됩니다.
					</li>
					<li>
						만약 같은 효과의 아이템이 여러 번 사용되었다면, 상위 등급의 아이템만 사용되고, 나머지는
						버려집니다.
					</li>
					<li>
						같은 등급의 아이템이라면 먼저 사용한 사람의 아이템만 적용되고, 나머지는 버려집니다.
					</li>
				</p>

				<p>&nbsp;</p>
				<img src={gameFAQ3} width={'80px'} />
				<p>&nbsp;</p>

				<p>&nbsp;</p>
				<p>&nbsp;</p>

				<h3>[점수 획득]</h3>
				<p>1. 기본 점수</p>
				<p>
					<li>
						[텔러] 유저가 텔러의 카드를 모두 선택하거나, 선택하지 못하면 점수획득 실패, 그 외에는 +6
					</li>
					<li>[유저] 텔러의 카드 선택에 성공시 +2</li>
				</p>
				<p>2. 추가점수</p>
				<p>
					<li>[유저] 다른 유저가 본인의 카드를 선택 시 유저당 +2</li>
					<li>[전체] 아이템 사용으로 인한 점수효과 (+1, +2, +3, 150%, 200%, 250%)</li>
				</p>
				<p>&nbsp;</p>
			</div>
		</div>
	)
}

const Box = css`
	display: flex;
	flex-direction: column;
	margin: 2rem;
`

const Data = css`
	width: 100%;
	height: 65vh;
	border-radius: 1rem;
	box-shadow: 2px 2px 16px white;
	margin-bottom: 1rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	overflow: auto;
	flex-direction: column;

	&::-webkit-scrollbar {
		width: 8px;
		height: 8px;
		border-radius: 3px;
		background-color: #3e525f;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #ffffff;
		border-radius: 3px;
	}

	p {
		font-family: 'LeferiBaseType-RegularA';
		color: white;
		margin: 0.5rem;
	}

	h3 {
		font-family: LeferiPoint-BlackObliqueA;
		color: #ffff00;
		margin: 0.25rem;
	}
`

export default GameDetail