/* ========================================
   商工ギルド 2.0
   JavaScript
======================================== */


/* ---------- クエストデータ ---------- */

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


/* ---------- 現在の状態 ---------- */

let currentQuestId = null;
let acceptedQuests = [];


/* ---------- ギルドへ入る ---------- */

function startGuild() {

    document.getElementById("welcome-screen").style.display = "none";

    document.getElementById("guild-home").style.display = "block";

}


/* ---------- クエスト詳細を開く ---------- */

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


    if (acceptedQuests.includes(questId)) {

        button.textContent = "✓ 受注済み";
        button.disabled = true;

    } else {

        button.textContent = "クエストを受ける";
        button.disabled = false;

    }


    document.getElementById("quest-modal").style.display = "flex";

}


/* ---------- クエストを受ける ---------- */

function acceptQuest() {

    if (!currentQuestId) {
        return;
    }


    if (!acceptedQuests.includes(currentQuestId)) {

        acceptedQuests.push(currentQuestId);

    }


    const button =
        document.getElementById("quest-accept-button");

    button.textContent = "✓ 受注済み";

    button.disabled = true;

}


/* ---------- モーダルを閉じる ---------- */

function closeQuest() {

    document.getElementById("quest-modal").style.display = "none";

}
