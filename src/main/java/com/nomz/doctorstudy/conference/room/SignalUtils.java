package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.conference.room.signal.MuteSignal;
import com.nomz.doctorstudy.conference.room.signal.UnmuteSignal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SignalUtils {
    private final SignalTransmitter signalTransmitter;

    public void sendMuteSignals(Long roomId, List<Long> memberIds) {
        for (Long memberId : memberIds) {
            signalTransmitter.transmitSignal(roomId, new MuteSignal(memberId));
        }
    }
    public void sendUnmuteSignals(Long roomId, List<Long> memberIds) {
        for (Long memberId : memberIds) {
            signalTransmitter.transmitSignal(roomId, new UnmuteSignal(memberId));
        }
    }
}
