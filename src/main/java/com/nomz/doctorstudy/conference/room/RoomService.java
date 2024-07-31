package com.nomz.doctorstudy.conference.room;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {
    private final Map<Long, Set<String>> conferencePeerMap = new ConcurrentHashMap<>();

    public void createRoom(Long conferenceId) {
        conferencePeerMap.put(conferenceId, new HashSet<>());
    }

    public void removeRoom(Long conferenceId) {
        conferencePeerMap.remove(conferenceId);
    }

    public void addPeer(Long conferenceId, String peerId) {
        conferencePeerMap.get(conferenceId).add(peerId);
    }

    public List<String> getPeerList(Long conferenceId) {
        return conferencePeerMap.get(conferenceId).stream().toList();
    }
}
