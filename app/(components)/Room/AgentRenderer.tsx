import { useTracks, VideoTrack } from "@livekit/components-react";
import { Track } from "livekit-client";

export default function AgentRenderer() {
  const trackRefs = useTracks([Track.Source.Camera]);
  const agentCamTrackRef = trackRefs.find(t => t.participant.identity?.toLowerCase().includes("agent"));
  console.log({ trackRefs, agentCamTrackRef });

  return (
    <>{agentCamTrackRef ? <VideoTrack className="w-full h-full" trackRef={agentCamTrackRef} /> : <div>Agent</div>}</>
  );
}
