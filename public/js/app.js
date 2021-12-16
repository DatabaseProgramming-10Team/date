





document.getElementById("DeleteSel").addEventListener("click",delSelected);
// html에서 id가 DeleteSel인 요소를 찾고 클릭 시 동작할 addList 함수 연결

function addList() {
    var contents = document.querySelector(".text-basic");


    if(!contents.value) // 입력창에 값이 없으면
    {
        alert("데이터를 입력해주세요."); // 경고창 출력

        contents.focus();
        // 입력창에 포커스 (활성화)

        return false;
        // 함수 종료
    }
    
    var tr = document.createElement("tr"); // 추가할 테이블 <tr> 생성
    var input = document.createElement("input"); // 테이블 <tr> 안에 들어갈 체크박스의 <input> 생성


    // 체크박스 만들기
    input.setAttribute("type","checkbox"); // <input type="checkbox">
    input.setAttribute("class","btn-chk"); // <input type="checkbox" class="btn-chk">

    var td01=document.createElement("td"); // 첫 번째 <td> 생성 (체크박스를 담음)
    td01.appendChild(input); // 첫 번째 <td> 안에 <input> 추가

    var td02 = document.createElement("td"); // 두 번째 <td> 생성 (텍스트를 담음)
    td02.innerHTML = contents.value; // 두 번째 <td> 안에 입력창의 텍스트를 저장

    tr.appendChild(td01);
    tr.appendChild(td02); // 생성된 <tr> 안에 체크박스 td와 텍스트 td를 넣음

    document.getElementById("listBody").appendChild(tr); // tbody의 #listBody에 접근하여 tr을 자식요소로 추가
  
    contents.value=""; // 입력창의 내용이 추가되었으므로 입력창 지우기

    contents.focus(); // 입력창 포커스 (활성화)
}


// 선택 항목 삭제
function delSelected() {
    var list = document.getElementById("listBody"); // listBody에 접근
    var chkbox=document.querySelectorAll("#listBody .btn-chk"); // listBody 그룹 하위의 체크박스 모두 선택
   

    for (var i in chkbox) // i에 체크박스 인덱스 들어옴
    {
        if (chkbox[i].checked) {
            list.removeChild(chkbox[i].parentNode.parentNode); //체크박스 i번째의 부모(<td>)의 부모(<tr>) 제거
        }
    }
}