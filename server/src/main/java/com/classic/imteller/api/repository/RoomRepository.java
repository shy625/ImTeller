package com.classic.imteller.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

@Repository
public class RoomRepository {
    private static final List<Room> roomList = new ArrayList<>();
    private static final List<Integer> usingId = new ArrayList<>();

    public Room getRoom (int sessionId) {
        for (Room room : roomList) {
            if (room.getId() == sessionId) {
                return room;
            }
        }
        return null;
    }

    public List<Room> getRooms() {
        return roomList;
    }

    public List<Integer> getUsingId () {
        return usingId;
    }

    public void createRoom (Room room) {
        roomList.add(room);
        usingId.add(room.getId());
    }
}
