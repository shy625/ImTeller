package com.classic.imteller.api.service;

import com.classic.imteller.api.repository.*;
import com.classic.imteller.exception.CustomException;
import com.classic.imteller.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteRepository voteRepository;
    private final ArtRepository artRepository;
    private final UserRepository userRepository;
    private final UserVoteRepository userVoteRepository;
    public List<Art> getMyVotePaint(String email) {
        List<Art> res = artRepository.findAllByEmailAndTokenIdAndIsVote(email);
        return res;
    }

    public List<Art> getVotePaints() {
        List<Art> res = artRepository.findAllByTokenIdAndIsVote();
        return res;
    }

    @Transactional
    public void electedPaint(Long artId) {
        // artId를 바탕으로, 현재 진행중인 vote에서 해당하는 artId를 찾아서
        // vote테이블의 isVoting을 2로 바꾼다
        Vote vote = voteRepository.findByArtIdAndIsVoting(artId, 1).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        vote.updateIsVoting(2);
        voteRepository.save(vote);
        // art테이블의 isVote도 2로 바꾼다
        Art art = artRepository.findById(artId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        art.updateIsVote(2);
        artRepository.save(art);
    }

    public String votePaint(String userNickname, long artId){
        String result;
        User user = userRepository.findByNickname(userNickname).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        Vote vote = voteRepository.findByArtIdAndIsVoting(artId, 1).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        if(userVoteRepository.existsByUserAndVote(user, vote)){
            UserVote userVote = userVoteRepository.findByUserAndVote(user, vote).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
            userVoteRepository.delete(userVote);
            result= "좋아요 취소";
        }else{
            UserVote userVote = UserVote.builder()
                    .vote(vote)
                    .user(user)
                    .build();
            userVoteRepository.save(userVote);

            result= "좋아요";
        }
        return result;
    }
}
