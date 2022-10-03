package com.classic.imteller.api.service;

import com.classic.imteller.api.repository.Art;
import com.classic.imteller.api.repository.ArtRepository;
import com.classic.imteller.api.repository.Vote;
import com.classic.imteller.api.repository.VoteRepository;
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

    public List<Art> getMyVotePaint(String email) {
        List<Art> res = artRepository.findAllByTokenIdAndIsVote(email);
        return res;
    }

    public List<Art> getVotePaints() {
        List<Art> res = artRepository.findAllByTokenIdAndIsVote();
        return res;
    }

    public void electedPaint(Long artId) {
        // artId를 바탕으로, 현재 진행중인 vote에서 해당하는 artId를 찾아서
        // vote테이블의 isVoting을 2로 바꾼다
        Vote vote = voteRepository.findByArtIdAndIsVoting(artId, 1).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        vote.updateIsVoting(2);
        voteRepository.save(vote);
    }
}
