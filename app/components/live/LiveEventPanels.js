"use client";

import { useLive } from "../../lib/use-live";
import { fetchEventPanels } from "../../lib/sheets-client";
import EventReplayGate from "../EventReplayGate";

/** Event-panel archive — build-time initial panels, live-refreshed from the sheet.
 *  (The replay gate form itself stays inert until forms are switched on.) */
export default function LiveEventPanels({ initial = [] }) {
  const panels = useLive(initial, fetchEventPanels);
  return <EventReplayGate panels={panels} />;
}
