package com.carolinarollergirls.scoreboard.xml.stream;
/**
 * Copyright (C) 2008-2012 Mr Temper <MrTemper@CarolinaRollergirls.com>
 *
 * This file is part of the Carolina Rollergirls (CRG) ScoreBoard.
 * The CRG ScoreBoard is licensed under either the GNU General Public
 * License version 3 (or later), or the Apache License 2.0, at your option.
 * See the file COPYING for details.
 */

import org.jdom.Document;

public class StreamListenerFilter implements StreamListener {
    public StreamListenerFilter(StreamListener l) { listener = l; }

    @Override
    public void xmlChange(Document d) { listener.xmlChange(d); }

    @Override
    public void end() { listener.end(); }

    protected StreamListener getListener() { return listener; }

    protected StreamListener listener;
}
