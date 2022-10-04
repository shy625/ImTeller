import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Item from 'components/item'
import { removeItem, setItemState } from 'store/modules/game'

export default function Items(props: any) {
	const dispatch = useDispatch()
	const { client, roomId } = props
	const items = useSelector((state: any) => state.items)
	const { nickname } = useSelector((state: any) => state.currentUser)

	const onClick = (event, item) => {
		if (event.detail !== 2) return

		client.publish({
			destination: `pub/room/${roomId}/item`,
			body: JSON.stringify({
				nickname,
				cardId: item.cardId,
				grade: item.grade,
				effect: item.effect,
				effectNum: item.effectNum,
			}),
		})
		console.log('아이템 사용')
		dispatch(removeItem(item.cardId))
	}

	return (
		<div>
			{items
				.filter((item) => !item.used)
				.map((item) => (
					<Item
						onClick={(e) => {
							onClick(e, item)
						}}
						item={item}
						key={item.cardId}
					/>
				))}
		</div>
	)
}
