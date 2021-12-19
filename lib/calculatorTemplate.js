module.exports = {
  calculator: function (friendlist) {
    return `
    <form class="combi_calculator" action="/date_calculator/calculator_process" method="post">
    <fieldset>
      <span class="title">친구 선택</span>
      <div class="friend_list">
        ${friendlist}
      </div>
    </fieldset>
    <fieldset class="choice">
      <div class="title">
        <span>모임 년/월</span>
      </div>
      <div class="organize">
        <input type="month" name="combi_month" id="combi_month" required>
      </div>
    </fieldset>
    <fieldset class="choice">
      <div class="title">
        <span>모임 시간</span>
      </div>
      <div class="organize">
        <div class="start"><input type="number" min="0" max="23" value="0" name="start_hour">시
          <input type="number" min="0" max="30" step="30" value="0" name="start_minute">분</div> ~
        <div class="last">
          <input type="number" min="0" max="23" value="0" name="last_hour">시
        <input type="number" min="0" max="30" step="30" value="0" name="last_minute">분
        </div>
      </div>
    </fieldset>
    <fieldset class="calculator_btn">
      <button type="submit">계산하기</button>
    </fieldset>
  </form>
    `;
  },
  friendlist: function (groups, friends) {
    let list = '<ul class="groups">';
    for (let i = 0; i < groups.length; i++) {
      list += `
      <li>
        <input type="checkbox" name="group" value="${groups[i].g_id}">
        <img src="/public/userImages/default_profile.png" name="group" alt="profile">
        <p>${groups[i].g_name} (${groups[i].cnt})</p>
      </li>
      `;
    }
    list += '</ul> <ul class="friends">';
    for (let i = 0; i < friends.length; i++) {
      list += `
      <li>
        <input type="checkbox" name="friend" value="${friends[i].friend2}">
        <img src="/public/userImages/${friends[i].profile}" alt="${friends[i].profile}">
        <p>${friends[i].name}</p>
      </li>
      `;
    }
    return list + "</ul>";
  },
  result: function () {
    return `
    <div class="calendar">
    <div class="title">
      
      <div class="ym">
        <div class="year"></div>
        <div class="month"></div>
        <div class="monthtxt"></div>
      </div>
      
    </div>
    <div class="main">
      <div class="days">
        <div class="day">S</div>
        <div class="day">M</div>
        <div class="day">T</div>
        <div class="day">W</div>
        <div class="day">T</div>
        <div class="day">F</div>
        <div class="day">S</div>
      </div>
      <div class="dates"></div>
    </div>
  </div>
  <div class="retry">
    <a href="/date_calculator" class="retry_btn">다시하기</a>
  </div>
  
  <script src="/public/js/output.js"></script>
  `;
  },
};
