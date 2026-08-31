
/* ========================================
   商工ギルド 2.0
   JavaScript
======================================== */


/* ========================================
   称号データ
======================================== */

const titles = [

    {
        id: "helper",
        name: "地域の助っ人",
        description: "地域活動に参加した証",
        rank: "C",
        obtained: false
    },

    {
        id: "festival",
        name: "商工フェスタの功労者",
        description: "商工フェスタに貢献した証",
        rank: "B",
        obtained: false
    },

    {
        id: "bookkeeper",
        name: "簿記マスター",
        description: "日商簿記2級に合格した証",
        rank: "A",
        obtained: false
    }

];


/* ========================================
   クエストデータ
======================================== */

const quests = {

    cleanup: {
        category: "ボランティア",
        title: "地域清掃ボランティア",
        rank: "RANK C",
        date: "9月2日（水）",
        place: "菊池市中央公園",
        description: "地域の清掃活動に参加します。",
        titleReward: "「地域の助っ人」",
        exp: "+80 EXP"
    },

    festival: {
        category: "学校行事",
        title: "商工フェスタ準備クエスト",
        rank: "RANK B",
        date: "近日開催",
        place: "鹿本商工高校",
        description: "商工フェスタの設営・装飾・案内を行います。",
        titleReward: "パーティーイベント対象",
        exp: "+40 EXP"
    },

    bookkeeping: {
        category: "資格",
        title: "日商簿記2級 合格報告",
        rank: "RANK A",
        date: "合格後",
        place: "オンライン報告",
        description: "日商簿記2級の合格実績を登録します。",
        titleReward: "実績登録",
        exp: "+120 EXP"
    }

};


/* ========================================
   現在の状態
======================================== */

let currentQuestId = null;

let acceptedQuests = [];


/* ========================================
   ギルドへ入る
======================================== */

function startGuild() {

    document.getElementById("welcome-screen").style.display = "none";

    document.getElementById("guild-home").style.display = "block";

}


/* ========================================
   ページ切り替え
======================================== */

function showPage(pageName) {

    const pages =
        document.querySelectorAll(".guild-page");


    pages.forEach(function(page) {

        page.style.display = "none";

    });


    const targetPage =
        document.getElementById("page-" + pageName);


    if (targetPage) {

        targetPage.style.display = "block";

    }


    /* 冒険の記録 */

    if (pageName === "adventure") {

        showAdventureLog();

    }


    /* 称号 */

    if (pageName === "titles") {

        renderTitles("all");

    }

}


/* ========================================
   冒険の記録
======================================== */

function showAdventureLog() {

    const container =
        document.getElementById("accepted-quests");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    /* 受注クエストがない場合 */

    if (acceptedQuests.length === 0) {

        container.innerHTML =
            '<div class="notice-card">' +
            'まだ受注したクエストはありません。' +
            '</div>';

        return;

    }


    /* 受注したクエストを表示 */

    acceptedQuests.forEach(function(questId) {

        const quest = quests[questId];


        if (!quest) {
            return;
        }


        const card =
            document.createElement("div");


        card.className =
            "quest-record";


        card.innerHTML =
            '<div class="quest-record-category">' +
                quest.category +
            '</div>' +

            '<h3>' +
                quest.title +
            '</h3>' +

            '<p>' +
                quest.rank +
                '　' +
                quest.exp +
            '</p>' +

            '<span class="quest-status">' +
                '✓ 受注済み' +
            '</span>';


        container.appendChild(card);

    });

}


/* ========================================
   クエスト詳細を開く
======================================== */

function openQuest(questId) {

    const quest = quests[questId];


    if (!quest) {
        return;
    }


    currentQuestId = questId;


    document.getElementById("modal-category").textContent =
        quest.category;


    document.getElementById("modal-title").textContent =
        quest.title;


    document.getElementById("modal-rank").textContent =
        quest.rank;


    document.getElementById("modal-date").textContent =
        quest.date;


    document.getElementById("modal-place").textContent =
        quest.place;


    document.getElementById("modal-description").textContent =
        quest.description;


    document.getElementById("modal-title-reward").textContent =
        quest.titleReward;


    document.getElementById("modal-exp").textContent =
        quest.exp;


    const button =
        document.getElementById("quest-accept-button");


    /* すでに受注している場合 */

    if (acceptedQuests.includes(questId)) {

        button.textContent =
            "✓ 受注済み";

        button.disabled = true;

    }

    /* まだ受注していない場合 */

    else {

        button.textContent =
            "クエストを受ける";

        button.disabled = false;

    }


    document.getElementById("quest-modal").style.display =
        "flex";

}


/* ========================================
   クエストを受ける
======================================== */

function acceptQuest() {

    if (!currentQuestId) {
        return;
    }


    if (!acceptedQuests.includes(currentQuestId)) {

        acceptedQuests.push(currentQuestId);

    }


    const button =
        document.getElementById("quest-accept-button");


    button.textContent =
        "✓ 受注済み";


    button.disabled = true;

}


/* ========================================
   モーダルを閉じる
======================================== */

function closeQuest() {

    document.getElementById("quest-modal").style.display =
        "none";

}


/* ========================================
   称号一覧を表示
======================================== */

function renderTitles(filter = "all") {

    const titleList =
        document.getElementById("title-list");


    if (!titleList) {
        return;
    }


    /* 一度中身を空にする */

    titleList.innerHTML = "";


    /* 称号を1つずつ生成 */

    titles.forEach(function(title) {


        /* 「獲得済みのみ」の場合 */

        if (
            filter === "obtained" &&
            !title.obtained
        ) {

            return;

        }


        /* 称号カード */

        const card =
            document.createElement("div");


        if (title.obtained) {

            card.className =
                "title-card title-obtained";

        } else {

            card.className =
                "title-card title-locked";

        }


        /* カードの中身 */

        card.innerHTML =

            '<div class="title-icon">' +

                (
                    title.obtained
                    ? "🏆"
                    : "🔒"
                ) +

            '</div>' +

            '<div class="title-info">' +

                '<div class="title-rank">' +
                    'RANK ' +
                    title.rank +
                '</div>' +

                '<h3>' +
                    title.name +
                '</h3>' +

                '<p>' +
                    title.description +
                '</p>' +

            '</div>';


        titleList.appendChild(card);

    });

}


/* ========================================
   すべての称号を表示
======================================== */

function showAllTitles() {

    renderTitles("all");

}


/* ========================================
   獲得済み称号のみ表示
======================================== */

function showObtainedTitles() {

    renderTitles("obtained");

}

