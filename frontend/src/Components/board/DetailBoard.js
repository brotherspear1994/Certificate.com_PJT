import React, { useState, useEffect } from "react";
import "../css/css.scss";
import { boardApi,commentApi } from "../../utils/axios";
import { FiEye, FiCalendar } from "react-icons/fi";
import { Form, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
function Detail({ data,isWriter }) {
  return (
    <div style={{ flex: 1 }}>
      <hr style={{ height: 3 }}></hr>
      <div id="detailBoardTop">
        <div style={{ flex: 8.5, float: "left", paddingLeft: "10px" }}>
          <div>
            <h1 id="detailBoardTitle">{data.boardTitle}</h1>
            <div>{data.boardWriter}</div>
          </div>
        </div>
        <div style={{ flex: 1.5 }}>
          <div>
            <div>
              <FiCalendar />
              &nbsp;&nbsp;&nbsp;
              {data.boardCreate}
            </div>
            <br></br>
            <div>
              <FiEye />
              &nbsp;&nbsp;&nbsp;
              {data.boardHit}
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div>{isWriter ?
        <div>
          <div><Link to={`/motifyBoard/${data.boardId}`}>수정</Link></div>
        </div>
        : <div></div>}</div>
      <div>
        <div id="detailBoardContent">{data.boardContent}</div>
        {/* <BiDislike />
        <BiLike/> */}
      </div>
      <div>{/* 자신의 글이면 삭제하기와 수정하기 활성화하기 */}</div>
    </div>
  );
}

export default function DetailBoard({ match }) {
  const { no } = match.params;
  const [board, setBoard] = useState({});
  const [comment, setComment] = useState([]);
  const [writer, setWriter] = useState(0);

  useEffect(async () => {
    const fill = async () => {
      const res = await boardApi.getDetailBoard(no);
      setBoard(res.board);
      setComment(res.comment);
      if (localStorage.getItem('authenticatedUser') === res.board.boardWriter) {
        setWriter(1);
      }
    };
    await fill();
  }, []);


  async function createComment() {
    let data = new Object();
    data.boardId = no;
    data.commentContent = document.getElementById("content").value;
    let res=await commentApi.addComment(data);
    if (res == false)
      alert("댓글 등록에 실패하였습니다.");
    else {
      const res = await commentApi.getComment(no);
      setComment(res);
    }
  }



  return (
    <div id="detailBoard">
      <Detail data={board} isWriter={writer} />
      <div>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control id="content" as="textarea" />
        </Form.Group>
        <Button variant="outline-primary" onClick={createComment}>Primary</Button>
      </div>
      <div>
        {comment&&comment.map(el => (
          <div>
            <div>{el.commentContent}</div>
            <div>{el.commentCreate && el.commentCreate.map((e) =>
              (<div>{e}.</div>)
              )}
            </div>
            <div>{el.userId.user_nickname}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
