let now_people = 0; // 已叫號的患者數量
let people_name = []; // 儲存患者姓名的陣列
let people_type = []; // 儲存患者掛號類型的陣列
let sp_order = 0; // 當前沒有被叫過號的特殊掛號數量
let vip_order = 0; // 當前沒有被叫過號的VIP掛號數量
let input_name = document.querySelector("#input_name");
let input_type = document.querySelector("#input_type");

// 掛號功能
let btn = document.querySelector("#btn");
btn.addEventListener("click", function () {
  if (input_name.value.trim() === "") {
    alert("請輸入姓名與身分證字號");
    return;
  }

  let index_to_insert = now_people + sp_order + vip_order; // 將新患者插入到所有未叫號患者之後的位置
  if (input_type.value === "VIP掛號") {
    index_to_insert = now_people + sp_order + vip_order; // VIP掛號患者應該在所有特殊掛號患者之後
    people_name.splice(index_to_insert, 0, input_name.value);
    people_type.splice(index_to_insert, 0, input_type.value);
    vip_order++;
  } else if (input_type.value === "特殊掛號") {
    index_to_insert = now_people + sp_order; // 特殊掛號患者應該在所有VIP掛號和一般掛號患者之前
    people_name.splice(index_to_insert, 0, input_name.value);
    people_type.splice(index_to_insert, 0, input_type.value);
    sp_order++;
  } else {
    people_name.push(input_name.value);
    people_type.push(input_type.value);
  }

  updateShowArea();
});

// 叫號功能
let call_btn = document.querySelector("#call_btn");
call_btn.addEventListener("click", function () {
  if (now_people >= people_name.length) {
    alert("目前無掛號病人");
    return;
  } else {
    now_people++;
    if (people_type[now_people - 1] === "VIP掛號") {
      vip_order--;
    } else if (people_type[now_people - 1] === "特殊掛號") {
      sp_order--;
    }
    updateShowArea();
  }
});

// 更新顯示區域
function updateShowArea() {
  let show_area = document.querySelector("#show_area");
  show_area.innerHTML = "";
  people_name.forEach((item, index) => {
    if (index < now_people) {
      show_area.innerHTML += `
                    <div style="background-color:rgb(255, 225, 53);">
                        <span>${people_type[index]}</span>
                        <span>${item}</span>
                    </div>
                    `;
    } else {
      show_area.innerHTML += `
                    <div>
                        <span>${people_type[index]}</span>
                        <span>${item}</span>
                    </div>
                    `;
    }
  });
}
