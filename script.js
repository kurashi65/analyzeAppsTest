let data = [];
let currentName = '';
let currentType = '';
let currentHand = '';
let currentCourse = '';
let currentPosition = '';

function setNames() {
    const names = document.getElementById('namesInput').value.split(/[,、　 ]+/).filter(Boolean);
    const step2 = document.getElementById('step2');
    step2.innerHTML = '<h3>人の選択</h3>' + names.map(name => `<button onclick="selectName('${name.trim()}')">${name.trim()}</button>`).join('');
    document.getElementById('step1').style.display = 'none';
    step2.style.display = 'block';
}

function selectName(name) {
    currentName = name;
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
}

function selectType(type) {
    currentType = type;
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step4').style.display = 'block';
}

function selectHand(hand) {
    currentHand = hand;
    document.getElementById('step4').style.display = 'none';
    document.getElementById('step5').style.display = 'block';
}

function selectCourse(course) {
    currentCourse = course;
    document.getElementById('step5').style.display = 'none';
    document.getElementById('step6').style.display = 'block';
}

function selectPosition(position) {
    currentPosition = position;
    // ここで選択したデータを配列に追加
    addToData();
    // データを追加した後、人選択画面（ステップ2）に戻る
    document.getElementById('step6').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
}

function addToData() {
    data.push({
        name: currentName,
        type: currentType,
        hand: currentHand,
        course: currentCourse,
        position: currentPosition
    });
  // 終了ボタンを表示する条件をここに追加
  // 例: データが空でないなら表示
    if (data.length > 0) {
    document.getElementById('finish').style.display = 'block';
    }
}

function downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    // CSVのヘッダーを追加
    const header = "人,種類,手,シュートコース,シュート位置";
    csvContent += header + '\n';

    // データ行を追加
    csvContent += data.map(e => [
        e.name,  // 人の選択
        e.type,  // 種類の選択
        e.hand,  // 手の選択
        e.course,  // シュートコースの選択
        e.position  // シュート位置の選択
    ].join(',')).join('\n');

    // エンコードしてダウンロードリンクを生成
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// 各select関数の中で、最後の選択後にaddToDataを呼び出し、終了時にdownloadCSVを呼び出す
