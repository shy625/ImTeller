package com.classic.imteller.api.service;

import com.classic.imteller.api.repository.Art;
import com.classic.imteller.api.repository.ArtRepository;
import com.classic.imteller.api.repository.VoteRepository;
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
}
