const { Sequelize } = require("sequelize");
const Op = require("sequelize").Op;

const Room = require("../db/room");
const RoomUser = require("../db/room-user");
const UserSelection = require("../db/user-selection");

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

  const q_select = async (roomId, question, selection) => {
    try {
      //TODO: 방 참가 구현(socket)
      const room = await Room.findByPk(roomId);

      //방 상태가 ready인지 체크
      if (!room || room.status !== "start") {
        throw "방에 참가하고 있지 않습니다.";
      }

      //현재 문항번호와 동일한지?
      if (room.question !== parseInt(question)) {
        throw "현재 답변할 수 없는 문항입니다.";
      }

      //나는 살아있는지?
      const myStatus = await RoomUser.findOne({
        where: {
          userId: 2,
          roomId: 1,
        },
      });

      if (
        !myStatus ||
        myStatus.status === "die" ||
        myStatus.status === "ready"
      ) {
        throw "답변을 할 수 없는 상태입니다.";
      }

      //기존에 참여했던 방인지 체크 (userId로 체크)
      var already = await UserSelection.findOne({
        where: {
          userId: 2,
          roomId: room.id,
          question: question,
        },
      });

      if (already) {
        //이미 답변했다면 수정
        const newAnswer = {
          ...already,
          selection,
        };
        await UserSelection.update(newAnswer, {
          where: {
            id: already.id,
          },
        });
      } else {
        //그렇지 않다면 저장
        const newAnswer = {
          userId: 2,
          roomId: room.id,
          question,
          selection,
        };
        await UserSelection.create(newAnswer);
      }

      return true;
    } catch (error) {
      throw error;
    }
  };

  const roomStatus = async (roomId, status) => {
    try {
      //TODO: 방 참가 구현(socket)
      const room = await Room.findByPk(roomId);

      //방 상태가 ready인지 체크
      //TODO: 유저 아이디 변경해주기
      if (!room || room.userId !== 1) {
        throw "권한이 없습니다.";
      }

      var changeData = {
        status,
      };

      //관리자가 방 상태 바꾸기 ( start 로 바꿀 경우 question 1로 설정 및 사용자에게 전송)
      if (status === "start") {
        changeData.question = 1;

        await RoomUser.update(
          { status: "survive" },
          {
            where: {
              roomId,
            },
          }
        );
      }
      //끝내면
      //TODO: Socket 전송

      Room.update(changeData, {
        where: {
          id: room.id,
        },
      });

      return true;
    } catch (error) {
      throw error;
    }
  };

  const questionNext = async (roomId, selection, status) => {
    try {
      //TODO: 방 참가 구현(socket)
      const room = await Room.findByPk(roomId);

      //방 상태가 ready인지 체크
      //TODO: 유저 아이디 변경해주기
      if (!room || room.userId !== 1) {
        throw "권한이 없습니다.";
      }
      if (room.status === "end") {
        throw "이미 종료된 방입니다.";
      }

      var changeData = {
        status,
      };

      //사용자 답변 체크
      await UserSelection.update(
        { correct: "t" },
        {
          where: {
            roomId,
            question: room.question,
            selection,
          },
        }
      );
      await UserSelection.update(
        { correct: "f" },
        {
          where: {
            roomId,
            question: room.question,
            selection: { [Op.ne]: selection },
          },
        }
      );

      //다음 문항 낸다 선택 -> question + 1 하고 소켓 전송
      if (status === "start") {
        changeData.question = room.question + 1;
      } else if (status === "end") {
        //winner 선정
        //correct가 't'인 데이터의 count를 그룹별로 가져오기
        const results = await UserSelection.findAll({
          attributes: [
            "userId",
            [Sequelize.fn("COUNT", Sequelize.col("correct")), "correctCount"],
          ],
          where: { correct: "t" },
          group: ["userId"],
          order: [[Sequelize.literal("correctCount"), "DESC"]],
          raw: true,
        });

        //가장 높은 correctCount 값을 찾기
        const maxCount = results[0].correctCount;

        //maxCount와 일치하는 데이터를 모두 가져오기
        const topUsers = results.filter(
          (result) => result.correctCount === maxCount
        );
        const topUserIds = topUsers.map((user) => user.userId);

        await RoomUser.update(
          { status: "winner" },
          {
            where: {
              userId: {
                [Op.in]: topUserIds, // topUserIds 배열에 포함된 userId만 선택
              },
            },
          }
        );

        //끝내면 사용자에게 소켓 전송
      }

      //TODO: Socket 전송

      Room.update(changeData, {
        where: {
          id: room.id,
        },
      });

      return true;
    } catch (error) {
      throw error;
    }
  };

  return {
    insertRoom,
    joinRoom,
    q_select,

    roomStatus,
    questionNext,
  };
}

export default roomService();
