let template = {
  mypage: function (userInfo) {
    return `
      <div class="box">
          <div class="profile">
              <img src="../public/images/profile.png" alt="프로필 사진">
          </div>
          <form name="mypageform" method="post" action="/account/mypageUpdate">
                  <table>
                  <tr>
                      <th class="name">이름</th>  
                      <td><input type="text" value="${userInfo.name}" name="name" class="pwchk"></td>
                  </tr>
                  <tr>
                      <th class="name">이메일</th>
                      <td><input class="pwchk" type="text" name="email" value="${userInfo.email}"></td>
                  </tr>
                  <tr>
                      <th class="name">비밀번호</th>
                      <td><input class="pwchk" type="password" id="pw" name="pw" onchange="check_pw()" value="${userInfo.pwd}"></td>
                  </tr>
                  <tr>
                      <th class="name ">비밀번호 확인</th>
                      <td><input class="pwchk" type="password" id="pwCheck" onchange="check_pw()" value="${userInfo.pwd}"></td>
                      </tr>
                      <tr>
                          <th></th>
                          <th id="check" class="chk">비밀번호가 불일치합니다.</th>
                      </tr>
                      <tr>
                          <th class="name">연락처</th>
                          <td> <input class="pwchk" type="text" name="phone" value="${userInfo.phone}"></td>
                      </tr>
                  </table>
                  <br>
                  <div class="btn">
                      <input class="button"  value= "수정하기" type="submit">
                  </div>
          </form>
      </div>
      `;
  },
  friends: function (friendList, groupList) {
    return `
      <div class="btn">
          <button id="setfriend" >친구 관리</button>  
          <button id="fix">편집</button>    
  
          <button id="addfriend" style="display: none;">친구 추가</button>                
          <button id="addgroup" style="display: none;">그룹 추가</button>
          <button id="DeleteSel" style="display: none;" onclick="deleteSelected();">선택 삭제</button>
      </div>
      <!--친구 추가 팝업-->
      <div id="myModal" class="modal">
      <div class="modal-content">
          <span class="close">&times;</span>     
          <button type="submit" id="searchbtn" name="searchbtn" class="srhbtn2">검색</button>
          <div class="search">
              <input type="text" name="email"  placeholder="이메일 검색">            
              <div class="setting_list">
                  
              </div>
              
          <span class="add"> 
              <div class="addbtn" onclick="alert('친구 추가가 정상적으로 완료되었습니다.');" style="cursor:pointer;">
              친구 추가
              </div>
          </span>
          </div> 
      </div>
      </div>
              <!--그룹 추가 팝업-->
              <div id="groupModal" class="group-modal">
              <div class="group-content">
                  <span class="close">&times;</span>     
                  <div class="search2">
                  <span class="addd"> 
                      <div class="srhbtn" onclick="alert('그룹 추가가 정상적으로 완료되었습니다.');">
                      추가
                      </div>
                  </span>
                  
                  <div class="groupfile">
                      <img src="../public/images/profile.png" alt="프로필 사진">
                      <input type="text" name="name"  placeholder="그룹명 작성" >
                  </div>
                      <div class="box box1">
                          <p>그룹에 추가할 친구를 선택하세요.</p>
                          <div class="setting_list">
                          <ul class="friends">
                              ${friendList}
                          </ul>
                          </div>
                  </div>
                  </div>
              </div>
              </div>
          
              <!--친구 관리 팝업-->
              <div id="setModal" class="setmodal">
              <!-- Modal content -->
              <div class="setmodal-content">
                  <span class="close">&times;</span>     
                  <div class ="set2">
                      <button  id="send">보낸 친구</button>
                  </div>
                  <div class="set" >
                  <button  id="send2">받은 친구</button>
                  </div>
                      <div class="setting_list">
                      
                      </div>
                  <span class="addd"> 
                      <input class="sendbtn" id="sendbtn" value= "취소" type="button" >
                      </span>
                  </div> 
              </div>
             

    <form name="friendsform" method="post" action="/friends/deleteSelected">
      <!--친구 목록-->
             <input type="submit" value="" class="schedule_delete">
          <div class="friend_list">
          <ul class="groups">
          ${groupList}
          </ul>
          <ul class="friends">
          ${friendList}
          </ul>
          </div>                
              </div>
              </div>
          </div>
    </div>
    </form>
    
    `;
  },
  friendList: function (friendEmail) {
    return `
      <li>
          <input type="checkbox" name="friend" value="${friendEmail}" id="check">
          <img src="../public/images/profile.png" alt="profile">
          <p>${friendEmail}</p>
      </li>
      `;
  },
  groupList: function (groupId) {
    return `
      <li>
          <input type="checkbox" name="group" value="${groupId}" id="check">
          <img src="../public/images/profile.png" name="group" alt="profile">
          <p>${groupId}</p>
      </li>
      `;
  },
  findfReq: function (userprofile, username) {
    //친구 요청(친구 검색 버튼)
    return `
      <ul class="friends" id="findfReq">';
      <li>
          <input type="checkbox" name="friend">
          <img src="../images/profile.png" alt="profile">
          <p>${username}</p>
      </li>
  </ul>`;
  },
  sendfReq: function (email) {
    //친구 요청(친구 추가 버튼)
    // 친구 신청 목록으로 DB 추가
  },
  allfReq: function (userprofile, username) {
    //모든 요청 조회
    return `
      <ul class="friends" id="allfReq">';
      <li>
          <input type="checkbox" name="friend">
          <img src="../images/profile.png" alt="profile">
          <p>${username}</p>
      </li>
  </ul>`;
  },
  confirmfReq: function (email) {
    //친구요청 승인(받은 친구)
    //승인 버튼 누를 시, 해당 친구는 친구목록에 추가됨
  },
  cancelfReq: function (email) {
    //친구요청 취소(보낸 친구)
    //취소 버튼 누를시, 친구 요청 목록에서 제거됨.
  },
};

module.exports = template;
