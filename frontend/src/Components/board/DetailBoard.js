import React, { useState, useEffect } from "react";
import "../css/css.scss";
import { boardApi,commentApi } from "../../utils/axios";
import { FiEye, FiCalendar } from "react-icons/fi";
import { Form, Button } from "react-bootstrap";
function Detail({ data }) {
  console.log("detail----");
  console.log(data);
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
      <div>
        <div id="detailBoardContent">{data.boardContent}</div>
        {/* <BiDislike />
        <BiLike/> */}
      </div>
      <div>{/* 자신의 글이면 삭제하기와 수정하기 활성화하기 */}</div>
    </div>
  );
}

function Comment({ comment }) {
  // console.log("comment--");
  // console.log(comment);
  return (
    <div>
      {comment.map(el => (
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
  )
}

export default function DetailBoard({ match }) {
  const { no } = match.params;
  const [board, setBoard] = useState({});
  const [comment, setComment] = useState([]);
  // let board = {};
  // let comment = [];

  useEffect(async () => {
    const fill = async () => {
      const res = await boardApi.getDetailBoard(no);
      console.log(res);
      setBoard(res.board);
      setComment(res.comment);
      // board = res.board;
      // comment = res.comment;
    };
    
    await fill();
    console.log("userEffect---");
    console.log(comment);
    console.log("useEffect end");
  }, []);


  async function createComment() {
    console.log(document.getElementById("content").value);
    let data = new Object();
    data.boardId = no;
    data.commentContent = document.getElementById("content").value;
    let res=commentApi.addComment(data);
    if (res == false)
      alert("댓글 등록에 실패하였습니다.");
    else {
      const res = await boardApi.getDetailBoard(no);
      setComment(res.comment);
      console.log(comment);
    }
  }
  

  console.log("function---");
  console.log(comment);
  return (
    <div id="detailBoard">
      <Detail data={board} />
      <div>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control id="content" as="textarea" />
        </Form.Group>
        <Button variant="outline-primary" onClick={ createComment}>Primary</Button>
      </div>
      <Comment comment={comment}/>
      {/* <div>
        {
          comment.map((el) => {
          <div>123{el.commentContent}</div>
        })}
      </div> */}
    </div>
  );
}
