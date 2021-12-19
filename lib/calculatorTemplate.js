module.exports = {
  calculator: function (friendlist) {
    return `
    <form class="combi_calculator" action="/">
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
        <div class="start"><input type="number" min="0" max="24" value="0" name="start_hour">시
          <input type="number" min="0" max="60" step="30" value="0" name="start_minute">분</div> ~
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
    `;
  },
  friendlist: function (groups, friends) {
    let list = '<ul class="groups">';
    for (let i = 0; i < groups.length; i++) {
      list += `
      <li>
        <input type="checkbox">
        <img src="/public/userImages/default_profile.png" name="group" alt="profile">
        <p>${groups[i].g_name} (${groups[i].cnt + 1})</p>
      </li>
      `;
    }
    list += '</ul> <ul class="friends">';
    for (let i = 0; i < friends.length; i++) {
      list += `
      <li>
        <input type="checkbox" name="friend" value="${friends[i].name}">
        <img src="../images/${friends[i].profile}" alt="${friends[i].profile}">
        <p>${friends[i].name}</p>
      </li>
      `;
    }
    return list + "</ul>";
  },
};
