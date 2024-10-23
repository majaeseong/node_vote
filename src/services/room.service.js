const Room = require("../db/room");
const RoomUser = require("../db/room-user");

function roomService() {
  const insertRoom = async (title) => {
    try {
      const newRoom = {
        title,
        userId: 1,
        room_no: 3305,
      };

      const room = await Room.create(newRoom);
      console.log(room);
      return room;
    } catch (error) {
      throw error;
    }
  };

  const joinRoom = async (room_no, nickname) => {
    try {
      //TODO: 방 참가 구현(socket)
      const room = await Room.findOne({
        where: {
          room_no,
        },
      });

      //방 상태가 ready인지 체크
      if (!room || room.status !== "ready") {
        throw "방에 참가할 수 없습니다.";
      }

      //기존에 참여했던 방인지 체크 (userId로 체크)
      const already = await RoomUser.count({
        where: {
          userId: 2,
          roomId: room.id,
        },
      });

      if (already > 0) {
        //기존에 참여했던 방이라면 DB에서 데이터 가져옴
      } else {
        //그렇지 않다면 nickname 을 받고 ,satus 를 ready로 설정
        const newJoin = {
          userId: 2,
          roomId: room.id,
          nickname,
        };
        await RoomUser.create(newJoin);
      }
      //TODO: Socket 입력
      return true;
    } catch (error) {
      throw error;
    }
  };

  return {
    insertRoom,
    joinRoom,
  };
}

export default roomService();
