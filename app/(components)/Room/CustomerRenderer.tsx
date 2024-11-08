import { useTracks, VideoTrack } from "@livekit/components-react";
import { Track } from "livekit-client";

export default function CustomerRenderer() {
  const trackRefs = useTracks([Track.Source.Camera]);
  const customerCamTrackRef = trackRefs.find(t => t.participant.identity?.toLowerCase().includes("customer"));
  console.log({ trackRefs, customerCamTrackRef });

  return (
    <>
      {customerCamTrackRef ? (
        <VideoTrack className="w-full h-full" trackRef={customerCamTrackRef} />
      ) : (
        <div>Customer</div>
      )}
    </>
  );
}
