import { AccessToken } from "livekit-server-sdk";

type RequestData = {
  roomName: string;
  participantName: string;
};

const createToken = async ({ participantName, roomName }: { participantName: string; roomName: string }) => {
  const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
    identity: participantName,
    ttl: "60m",
  });

  at.addGrant({ roomJoin: true, room: roomName });

  return await at.toJwt();
};

export async function POST(request: Request) {
  const { roomName, participantName }: RequestData = await request.json();
  const token = await createToken({ participantName, roomName });

  return Response.json({
    token: token,
    message: "Token created",
  });
}
