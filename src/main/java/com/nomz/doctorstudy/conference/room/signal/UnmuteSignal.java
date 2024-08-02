package com.nomz.doctorstudy.conference.room.signal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UnmuteSignal implements Signal {
    private Long id;
}
