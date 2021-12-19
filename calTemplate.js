let calTemplate = {
  cal: function (groupList, friendList){
        let html = `
        <!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../public/css/reset.css">
  <link rel="stylesheet" href="../public/css/main.css">
  <link rel="stylesheet" href="../public/css/calculator.css">
  <title>Document</title>
</head>

<body>
  <form class="combi_calculator" action="date_calculator/create_process">
    <fieldset>
      <span class="title">친구 선택</span>
      <div class="friend_list">
      ${groupList}
      ${friendList}
      </div>
    </fieldset>
    <fieldset class="choice">
      <div class="title">
        <span>모임 년/월</span>
        <!-- <div class="question">?
          <div class="explanation">모임이 필요한 기간을 선택해주세요</div>
        </div> -->
      </div>
      <div class="organize">
        <input type="month" name="combi_month" id="combi_month" required>
        <!-- <input type="date" name="start_combi_date" id="start_combi_date" required> ~
        <input type="date" name="last_combi_date" id="last_combi_date" required> -->
      </div>
 </fieldset>
    <fieldset class="choice">
      <div class="title">
        <span>모임 시간</span>
        <!-- <div class="question">?
          <div class="explanation">모임의 시작 시간과 종료 시간을 입력해주세요</div>
        </div> -->
      </div>
      <div class="organize">
        <div class="start"><input type="number" min="0" max="24" value="0" name="start_hour">시          <input type="number" min="0" max="60" step="30" value="0" name="start_minute">분</div> ~
        <div class="last">
          <input type="number" min="0" max="24" value="0" name="last_hour">시
        <input type="number" min="0" max="60" step="30" value="0" name="last_minute">분
        </div>
      </div>
    </fieldset>
    <fieldset class="calculator_btn">
      <button type="submit">계산하기</button>
    </fieldset>
  </form>
</body>

</html>
`
          return html;

  },

  friendList: function (dates) {
        let list = '<ul class="friends">';
        for (let i = 0; i < dates.length; i++){
                list +=`
          <li>
            <input type="checkbox" name="friend" value=${dates[i].friend2}>
 <img src="../public/images/profile.png" alt="profile">
            <p>${dates[i].name}</p>
          </li>`
        }
        return list + "</ul>";
  },

  groupList: function (dates) {
        let list = '<ul class="groups">';
        for (let i = 0; i < dates.length; i++){
                list +=`
          <li>
            <input type="checkbox">
            <img src="../public/images/profile.png" name="group" alt="profile">
            <p>${dates[i].g_name} (${dates[i].cnt})</p>
          </li>`
        }
        return list + "</ul>";
  }
};

module.exports = calTemplate;
