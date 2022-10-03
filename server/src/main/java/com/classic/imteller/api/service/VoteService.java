package com.classic.imteller.api.service;

import com.classic.imteller.api.repository.*;
import com.classic.imteller.exception.CustomException;
import com.classic.imteller.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteRepository voteRepository;
    private final ArtRepository artRepository;
    private final UserRepository userRepository;
    private final UserVoteRepository userVoteRepository;
    public List<Art> getMyVotePaint(String email) {
        List<Art> res = artRepository.findAllByTokenIdAndIsVote(email);
        return res;
    }

    public List<Art> getVotePaints() {
        List<Art> res = artRepository.findAllByTokenIdAndIsVote();
        return res;
    }

    public String votePaint(String userNickname, long artId){
        String result;
        User user = userRepository.findByNickname(userNickname).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        Vote vote = voteRepository.findByArtIdAndIsVoting(artId, true).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
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
