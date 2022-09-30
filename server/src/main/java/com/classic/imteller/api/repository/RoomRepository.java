package com.classic.imteller.api.repository;

import com.classic.imteller.api.dto.room.*;
import com.classic.imteller.exception.CustomException;
import com.classic.imteller.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.*;

@Repository
@RequiredArgsConstructor
public class RoomRepository {
    private static final HashMap<Long, Room> roomList = new HashMap<>();
    private static final List<Long> usingId = new ArrayList<>();
    private final UserRepository userRepository;
    private final GameRepository gameRepository;
    private final ArtRepository artRepository;

    public Room getRoom (Long sessionId) {
        Room room = roomList.get(sessionId);
        return room;
    }

    public HashMap<Long, Room> getRooms() {
        return roomList;
    }

    public List<Long> getUsingId () {
        return usingId;
    }

    @Transactional
    public void createRoom (Room room) {
        try {
            roomList.put(room.getId(), room);
            usingId.add(room.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean joinRoom (String userSessionId, long sessionId, JoinReqDto joinReqDto) {
        try {
            // 세션아이디 등록
            HashMap<String, String> usids = roomList.get(sessionId).getUserSessionIds();
            usids.put(joinReqDto.getNickname(), userSessionId);
            roomList.get(sessionId).setUserSessionIds(usids);

            // 접속자
            List<String> players = roomList.get(sessionId).getPlayers();
            players.add(joinReqDto.getNickname());
            roomList.get(sessionId).setPlayers(players);

            // 레디 여부
            HashMap<String, Boolean> ready = roomList.get(sessionId).getReady();

            // 방장이면 항상 true
            if (roomList.get(sessionId).getLeader().equals(joinReqDto.getNickname())) {
                ready.put(joinReqDto.getNickname(), true);
            }
            else ready.put(joinReqDto.getNickname(), false);
            roomList.get(sessionId).setReady(ready);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public String exitRoom (long sessionId, ExitReqDto exitReqDto) {
        try {
            // exit할때
            // 나간사람이 방장이면 방장 바꾸기
            // 만약 1명뿐이라면 특수케이스
            if (roomList.get(sessionId).getPlayers().size() > 1) {
                String nextLeader = roomList.get(sessionId).getPlayers().get(1);
                if (nextLeader.equals(exitReqDto.getNickname())) nextLeader = roomList.get(sessionId).getPlayers().get(0);
                roomList.get(sessionId).setLeader(nextLeader);
            }
            // players에서 없애기
            List<String> players = roomList.get(sessionId).getPlayers();
            players.remove(exitReqDto.getNickname());
            roomList.get(sessionId).setPlayers(players);
            // 만약 모든 플레이어가 다 나갔다면?
            if (players.size() == 0) {
                Game game = gameRepository.findBySession(sessionId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
                game.deleteSession();
                gameRepository.save(game);
                // 게임소켓방에서도 나가기
                roomList.remove(sessionId);
                return "ok";
            }
            // ready에서 없애기
            HashMap<String, Boolean> newReady = roomList.get(sessionId).getReady();
            newReady.remove(exitReqDto.getNickname());
            // 나간사람이 방장이면 새로운 방장의 ready상태를 true로 변경
            newReady.replace(roomList.get(sessionId).getLeader(), true);
            roomList.get(sessionId).setReady(newReady);
            // userSessionId에서 없애기
            HashMap<String, String> usids = roomList.get(sessionId).getUserSessionIds();
            usids.remove(exitReqDto.getNickname());
            roomList.get(sessionId).setUserSessionIds(usids);

            // 밑 요소들은 게임중일 때 작동
            if (roomList.get(sessionId).getStarted()) {
                // cards에서 없애기
                HashMap<String, List<Long>> newCards = roomList.get(sessionId).getCards();
                newCards.remove(exitReqDto.getNickname());
                roomList.get(sessionId).setCards(newCards);
                // items에서 없애기
                HashMap<String, List<ItemDto>> newItems = roomList.get(sessionId).getItems();
                newItems.remove(exitReqDto.getNickname());
                roomList.get(sessionId).setItems(newItems);
                // score에서 없애기
                HashMap<String, Integer> newScore = roomList.get(sessionId).getScore();
                newScore.remove(exitReqDto.getNickname());
                roomList.get(sessionId).setScore(newScore);
                // hand에서 없애기
                HashMap<String, List<GameCardDto>> newHand = roomList.get(sessionId).getHand();
                newHand.remove(exitReqDto.getNickname());
                roomList.get(sessionId).setHand(newHand);
                // status에서 없애기
                HashMap<String, Boolean> newStatus = roomList.get(sessionId).getStatus();
                newStatus.remove(exitReqDto.getNickname());
                roomList.get(sessionId).setStatus(newStatus);
                // choice에서 없애기
                HashMap<String, Long> newChoice = roomList.get(sessionId).getChoice();
                newChoice.remove(exitReqDto.getNickname());
                roomList.get(sessionId).setChoice(newChoice);

                // 만약 게임 도중에 나가면 1패가 추가되도록 만들기

                User user = userRepository.findByNickname(exitReqDto.getNickname()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
                user.plusLose();
                userRepository.save(user);

                // 나갔을 때 3명 이하가 되면 게임 종료 알림 전달 (end 구현 이후 적용 예정)
            }

            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    public HashMap<String, Boolean> ready (long sessionId, ReadyReqDto readyReqDto) {
        try {
            HashMap<String, Boolean> readyMap = roomList.get(sessionId).getReady();
            readyMap.replace(readyReqDto.getNickname(), readyReqDto.getIsReady());
            roomList.get(sessionId).setReady(readyMap);
            return roomList.get(sessionId).getReady();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void start (long sessionId) {
        // 시작변수 변경
        roomList.get(sessionId).setStarted(true);
    }

    public boolean selectCards (long sessionId, SelectReqDto selectReqDto) {
        try {
            // 유저가 제출한 카드 등록
            roomList.get(sessionId).getCards().put(selectReqDto.getNickname(), selectReqDto.getSelectedCard());
            roomList.get(sessionId).getNftDeck().addAll(selectReqDto.getSelectedCard());
            // 낸 유저 status에 등록하기
            roomList.get(sessionId).getStatus().put(selectReqDto.getNickname(), false);
            // 아이템 등록하기
            List<ItemDto> itemList = new ArrayList<>();
            for (Long artId : selectReqDto.getSelectedCard()) {
                Art art = artRepository.findById(artId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
                ItemDto item = ItemDto.builder()
                        .cardId(art.getId())
                        .grade(art.getEffect().getGrade())
                        .effect(art.getEffect().getEffect())
                        .effectNum(art.getEffect().getDetail())
                        .isUsed(false).build();
                itemList.add(item);
            }
            roomList.get(sessionId).getItems().put(selectReqDto.getNickname(), itemList);

            // 점수 초기화
            roomList.get(sessionId).getScore().put(selectReqDto.getNickname(), 0);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 덱을 만들고 카드를 드로우하는 함수
    public HashMap<String, List<GameCardDto>> draw(long sessionId) {
        HashMap<String, List<GameCardDto>> basicHand = new HashMap<>();
        // 기본덱은 1부터 74
        List<Long> deck = new ArrayList<>();
        for (long i = 1; i <= 74; ++i) deck.add(i);

        // 새로 넣어야 하는 nft카드의 개수 추출하기
        int nftNum = roomList.get(sessionId).getNftDeck().size();
        // 랜덤으로 deck 요소 하나씩 빼는걸 nft카드의 개수만큼 반복
        for (int i = 0; i < nftNum; ++i) {
            double random = Math.random();
            int num = (int)Math.round(random * (deck.size() - 1));
            System.out.println(num);
            deck.remove(num);
        }
        // nft카드 넣기
        deck.addAll(roomList.get(sessionId).getNftDeck());

        // 셔플하기
        Collections.shuffle(deck);

        // 플레이어에게 6개씩 할당하기
        List<String> players = roomList.get(sessionId).getPlayers();

        for (int i = 0; i < players.size(); ++i) {
            List<GameCardDto> myHand = new ArrayList<>();
            for (int j = 0; j < 6; ++j) {
                Art art = artRepository.findById(deck.get(j)).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));;
                GameCardDto tmpCard = GameCardDto.builder()
                    .cardId(deck.get(j))
                    .cardUrl(art.getUrl()).build();
                myHand.add(tmpCard);
            }
            // 덱에서 사용한 카드 잘라내기
            deck = deck.subList(6, deck.size());
            basicHand.put(players.get(i), myHand);
        }

        roomList.get(sessionId).setDeck(deck);

        // 할당한 내용 hand변수에 반영하고 반환하기
        roomList.get(sessionId).setHand(basicHand);
        return basicHand;
    }

    public void setPhase (long sessionId, int phase) {
        roomList.get(sessionId).setTurn(phase);
    }

    public void startTimer (long sessionId, TimerTask task) {
        roomList.get(sessionId).setTimer(new Timer());

        int phase = roomList.get(sessionId).getTurn();
        int time;
        if (phase == 1 || phase == 2) time = 30;
        else if (phase == 3) {
            if (roomList.get(sessionId).getActivated().size() > 0) {
                int maxEffectNum = 0;
                for (EffectDto effect : roomList.get(sessionId).getActivated()) {
                    if (effect.getEffect() == 1 && maxEffectNum < effect.getEffectNum()) {
                        maxEffectNum = effect.getEffectNum();
                    }
                }
                time = 30 - maxEffectNum;
            } else time = 30;
        }
        else if (phase == 4) time = 10;
        else time = 0;

        roomList.get(sessionId).getTimer().schedule(task, time * 1000);
    }

    public void stopTimer (long sessionId) {
        roomList.get(sessionId).getTimer().cancel();
        roomList.get(sessionId).setTimer(new Timer());
    }

    public void saveTellerInfo (long sessionId, TellerDto tellerDto) {
        TableDto table = TableDto.builder()
                .nickname(tellerDto.getNickname())
                .cardId(tellerDto.getCardId())
                .cardUrl(tellerDto.getCardUrl())
                .isTeller(true).build();
        roomList.get(sessionId).getStatus().replace(tellerDto.getNickname(), true);
        roomList.get(sessionId).getTable().add(table);
    }

    public void setNextTeller (long sessionId) {
        List<String> players = roomList.get(sessionId).getPlayers();
        String teller = roomList.get(sessionId).getTeller();
        if (players.indexOf(teller) == players.size() - 1) {
            int laps = roomList.get(sessionId).getLaps() + 1;
            roomList.get(sessionId).setLaps(laps);
            roomList.get(sessionId).setTeller(players.get(0));
        } else {
            int idx = players.indexOf(teller) + 1;
            roomList.get(sessionId).setTeller(players.get(idx));
        }
    }

    public void forcedCard (long sessionId) {
        List<String> players = roomList.get(sessionId).getPlayers();
        HashMap<String, Boolean> status = roomList.get(sessionId).getStatus();
        for (String player: players) {
            // 해당플레이어가 아직 제출하지 않았다면?
            if (!status.get(player)) {
                // 해당 플레이어의 첫 번째 hand카드를 강제로 추출
                GameCardDto gameCard = roomList.get(sessionId).getHand().get(player).get(0);
                roomList.get(sessionId).getHand().get(player).remove(0);
                // 추출한 카드를 강제제출등록
                TableDto table = TableDto.builder()
                        .nickname(player)
                        .cardId(gameCard.getCardId())
                        .cardUrl(gameCard.getCardUrl())
                        .isTeller(false).build();
                roomList.get(sessionId).getTable().add(table);
            }
        }
    }

    public boolean getUserCard (long sessionId, UserCardDto userCardDto) {
        TableDto table = TableDto.builder()
                .nickname(userCardDto.getNickname())
                .cardId(userCardDto.getCardId())
                .cardUrl(userCardDto.getCardUrl())
                .isTeller(false).build();
        roomList.get(sessionId).getTable().add(table);
        roomList.get(sessionId).getStatus().replace(userCardDto.getNickname(), true);

        // 모두가 제출했는지 확인하는 부분
        boolean chk = true;
        HashMap<String, Boolean> status = roomList.get(sessionId).getStatus();
        for (String key : status.keySet()) {
            if (!status.get(key)) {
                chk = false;
                break;
            }
        }
        return chk;
    }

    public HashMap<String, Boolean> getUserStatus (long sessionId) {
        return roomList.get(sessionId).getStatus();
    }
}
