package com.carolinarollergirls.scoreboard.core;

import com.carolinarollergirls.scoreboard.event.NumberedScoreBoardEventProvider;
import com.carolinarollergirls.scoreboard.event.OrderedScoreBoardEventProvider;
import com.carolinarollergirls.scoreboard.event.ScoreBoardEvent.CommandProperty;
import com.carolinarollergirls.scoreboard.event.ScoreBoardEvent.NumberedProperty;
import com.carolinarollergirls.scoreboard.event.ScoreBoardEvent.PermanentProperty;

public interface Period extends NumberedScoreBoardEventProvider<Period> {
    public PeriodSnapshot snapshot();
    public void restoreSnapshot(PeriodSnapshot s);

    public boolean isRunning();
    public int getNumber();

    public Jam getJam(int j);
    public Jam getCurrentJam();
    public int getCurrentJamNumber();

    public void startJam();
    public void stopJam();

    public long getDuration();
    public long getWalltimeStart();
    public long getWalltimeEnd();

    public enum Value implements PermanentProperty {
        CURRENT_JAM(Jam.class, null),
        CURRENT_JAM_NUMBER(Integer.class, 0),
        RUNNING(Boolean.class, false),
        DURATION(Long.class, 0L),
        WALLTIME_START(Long.class, 0L),
        WALLTIME_END(Long.class, 0L);

        private Value(Class<?> t, Object dv) { type = t; defaultValue = dv; }
        private final Class<?> type;
        private final Object defaultValue;
        public Class<?> getType() { return type; }
        public Object getDefaultValue() { return defaultValue; }
    }
    public enum NChild implements NumberedProperty {
        JAM(Jam.class);

        private NChild(Class<? extends OrderedScoreBoardEventProvider<?>> t) { type = t; }
        private final Class<? extends OrderedScoreBoardEventProvider<?>> type;
        public Class<? extends OrderedScoreBoardEventProvider<?>> getType() { return type; }
    }
    public enum Command implements CommandProperty {
        DELETE,
        INSERT_BEFORE;
        
        public Class<Boolean> getType() { return Boolean.class; }
    }

    public static interface PeriodSnapshot {
        public String getId();
        public Jam getCurrentJam();
    }
}
